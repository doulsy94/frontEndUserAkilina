import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { VoiceRecorder, RecordingData } from 'capacitor-voice-recorder';
import { GestureController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MinistereService } from '../_services/ministere.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Fichier } from '../model/fichier';
import { VocalService } from '../_services/vocal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vocal',
  templateUrl: './vocal.page.html',
  styleUrls: ['./vocal.page.scss'],
})
export class VocalPage implements OnInit, AfterViewInit {
  image: any;
  libelle: any;
  id_user: any
  description: any;
  idminister: any
  recording = false;
  storedFileNames :any= [];
  durationDisplay = '';
  duration = 0;
  fileName:any;
  vocal: any
Vocal: any;
idvocal:any
voc:any
  fichierVocal: any;
 @ViewChild('recordbtn', { read: ElementRef })
  recordbtn!: ElementRef;
  file: any;
  date: any;
  

  constructor(private storageService: TokenStorageService, private gestureCtrl: GestureController, private back: Location, private route: ActivatedRoute, private ministere: MinistereService, private vocalService: VocalService) {}

  ngOnInit() {
    this.id_user = this.storageService.getUser().id_user;
    this.idminister = this.route.snapshot.params['id'];

    this.idvocal = this.route.snapshot.params['id'];
    console.log(this.idvocal);

    this.vocalService.lireVocalParIdMinistere(this.idvocal).subscribe((data) => {
      this.voc = data;

      this.file = data;
      this.date = data[0].date;
      console.log(data[1].fileName);

    });

    this.ministere.lireMinistereById(this.idminister).subscribe((data) => {
      this.libelle = data.libelle;
      this.image = data.image;
      this.description = data.description;
      console.log(data);
    });
    
    this.loadFiles();
     VoiceRecorder.requestAudioRecordingPermission();
  }

  ngAfterViewInit() {
    const longpress = this.gestureCtrl.create({
      el: this.recordbtn.nativeElement,
      threshold:0,
      gestureName: 'long-press',
      onStart: ev =>{
        Haptics.impact({style: ImpactStyle.Light});
        this.startRecording();
        this.calculateDuration();
      },
      onEnd: ev =>{
        Haptics.impact({style: ImpactStyle.Light});
        this.stopRecording();
      }
    }, true);
    longpress.enable();
}

calculateDuration(){
  if(!this.recording){
    this.duration = 0;
    this.durationDisplay='';
    return;
  }

  this.duration += 1;
  const minutes = Math.floor(this.duration / 60);
  const seconds = (this.duration % 60).toString().padStart(2, `0`);
  this.durationDisplay = `${minutes}:${seconds}`

  setTimeout(() => {
    this.calculateDuration();
  }, 1000);
}

async loadFiles(){
  Filesystem.readdir({
    path: '',
    directory: Directory.Data
  }).then(result => {
    console.log(result.files[0]);
    
    this.fichierVocal = result.files[0];
    this.storedFileNames = result.files;
    console.log("chemin du fichier tyuio "+this.storedFileNames)
    console.log("chemin du fichier "+this.fichierVocal[0])
    
  });
}

startRecording(){
  if(this.recording){
    return;
  }
  this.recording = true;
  VoiceRecorder.startRecording();
}

stopRecording (){
  if(!this.recording){
    return;
  }
  VoiceRecorder.stopRecording().then(async (result: RecordingData) =>{
    this.recording = false;
     
    if(result.value && result.value.recordDataBase64){
      const recordData = result.value.recordDataBase64;
      console.log(" ~ file: home.page.ts ~ line 49 ~ HomePage ~ VoiceRecorder.stopRecording ~ recordData", recordData)
      const fileName = new Date().getTime() + '.mp3';
      await Filesystem.writeFile({
        path: fileName,
        directory: Directory.Data,
        data: recordData
      });
      
      this.Vocal=this.dataURLtoFile(`data:audio/aac;base64,${recordData}`,fileName)
console.log(this.Vocal)
      this.loadFiles();
    }
  })
}

async playFile(fileName:string){
  const audioFile = await Filesystem.readFile({
    path: fileName,
    directory: Directory.Data
  });

  const base64Sound = audioFile.data;

  const audioRef = new Audio(`data:audio/aac;base64, ${base64Sound}`)
  audioRef.oncanplaythrough = () => audioRef.play();
  audioRef.load();
}

async deleteRecording(fileName:string){
  await Filesystem.deleteFile({
    directory: Directory.Data,
    path: fileName
  });
  this.loadFiles();
}

// la classe qui convertit un fichier base64 en File
dataURLtoFile(dataurl:any, filename:any) {

  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}

goBack(){
  this.back.back()
}

ajouter(){
  this.reloadPage();
  console.log(this.Vocal);
this.vocalService.ajouterVocal(this.id_user, this.idminister, this.Vocal).subscribe((data) => {
 this.vocal = data.vocal;
 console.log("vocalllllll"+data)

});
}

reloadPage(): void {
  window.location.reload();
}

supprimer(id: any) {
  this.popUp(id);
}

popUp(id: any) {
  Swal.fire({
    position: 'center',

    text: 'Voulez vous vraiment supprimer ?',
    icon: 'warning',
    heightAuto: false,
    showConfirmButton: true,
    confirmButtonText: 'Oui',
    confirmButtonColor: '#0857b5',
    showDenyButton: false,
    showCancelButton: true,
    cancelButtonText: 'Non',
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      this.vocalService
        .supprimerVocal(id, this.id_user)
        .subscribe((data) => {
          console.log('okkk');
        });

      Swal.fire({
        position: 'center',

        text: 'Vocal supprimer avec success!!',
        icon: 'success',
        heightAuto: false,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#0857b5',
        showDenyButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.reloadPage();
        }
      });
    }
  });
}
}



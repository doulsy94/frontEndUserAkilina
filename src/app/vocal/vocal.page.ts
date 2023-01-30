import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { VoiceRecorder, RecordingData } from 'capacitor-voice-recorder';
import { GestureController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MinistereService } from '../_services/ministere.service';
import { TokenStorageService } from '../_services/token-storage.service';

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

 @ViewChild('recordbtn', { read: ElementRef })
  recordbtn!: ElementRef;

  constructor(private storageService: TokenStorageService, private gestureCtrl: GestureController, private back: Location, private route: ActivatedRoute, private ministere: MinistereService) {}

  ngOnInit() {
    

    this.id_user=this.storageService.getUser().id_user;
    this.idminister = this.route.snapshot.params['id'];
    console.log("ministere  "+this.idminister)
    console.log("utilisateur "+this.id_user)

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
    console.log(result);
    this.storedFileNames = result.files;
    console.log("chemin du fichier tyuio "+this.storedFileNames)
    console.log("chemin du fichier "+this.storedFileNames.name)
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

goBack(){
  this.back.back()
}

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IdeeService } from '../_services/idee.service';
import { MinistereService } from '../_services/ministere.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-ministere',
  templateUrl: './ministere.page.html',
  styleUrls: ['./ministere.page.scss'],
})
export class MinisterePage implements OnInit {
  libelle: any;
  description: any;
  image: any;
  idminister: any;
  ideee: any;
  ididee: any;
  id: number=0;
  contenu:any;
  date: any;
  ide: any;
  jaime = new Array();
  textVariable:any
  jaimePas: any;
  id_user: any;
  cont: any;
  idee1: any;
  imageuser: any


  constructor(private router: Router, private storageService: TokenStorageService, private back: Location, private route: ActivatedRoute, private ministere: MinistereService, private idee: IdeeService) { }

  onSubmit(){

    this.idee.ajouterIdee(this.cont, this.id_user,this.idminister).subscribe(data =>{
      this.cont = data
      this.date = data.date
      this.imageuser = data.imageuser
      console.log(data)
      
    })

    Swal.fire({
      position:'center',
  
      text: 'Idee ajouter avec success!!',
      icon:'success',
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: '#0857b5',
      showDenyButton: false,
      showCancelButton: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {

        this.reloadPage()
      }
    })
  }
  
  ngOnInit() {

this.id_user=this.storageService.getUser().id_user;
    this.idminister = this.route.snapshot.params['id'];
    console.log("ministere  "+this.idminister)
    console.log("utilisateur "+this.id_user)
 
   
      
    this.ministere.lireMinistereById(this.idminister).subscribe(data =>{
      this.libelle = data.libelle
      this.image = data.image
      this.description = data.description
      console.log(data);
    })

    this.ididee = this.route.snapshot.params['id'];
    console.log(this.ididee)

    this.idee.lireIdeeParIdMinistere(this.ididee).subscribe(data =>{
 
      this.ide = data
 
      this.contenu = data[0].contenu_idee
      this.imageuser = data[0].imageuser
      this.date = data[0].date
      console.log(data[0].contenu_idee)


      console.log(this.ide.length)

      for(let i=0; i<this.ide.length; i++){
        console.log(this.ide[i].id_idee)

        this.idee.nbreJaimeParIdIdee(this.ide[i].id_idee).subscribe(data =>{
          this.jaime.push(data)  
          console.log(data)
        })
        
      }
      console.log(this.jaime)

      // for(let i=0; i<this.ide.length; i++){
      //   console.log(this.ide[i].id_idee)
  
      //   this.idee.nbreJaimePasParIdIdee(this.ide[i].id_idee).subscribe(data =>{
      //     this.jaimePas.push(data)  
      //     console.log(data)
      //   })
        
      // }
      // console.log(this.jaimePas)
      
    })




  }   

  goBack(){
    this.back.back()
  }

  reloadPage():void{
    window.location.reload();
  }
  supprimer(id_idee: any){
    this.popUp(id_idee);
  }

  popUp(id_idee: any) {
    Swal.fire({
      position:'center',
  
      text: 'Voulez vous vraiment supprimer ?',
      icon:'warning',
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: "Oui",
      confirmButtonColor: '#0857b5',
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: 'Non',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {

        this.idee.supprimerIdee(id_idee, this.id_user).subscribe(data =>{
          console.log('okkk');
          
        })

        Swal.fire({
          position:'center',
      
          text: 'Idee supprimer avec success!!',
          icon:'success',
          heightAuto: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: '#0857b5',
          showDenyButton: false,
          showCancelButton: false,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
    
            this.reloadPage()
          }
        })
        
      }
    })

  }

  lireidee(id_idee:any){
    this.idee.lireIdeeById(id_idee).subscribe(data =>{
    //location.reload();
    this.ideee=data.contenu_idee
    this.id=data.id_idee
    console.log('okkk'+ data.contenu_idee);
    console.log('idee id'+ id_idee);
    
  })
}

  modifierPopup(id_idee:any,contenu: any){

   
    console.log("ididee" + id_idee)

    
    this.idee.modifierIdee(id_idee, this.id_user, contenu).subscribe(data=>{
      this.idee1=data;
      console.log("aaaaaaaaa"+data)
      
    })

    Swal.fire({
      position:'center',
  
      text: 'Idee modifier avec success!!',
      icon:'success',
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: '#0857b5',
      showDenyButton: false,
      showCancelButton: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {

        this.reloadPage()
      }
    })
  }


  }


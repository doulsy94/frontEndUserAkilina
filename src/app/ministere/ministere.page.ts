import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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

  ididee: any;
 
  contenu:any;
  date: any;
  ide: any;
  jaime = new Array();
  textVariable:any
  jaimePas: any;
  id_user:any;
  cont:any;

  constructor(private storageService: TokenStorageService, private back: Location, private route: ActivatedRoute, private ministere: MinistereService, private idee: IdeeService) { }

  onSubmit(){
    this.reloadPage();
    this.idee.ajouterIdee(this.cont, this.id_user,this.idminister).subscribe(data =>{
      this.cont = data
      console.log("contenu "+this.cont)
      
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

  }


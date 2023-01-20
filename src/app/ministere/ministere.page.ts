import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IdeeService } from '../_services/idee.service';
import { MinistereService } from '../_services/ministere.service';

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
  contexte:any;
  contenu:any;
  date: any
  ide: any;
  jaime = new Array();
  textVariable:any
  jaimePas: any;
  messageText:any;
  constructor(private route: ActivatedRoute, private ministere: MinistereService, private idee: IdeeService) { }

  ngOnInit() {
    this.idminister = this.route.snapshot.params['id'];
    console.log(this.idminister)

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
      this.contexte = data[0].contexte
      this.contenu = data[0].contenu_idee
      this.date = data[0].date
      console.log(data[0].contenu_idee)
      //this.textVariable = this.ide[2].id_idee

      console.log(this.ide.length)

      for(let i=0; i<this.ide.length; i++){
        console.log(this.ide[i].id_idee)

        this.idee.nbreJaimeParIdIdee(this.ide[i].id_idee).subscribe(data =>{
          this.jaime.push(data)  
          console.log(data)
        })
        
      }
      console.log(this.jaime)

      for(let i=0; i<this.ide.length; i++){
        console.log(this.ide[i].id_idee)
  
        this.idee.nbreJaimePasParIdIdee(this.ide[i].id_idee).subscribe(data =>{
          this.jaimePas.push(data)  
          console.log(data)
        })
        
      }
      console.log(this.jaimePas)
      
    })


  }  
  sendMessage(){
    console.log('messageText: '+this.messageText)
  }
   
  }


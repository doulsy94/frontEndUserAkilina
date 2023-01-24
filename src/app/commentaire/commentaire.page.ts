import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentaireService } from '../_services/commentaire.service';
import { IdeeService } from '../_services/idee.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.page.html',
  styleUrls: ['./commentaire.page.scss'],
})
export class CommentairePage implements OnInit {

  idcommentaire: any;
  ididee: any;
  comment:any;
  contenu:any;
  ide:any;
  contenu_ide:any;
  cont: any;
  id_user:any;
  idminister: any;
  

  constructor(private storageService: TokenStorageService, private back: Location, private route: ActivatedRoute, private commentaire: CommentaireService, private idee: IdeeService) { }
  
  onSubmit(){
    this.reloadPage();
    this.commentaire.ajouterCommentaire(this.cont, this.id_user,this.ididee).subscribe(data =>{
      this.cont = data
      console.log("contenu "+this.cont)
    })
  }

  ngOnInit() {

    this.id_user=this.storageService.getUser().id_user;
    this.ididee = this.route.snapshot.params['id'];
    console.log("idee  "+this.ididee)
    console.log("utilisateur "+this.id_user)


    this.ididee = this.route.snapshot.params['id'];
    console.log(this.ididee)

    this.idee.lireIdeeById(this.ididee).subscribe(data =>{
      this.contenu_ide = data.contenu_idee
      console.log(data);
    })


    this.idcommentaire = this.route.snapshot.params['id'];
    console.log(this.idcommentaire)

    this.commentaire.lireCommentaireParIdIdee(this.idcommentaire).subscribe(data =>{
      this.comment = data
      this.contenu = data[0].contenu_commentaire
      console.log(data[0].contenu_commentaire)

      console.log(this.comment.length)
    })
  }

  goBack(){
    this.back.back()
  }

  reloadPage():void{
    window.location.reload();
  }

}

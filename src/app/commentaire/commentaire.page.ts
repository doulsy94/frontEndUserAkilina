import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  comment: any;
  contenu: any;
  ide: any;
  contenu_ide: any;
  cont: any;
  id_user: any;
  idminister: any;
  comm: any;
  conten: any;
  id: number = 0;
  imageuser: any;

  constructor(
    private router: Router,
    private storageService: TokenStorageService,
    private back: Location,
    private route: ActivatedRoute,
    private commentaire: CommentaireService,
    private idee: IdeeService
  ) {}

  onSubmit() {
    this.commentaire
      .ajouterCommentaire(this.cont, this.id_user, this.ididee)
      .subscribe((data) => {
        this.cont = data;
        console.log('contenu ' + this.cont);
      });

    Swal.fire({
      position: 'center',

      text: 'Commentaire ajouter avec success!!',
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

  ngOnInit() {
    this.id_user = this.storageService.getUser().id_user;
    this.ididee = this.route.snapshot.params['id'];
    console.log('idee  ' + this.ididee);
    console.log('utilisateur ' + this.id_user);

    this.ididee = this.route.snapshot.params['id'];
    console.log(this.ididee);

    this.idee.lireIdeeById(this.ididee).subscribe((data) => {
      this.contenu_ide = data.contenu_idee;
      console.log(data);
    });

    this.idcommentaire = this.route.snapshot.params['id'];
    console.log(this.idcommentaire);

    this.commentaire
      .lireCommentaireParIdIdee(this.idcommentaire)
      .subscribe((data) => {
        this.comment = data;
        this.contenu = data[0].contenu_commentaire;
        this.imageuser = data[0].imageuser;
        console.log(data[0].contenu_commentaire);

        console.log(this.comment.length);
      });
  }

  goBack() {
    this.back.back();
  }

  reloadPage(): void {
    window.location.reload();
  }

  supprimer(id_commentaire: any) {
    this.popUp(id_commentaire);
  }

  popUp(id_commentaire: any) {
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
        this.commentaire
          .supprimerCommentaire(id_commentaire, this.id_user)
          .subscribe((data) => {
            //location.reload();
            console.log('okkk');
          });

        Swal.fire({
          position: 'center',

          text: 'Commentaire supprimer avec success!!',
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

  lirecomment(id_commentaire: any) {
    this.commentaire.lireCommentaireById(id_commentaire).subscribe((data) => {
      //location.reload();
      this.comm = data.contenu_commentaire;
      this.id = data.id_commentaire;
      this.imageuser = data.imageuser;
      console.log('okkk' + data.contenu_commentaire);
      console.log('comment id' + id_commentaire);
    });
  }

  modifierPopup(id_commentaire: any, contenu: any) {
    console.log('idcommentaire' + id_commentaire);

    this.commentaire
      .modifierCommentaire(id_commentaire, this.id_user, contenu)
      .subscribe((data) => {
        this.conten = data;
        console.log('aaaaaaaaa' + data);
      });

    Swal.fire({
      position: 'center',

      text: 'Commentaire modifier avec success!!',
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
}

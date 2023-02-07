import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Idee } from '../model/idee';
import { User } from '../model/user';
import { IdeeService } from '../_services/idee.service';
import { MinistereService } from '../_services/ministere.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-ministere',
  templateUrl: './ministere.page.html',
  styleUrls: ['./ministere.page.scss'],
})
export class MinisterePage implements OnInit {
  private subscriptions: Subscription[] = [];
  user = new User();
  idees: Idee[] = [];
  idee: Idee = new Idee();
  like: any;
  color: any;

  libelle: any;
  description: any;
  image: any;
  idminister: any;
  ideee: any;
  ididee: any;
  id: number = 0;
  contenu: any;
  date: any;
  ide: any;
  textVariable: any;
  id_user: any;
  cont: any;
  idee1: any;
  imageuser: any;
  userlike:any
  ide1: any;
  id_idee:any
 
 

  constructor(
    private router: Router,
    private storageService: TokenStorageService,
    private back: Location,
    private route: ActivatedRoute,
    private ministere: MinistereService,
    private ideeService: IdeeService
  ) {}

  onSubmit() {
    this.ideeService
      .ajouterIdee(this.cont, this.id_user, this.idminister)
      .subscribe((data) => {
        this.cont = data;
        this.date = data.date;
        this.imageuser = data.imageuser;
        console.log(data);
      });

    Swal.fire({
      position: 'center',

      text: 'Idee ajouter avec success!!',
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
    this.userlike= this.storageService.getUser()
    console.log(this.userlike + "-----------------------userlike")
    this.idminister = this.route.snapshot.params['id'];
    console.log('ministere  ' + this.idminister);
    console.log('utilisateur ' + this.id_user);

    this.ministere.lireMinistereById(this.idminister).subscribe((data) => {
      this.libelle = data.libelle;
      this.image = data.image;
      this.description = data.description;
      console.log(data);
    });

    this.ididee = this.route.snapshot.params['id'];
    console.log(this.ididee);

    this.ideeService.lireIdeeParIdMinistere(this.ididee).subscribe((data) => {
      this.ide = data;

      this.contenu = data[0].contenu_idee;
      this.imageuser = data[0].imageuser;
      this.date = data[0].date;
      console.log(data[0].contenu_idee);

      console.log(this.ide.length);
    });

  }

  goBack() {
    this.back.back();
  }

  reloadPage(): void {
    window.location.reload();
  }
  supprimer(id_idee: any) {
    this.popUp(id_idee);
  }

  popUp(id_idee: any) {
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
        this.ideeService
          .supprimerIdee(id_idee, this.id_user)
          .subscribe((data) => {
            console.log('okkk');
          });

        Swal.fire({
          position: 'center',

          text: 'Idee supprimer avec success!!',
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

  lireidee(id_idee: any) {
    this.ideeService.lireIdeeById(id_idee).subscribe((data) => {
      //location.reload();
      this.ideee = data.contenu_idee;
      this.id = data.id_idee;
      console.log('okkk' + data.contenu_idee);
      console.log('idee id' + id_idee);
    });
  }

  modifierPopup(id_idee: any, contenu: any) {
    console.log('ididee' + id_idee);

    this.ideeService
      .modifierIdee(id_idee, this.id_user, contenu)
      .subscribe((data) => {
        this.idee1 = data;
        console.log('aaaaaaaaa' + data);
      });

    Swal.fire({
      position: 'center',

      text: 'Idee modifier avec success!!',
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

  displayLike(user: User) {
    const result: Idee | undefined = user.likedIdee.find
      (idee => idee.id_idee === this.idee.id_idee
    );
    if (result) {
      this.like = 'Unlike';
      this.color = '#4F9AFF';
      console.log('testing');
    } else {
      this.like = 'Like';
      this.color = '#000000';
    }
  }

  likeIdee(idee: any, user: any) {
    if (this.color === '#000000') {
      this.color = '#4F9AFF';
      this.like = 'Unlike';
      this.doLike(idee, user);
      idee.likes += 1;
    } else {
      this.color = '#000000';
      this.like = 'Like';
      this.doUnlike(idee, user);
      if (user.likedIdees != null) {
        for (let i = 0; i < user.likedIdees.length; i++) {
          if (user.likedIdees[i].id_user === idee.id_idee) {
            user.likedIdees.splice(i, 1);
          }
        }
      }
      if (idee.likes > 0) {
        this.idee.likes -= 1;
      }
    }
  }

  doLike(idee: any, user: any) {
    this.subscriptions.push(
      this.ideeService.like(idee.id_idee, user.id_user).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  doUnlike(idee: any, user: any) {
    this.subscriptions.push(
      this.ideeService.unlike(idee.id_idee, user.id_user).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    );
  }
}

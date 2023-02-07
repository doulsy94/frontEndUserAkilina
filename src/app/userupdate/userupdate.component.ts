import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, IonModal, ModalController } from '@ionic/angular';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.scss'],
})
export class UserupdateComponent implements OnInit {
  id_user: any;
  username: any;
  numero: any;
  email: any;
  addresse: any;
  imageuser: any;

  ngOnInit(): void {
    this.id_user = this.storageService.getUser().id_user;
    console.log('identifiant' + this.id_user);

    this.user.listerUserParId(this.id_user).subscribe((data) => {
      console.log('data: ' + JSON.stringify(data));
      this.username = data.username;
      this.numero = data.numero;
      this.email = data.email;
      this.addresse = data.addresse;
      this.imageuser = data.imageuser;
    });
  }

  constructor(
    private route: ActivatedRoute,
    private modal: ModalController,
    private user: UsersService,
    private http: HttpClient,
    private storageService: TokenStorageService,
    private router: Router
  ) {}

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  // Methode permettant de modifier un user
  modifierUser(user: any) {
    this.user.modifierUserParId(this.id_user, user).subscribe((data) => {
      console.log('data: ' + JSON.stringify(data));
    });
  }
}

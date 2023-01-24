import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserupdateComponent } from '../userupdate/userupdate.component';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

 constructor (private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router,private modalCtrl: ModalController) { }

  ngOnInit() {
  }


logout(): void{
  this.tokenStorage.signOut();
  this.router.navigateByUrl('connexion')
  //window.location.reload();
}
message = 'This modal example uses the modalController to present and dismiss modals.';


async openModal() {
  const modal = await this.modalCtrl.create({
    component: UserupdateComponent,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    this.message = `Hello, ${data}!`;
  }
}


}
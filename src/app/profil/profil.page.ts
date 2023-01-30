import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserupdateComponent } from '../userupdate/userupdate.component';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  id_user: any;
  username: any;
  numero: any;
  email: any;
  addresse: any
  imageuser: any
 


 constructor (private authService: AuthService, private route: ActivatedRoute, private user: UsersService, private http: HttpClient, private storageService: TokenStorageService, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.id_user=this.storageService.getUser().id_user;
    console.log("identifiant" +this.id_user)

    this.user.listerUserParId(this.id_user).subscribe(data =>{
      console.log("data: " +JSON.stringify(data))
        this.username = data.username;
        this.numero = data.numero;
        this.email = data.email;
        this.addresse = data.addresse;
        this.imageuser = data.imageuser;
      })
  }

  
  //METHODE PERMETTANT DE RECUPERER L'IMAGE DU MINISTERE
  recuperationImageUser(event: any) {

    this.imageuser = event.target["files"][0];
    console.log(this.imageuser)

  }

  modifierImageUser(user:any){
    this.authService.modifierImageUser(this.id_user, user).subscribe(data =>{
      console.log("data: " +JSON.stringify(data))
  })
}



logout(): void{
  this.storageService.signOut();
  this.router.navigateByUrl('connexion')

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
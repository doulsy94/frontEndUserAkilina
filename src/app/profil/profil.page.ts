import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

 constructor (private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }


logout(): void{
  this.tokenStorage.signOut();
  this.router.navigateByUrl('connexion')
  //window.location.reload();
}

}
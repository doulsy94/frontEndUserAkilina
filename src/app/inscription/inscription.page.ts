import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  form: any = {
    username: null,
    email: null,
    numero: null,
    addresse: null, 
    password: null,
    confirmPassword: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { username, email, numero, addresse, password, confirmPassword } = this.form;

    this.authService.register(username, email, numero, addresse, password, confirmPassword).subscribe(
      data => {
        console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false; 
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  reloadPage(): void {
  window.location.reload();
  }
}
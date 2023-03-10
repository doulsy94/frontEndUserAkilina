import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private tokenstorageService: TokenStorageService,
    private router: Router,
    private back: Location,
  ) { }

  ngOnInit() {
    if (this.tokenstorageService.isLoggedIn()) {
      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigateByUrl('/connexion');
      }
    } else {
      this.router.navigateByUrl('/resetpassword');
    }
  }

  onResetpassword(form: { email: string; }): void {
    console.log(form.email);
    const email: string = form.email;
    this.subscriptions.push(
      this.authService.resetPassword(email).subscribe(
        response => {
          console.log(response);
      
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          const errorMsg = error.error;
          if (errorMsg === 'emailNotFound') {
         
          }
          if (errorMsg !== 'emailNotFound') {
         
          }
        }
      )
    );
    Swal.fire({ 
      position: 'center',

      text:"Mot de Passe réinitialiser avec succès, votre nouveau mot de passe sera envoyé dans votre email ",
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
        this.router.navigate(['/connexion']);
      
      }
    });
   

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  goBack() {
    this.back.back();
  }

}

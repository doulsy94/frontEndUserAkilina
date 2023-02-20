import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { PasswordChange } from '../model/password-change';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.page.html',
  styleUrls: ['./password-update.page.scss'],
})
export class PasswordUpdatePage implements OnInit {

  type=true;

  private subscriptions: Subscription[] = [];
  id_user: any;
  user!: User;
  emailOrNumero: any
  numero: any;
  email: any

  constructor(
    private authService: AuthService,
    private storageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit() {
    this.numero = this.storageService.getUser().numero;
    console.log('numero: ' + this.numero);
  }

  onChangePassword(passwordChange: PasswordChange) {
    console.log(passwordChange);
  
    this.subscriptions.push(
      this.authService.changePassword(passwordChange).subscribe(
        response => {
          console.log(response);
    
          Swal.fire({
            position: 'center',
      
            text: 'Mot de passe modifier avec success!!',
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


        },
        error => {
          console.log(error);
        //  this.loadingService.isLoading.next(false);
          const errorMsg: string = error.error;
          this.showErrorMessage(errorMsg);
        }
      )
    );
  }

  private showErrorMessage(errorMessage: string): void {
    if (errorMessage === 'PasswordNotMatched') {
     
      Swal.fire({
        position: 'center',

        text: 'Le mot de passe ne correspond pas!!',
        icon: 'error',
        heightAuto: false,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#0857b5',
        showDenyButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          
        }
      });
    } else if (errorMessage === 'IncorrectCurrentPassword') {
      
      Swal.fire({
        position: 'center',

        text: 'Ancien mot de passe est incorrect',
        icon: 'error',
        heightAuto: false,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#0857b5',
        showDenyButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          
        }
      });

    } else {
     // this.alertService.showAlert(
      //  'Password change failed. Please try again.',
       // AlertType.DANGER
   //   );
    }
  }

  changeType() {
    this.type = !this.type;
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Route, Router } from '@angular/router';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router) { }

  login(emailOrNumero: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      emailOrNumero,
      password
    }, httpOptions);
  }

  register(username: string, email: string, numero: string,  addresse: string, password: string, confirmPassword: string): Observable<any> {
   
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      numero,
      addresse,
      password,
      confirmPassword
    }, httpOptions);
  }

  logout(): void{
    this.tokenStorage.signOut();
    this.router.navigateByUrl('connexion')
    window.location.reload();
  }

  modifierImageUser(id_user: any, imageuser:any): Observable<any>{

    return this.http.post(`${AUTH_API}/photo/upload/${id_user}`,imageuser)
   
  }

}

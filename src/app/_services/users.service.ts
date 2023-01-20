import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

    //METHODE PERMETTANT DE LISTER LES UTILISATEURS
  listerUser(): Observable<any>{
  return this.http.get(`${AUTH_API}/lire`);
}

//METHODE PERMETTANT DE DONNER LE NOMBRE TOTAL DE UTILSATEURS
nombreUsers(): Observable<any> {

  return this.http.get(`${AUTH_API}/afficher_user_nombre`);
}

 //SUPRIMER MINISTERE
 suprimerUsers(id_user:any):Observable<any>{
  return this.http.delete(`${AUTH_API}/supprimer/${id_user}`);
}

}

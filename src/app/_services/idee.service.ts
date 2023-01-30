import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/idee';
const AUTH_API1 = 'http://localhost:8080/api/jaime';
const AUTH_API2 = 'http://localhost:8080/api/jaimepas';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IdeeService {

constructor(private http: HttpClient) { }

httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}

//METHODE PERMETTANT DE LISTER UN MINISTERE
listerIdee(): Observable<any>{
  return this.http.get(`${AUTH_API}/lire`);
}

//METHODE PERMETTANT DE LISTER LES IDEES PAR MINISTERE
lireIdeeParLibelleMinistere(libelle:any): Observable<any>{
  return this.http.get(`${AUTH_API}/afficherIdeeParLibelleMinistere/${libelle}`);
}

//METHODE PERMETTANT DE LISTER LES IDEES PAR ID DE MINISTERE
lireIdeeParIdMinistere(id_ministere:any): Observable<any>{
  return this.http.get(`${AUTH_API}/afficherIdeeParIdMinistere/${id_ministere}`);
}

//METHODE PERMETTANT DE DONNER LE NOMBRE TOTAL D' IDEE
nombreMinistere(): Observable<any> {

  return this.http.get(`${AUTH_API}/afficher_idee_nombre`);
}

//METHODE PERMETTANT D'AJOUTER UNE IDEE
ajouterIdee(contenu: any, id_user: any, id_ministere: any): Observable<any> {


  const data = {
    "contenu_idee": contenu,
  }
  return this.http.post(`${AUTH_API}/ajouter/${id_user}/${id_ministere}`, data);
}

//METHODE PERMETTANT DE LISTER UNE IDEE PAR ID
lireIdeeById(id_idee: any): Observable<any> {

  return this.http.get(`${AUTH_API}/lireParId/${id_idee}`);
}



//METHODE PERMETTANT DE MODIFIER UNE IDEE
modifierIdee(id_idee: any, id_user: any, contenu: any): Observable<any> {

  // const data: FormData = new FormData();
  var idee = [{
    "contenu_idee": contenu,
  }]
  var data=JSON.stringify(idee).slice(1, JSON.stringify(idee).lastIndexOf(']'))
  return this.http.post(`${AUTH_API}/modifier/${id_idee}/${id_user}`, data,this.httpOptions);
}


 //SUPRIMER IDEE
 supprimerIdee(id_idee:any, id_user:any):Observable<any>{
  return this.http.delete(`${AUTH_API}/supprimer/${id_idee}/${id_user}`);
}

//METHODE PERMETTANT D'AJOUTER DES JAIMES A UNE IDEE
ajouterJaime(id_idee:any, id_user:any):Observable<any>{
  const data: FormData = new FormData();
  const jaime = [{
    "id_idee": id_idee,
    "id_user": id_user
  }]
  data.append('jaime', JSON.stringify(jaime).slice(1, JSON.stringify(jaime).lastIndexOf(']')));
  return this.http.post(`${AUTH_API1}/ajouter/${id_user}/${id_idee}`, data);
}

 //METHODE PERMETTANT DE LISTER LES JAIMES D'UNE IDEE
 lireJaime(): Observable<any>{
  return this.http.get(`${AUTH_API1}/lire`);
}

//SUPRIMER JAIMES
supprimerJaime(id:any, id_user:any):Observable<any>{
  return this.http.delete(`${AUTH_API1}/supprimer/${id}/${id_user}`);
}

//METHODE PERMETTANT D'AFFICHER LES JAIMES PAR ID IDEES 
lireJaimeParIdIdee(id_idee:any): Observable<any>{
  return this.http.get(`${AUTH_API1}/afficherJaimeParIdIdee/${id_idee}`);
}

//METHODE PERMETTANT D'AFFICHER LE NOMBRE DE JAIMES PAR ID IDEES 
nbreJaimeParIdIdee(id_idee:any): Observable<any>{
  return this.http.get(`${AUTH_API1}/afficherNombreJaimeParIdIdee/${id_idee}`);
}


//METHODE PERMETTANT D'AJOUTER DES JAIMES PAS A UNE IDEE
ajouterJaimePas(id_idee:any, id_user:any):Observable<any>{
  const data: FormData = new FormData();
  const jaimePas = [{
    "id_idee": id_idee,
    "id_user": id_user
  }]
  data.append('jaimePas', JSON.stringify(jaimePas).slice(1, JSON.stringify(jaimePas).lastIndexOf(']')));
  return this.http.post(`${AUTH_API2}/ajouter/${id_user}/${id_idee}`, data);
}

 //METHODE PERMETTANT DE LISTER LES JAIMES D'UNE IDEE
 lireJaimePas(): Observable<any>{
  return this.http.get(`${AUTH_API2}/lire`);
}

//SUPRIMER JAIMES
supprimerJaimePas(id:any, id_user:any):Observable<any>{
  return this.http.delete(`${AUTH_API2}/supprimer/${id}/${id_user}`);
}

//METHODE PERMETTANT D'AFFICHER LES JAIMES PAR ID IDEES 
lireJaimePasParIdIdee(id_idee:any): Observable<any>{
  return this.http.get(`${AUTH_API2}/afficherJaimePasParIdIdee/${id_idee}`);
}

//METHODE PERMETTANT D'AFFICHER LE NOMBRE DE JAIMES PAR ID IDEES 
nbreJaimePasParIdIdee(id_idee:any): Observable<any>{
  return this.http.get(`${AUTH_API2}/afficherNombreJaimePasParIdIdee/${id_idee}`);
}


}


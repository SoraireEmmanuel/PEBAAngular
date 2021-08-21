import { HttpClientModule , HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesional } from '../Class/Profesional';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
 private url = 'https://apipeba.azurewebsites.net/api/'
  constructor(private http:HttpClient) {}
login(){

}
logout(){

}
nuevoUsuario( profesional:Profesional):Observable<any>{

  return this.http.post(
    `${this.url}Profesionales`,profesional
  );
 
}
   
}

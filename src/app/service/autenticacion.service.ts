import { HttpClientModule , HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesional } from '../Class/Profesional';
import { UsuarioLogin } from '../Class/UsuarioLogin';
import { map } from 'rxjs/operators';
import { idProfesional } from '../Class/IdProfesional';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
 private url = 'https://apipeba.azurewebsites.net/api/'
  constructor(private http:HttpClient) {}


login( usuario:UsuarioLogin):Observable<any>{
  var resp = this.http.post(`${this.url}Account`, usuario);
  return resp;
}
idUsuario(usuario:UsuarioLogin):Observable<any>{
  return this.http.post(`${this.url}idLogin`,usuario);
}
logout(){

  
}
nuevoUsuario( profesional:Profesional):Observable<any>{

  return this.http.post(
    `${this.url}Profesionales`,profesional
  )
 
}
   
}

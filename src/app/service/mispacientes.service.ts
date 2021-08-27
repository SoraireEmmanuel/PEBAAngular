import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesional } from '../Class/Profesional';
import { UsuarioLogin } from '../Class/UsuarioLogin';
import { map } from 'rxjs/operators';
import { idProfesional } from '../Class/IdProfesional';
import { Paciente } from '../Class/paciente';

@Injectable({
  providedIn: 'root'
})
export class MispacientesService {
  private url = 'https://apipeba.azurewebsites.net/api/'
  constructor(private http:HttpClient) { }

mispacientes():Observable<any>{
  var id=localStorage.getItem('idusuario');
  return this.http.get(`${this.url}GetByProfesional/${id}`)
}
nuevopaciente(paciente:Paciente){
  return this.http.post(`${this.url}Pacientes`,paciente);
}

pacientePorId(id:string){
  return this.http.get(`${this.url}GetByPaciente/${id}`)
}
}

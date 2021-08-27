import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parseJSON } from 'jquery';
import { Denominacion } from '../Class/protocolo/denominacion';
import { Escritura } from '../Class/protocolo/escritura';
import { ComprensionAuditiva } from '../Class/protocolo/expresionauditiva';
import { ExpresionOral } from '../Class/protocolo/expresionoral';
import { Lectura } from '../Class/protocolo/lectura';
import { Protocolo } from '../Class/protocolo/protocolo';
import { Repeticion } from '../Class/protocolo/repeticion';
import { Sintomasneurologicos } from '../Class/protocolo/sintomasneurologicos';

@Injectable({
  providedIn: 'root'
})
export class SalvarprotocoloService {
  private url = 'https://apipeba.azurewebsites.net/api/'
  constructor(private http:HttpClient) { }

    guardarProtocolo(protocolo:Protocolo){
      console.log(protocolo);
      return  this.http.post(`${this.url}Protocolos`,protocolo);
    }
    guardarLecturaCuanti(lectura:Lectura){
      return this.http.post(`${this.url}Lectura_Cuantitativas`, lectura);
    }
    guardarLecturaCuali(){
      return this.http.post(`${this.url}Lectura_Cualitativas`,'{}');
    }
    guardarEscrituraCuali(){
      return this.http.post(`${this.url}Escritura_Cualitativas`,'{}');
    }
    guardarEscrituraCuanti(escritura:Escritura){
      return this.http.post(`${this.url}Escritura_Cuantitativas`, escritura);
    }
    guardarDenominacionCuali(){
      return this.http.post(`${this.url}Denominacion_Cualitativas`,'{}');
    }
    guardarDenominacionCuanti(denominacion:Denominacion){
      return this.http.post(`${this.url}Denominacion_Cuantitativas`, denominacion);
    }
    //no se usa por ahora.
    guardarComprensionAuditivaCuali(){
      return this.http.post(`${this.url}ComprensionAuditiva_Cualitativas`, '');
    }
    guardarComprensionAuditivaCuanti(comprensionAuditiva:ComprensionAuditiva){
      return this.http.post(`${this.url}ComprensionAuditiva_Cuantitativas`, comprensionAuditiva);
    }
    guardarExpresionOralCuali(){
      return this.http.post(`${this.url}ExpresionOral_Cualitativas`,'{}');
    }
    guardarExpresionOralCuanti(expresionOral:ExpresionOral){
      return this.http.post(`${this.url}ExpresionOral_Cuantitativas`, expresionOral);
    }
    guardarRepeticionCuali(){
      return this.http.post(`${this.url}Repeticion_Cualitativas`,'{}');
    }
    guardarRepeticionCuanti(repeticion:Repeticion){
      return this.http.post(`${this.url}Repeticion_Cuantitativas`, repeticion);
    }
    guardarSintomasNeurologicos(sintomasNeurologicos:Sintomasneurologicos){
      return this.http.post(`${this.url}SintomasNeurologicoss`, sintomasNeurologicos);
    }

}

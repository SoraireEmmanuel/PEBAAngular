import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecuperarprotocoloService {
private url = 'https://apipeba.azurewebsites.net/api/'
  constructor(private http:HttpClient) { }

  recuperarProtocolo(id:string){
    return this.http.get(`${this.url}Protocolos/${id}`)
  }

  recuperarPaciente(id:string){
    return this.http.get(`${this.url}GetByPaciente/${id}`)
  }

  recuperarExprecionOralCuali(id:string){
    return this.http.get(`${this.url}ExpresionOral_Cualitativas/${id}`)
  }
  recuperarExprecionOralCuanti(id:string){
    return this.http.get(`${this.url}ExpresionOral_Cuantitativas/${id}`)
  }

  recuperarComprensionAuditivaCuali(id:string){
    return this.http.get(`${this.url}ComprensionAuditiva_Cualitativas/${id}`)
  }
  recuperarComprensionAuditivaCuanti(id:string){
    return this.http.get(`${this.url}ComprensionAuditiva_Cuantitativas/${id}`)
  }

  recuperarDenominacionCuali(id:string){
    return this.http.get(`${this.url}Denominacion_Cualitativas/${id}`)
  }
  recuperarDenominacionCuanti(id:string){
    return this.http.get(`${this.url}Denominacion_Cuantitativas/${id}`)
  }

  recuperarLecturaCuali(id:string){
    return this.http.get(`${this.url}Lectura_Cualitativas/${id}`)
  }
  recuperarLecturaCuanti(id:string){
    return this.http.get(`${this.url}Lectura_Cuantitativas/${id}`)
  }

  recuperarRepeticionCuali(id:string){
    return this.http.get(`${this.url}Repeticion_Cualitativas/${id}`)
  }
  recuperarRepeticionCuanti(id:string){
    return this.http.get(`${this.url}Repeticion_Cuantitativas/${id}`)
  }

  recuperarEscrituraCuali(id:string){
    return this.http.get(`${this.url}Escritura_Cualitativas/${id}`)
  }
  recuperarEscrituraCuanti(id:string){
    return this.http.get(`${this.url}Escritura_Cuantitativas/${id}`)
  }
  recuperarSintomasNeuronales(id:string){
    return this.http.get(`${this.url}SintomasNeurologicoss/${id}`)
  }


}

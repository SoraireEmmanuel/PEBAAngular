import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { HistorialService } from 'src/app/service/historial.service';
import { MispacientesService } from 'src/app/service/mispacientes.service';

@Component({
  selector: 'app-historialporusuario',
  templateUrl: './historialporusuario.component.html',
  styleUrls: ['./historialporusuario.component.css']
})
export class HistorialporusuarioComponent implements OnInit {
paciente:any;
historialProtocolo:any;
table:number=0
id:any;
  constructor(private historial:HistorialService, 
              private _ac:ActivatedRoute,
              private pacientes:MispacientesService,
              private router:Router) {
    this._ac.paramMap.subscribe(param=>{
      this.id= param.get('id');
    })
    
    this.historial.buscarPersona(this.id).subscribe(res => {
      console.log(res);
      this.historialProtocolo = res;
      if (this.historialProtocolo.length != 0) {
        this.table = 1;
      }
      else{
        this.table=2;
      }
    })

    this.pacientes.pacientePorId(this.id).subscribe(resp=>{
      console.log(resp);
      this.paciente=resp;
    })

   }

  ngOnInit(): void {
  }
  verinforme(id:string){
    console.log(id)
    this.router.navigate(['/verProtocolo',id])
  }
}

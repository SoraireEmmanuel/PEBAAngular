import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HistorialProtocolo } from '../Class/Historial';
import { MisPacientesComponent } from '../mis-pacientes/mis-pacientes.component';
import { HistorialService } from '../service/historial.service';
import { MispacientesService } from '../service/mispacientes.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  filtros = ["Todo", "Por Id del Paciente", "Por Fecha"];
  historialProtocolo: any;
  pacientes: any;

  forma: FormGroup;
  validacionFecha: boolean = false;
  validacionPorId: boolean = false;
  table: number = 0;
  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private historial: HistorialService, private mispaciente: MispacientesService) {
    this.forma = this.fb.group({
      filtro: ['', Validators.required],
      desde: [''],
      hasta: [''],
      idusuario: ['']
    });

  }

  ngOnInit(): void {

    this.pacienteBuscador();
  }
  validarFiltro(): boolean {
    if (this.forma.controls['filtro'].value === 'Por Id del Paciente') {
      return true
    }
    else {
      return false
    }
  }

  validarFiltro2(): boolean {
    if (this.forma.controls['filtro'].value == 'Por Fecha') {
      return true
    }
    else {
      return false
    }
  }
  validarFiltro3(): boolean {
    if (this.forma.controls['filtro'].value == 'Todo') {
      return false;
    }
    else {
      return true;
    }
  }
  limpiar() {
    this.validacionFecha = false;
    this.validacionPorId = false;
  }

  pacienteBuscador() {
    this.mispaciente.mispacientes().subscribe(res => {
      this.pacientes = res;
      console.log(this.pacientes);
    })
  }

  verHistorial() {
    this.historialProtocolo = null;
    if (this.forma.controls['filtro'].value == 'Por Fecha') {
      if (this.forma.controls['desde'].value != '' && this.forma.controls['hasta'].value != '') {
        this.validacionFecha = false;
        this.validacionPorId = false;
      }
      else {
        this.validacionFecha = true;
        this.validacionPorId = false;
      }
    }
    if (this.forma.controls['filtro'].value == 'Por Id del Paciente') {
      if (this.forma.controls['idusuario'].value != '') {
        this.validacionPorId = false;
        this.validacionFecha = false;
        var id = this.forma.value.idusuario;
        console.log(id)
        this.historial.buscarPersona(id).subscribe(res => {
          console.log(res);
          this.historialProtocolo = res;
          if (this.historialProtocolo.length != 0) {
            this.table = 1;
          }
          else{
            this.table=2;
          }
        })
      }
      else {
        this.validacionPorId = true;
        this.validacionFecha = false;
      }
    }
    if (this.forma.controls['filtro'].value == 'Todo') {
      this.historial.buscarTodo()
        .subscribe(res => {
          console.log(res);
          this.historialProtocolo = res;
          if (this.historialProtocolo.length != 0) {
            this.table = 1;
          }
          else{
            this.table=2;
          }
        })
    }
  }
  verinforme(id:string){
    console.log(id)
  }
}

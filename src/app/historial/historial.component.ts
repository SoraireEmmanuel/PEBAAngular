import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  filtros = ["Todo", "Por Id del Paciente", "Por Fecha"];
  forma: FormGroup;
  validacionFecha:boolean=false;
  validacionPorId:boolean=false;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.forma = this.fb.group({
      filtro: ['', Validators.required],
      desde: [''],
      hasta: [''],
      idusuario: ['']
    });
    
  }

  ngOnInit(): void {
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
  validarFiltro3(): boolean{
    if (this.forma.controls['filtro'].value == 'Todo'){
      return false;
    }
    else{
      return true;
    }
  }
  limpiar(){
    this.validacionFecha=false;
    this.validacionPorId=false;
  }
  verHistorial(){
    if (this.forma.controls['filtro'].value == 'Por Fecha') {
      if(this.forma.controls['desde'].value != '' && this.forma.controls['hasta'].value != ''){
        this.validacionFecha=false;
        this.validacionPorId=false;
      }
      else{
        this.validacionFecha=true;
        this.validacionPorId=false;
      }
    }
    if (this.forma.controls['filtro'].value == 'Por Id del Paciente') {
      if (this.forma.controls['idusuario'].value != ''){
        this.validacionPorId=false;
        this.validacionFecha=false;
      }
      else{
        this.validacionPorId=true;
        this.validacionFecha=false;
      }
    }
    if (this.forma.controls['filtro'].value == 'Todo') {
     
    }
  }
}

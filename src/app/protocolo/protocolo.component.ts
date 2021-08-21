import { Component, OnInit } from '@angular/core';
import { Paciente } from '../Class/paciente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styleUrls: ['./protocolo.component.css']
})
export class ProtocoloComponent implements OnInit {
  template: number;
  //--------------------------------------------
  mispacientes = [{ idUsuario: 'MES01021989', nacimiento: '01021989', dominancia: "Diestro", lengua: 'español', escolaridad: 'Universitaria Completa' },
  { idUsuario: "VL25101989", nacimiento: '01021989', dominancia: "Diestro", lengua: 'español', escolaridad: 'Universitaria Completa' },
  { idUsuario: "ECO15081966", nacimiento: '01021966', dominancia: "Diestro", lengua: 'español', escolaridad: 'Universitaria Completa' }];
  //---------------------------------------------
  dateDay = new Date();
  //Template 1 variables de usuario
  nacimiento: any = '';
  escolaridad: any = '';
  lengua: any = '';
  dominancia: any = '';
  forma: FormGroup;
  //variables para los dropdown
  alertaOpciones = ['Confuso', 'Somnoliento', 'Hipoproséxico', 'Otro'];
  estadoEmocionalOpciones = ['Ansiedad', 'Depresión', 'Excitación', 'Negativismo', 'Otro'];
  fuerzaOpciones = ['Hemiplejía/paresia derecha', 'Hemiplejía/paresia izquierda', 'Otro'];
  coordinacioncOpciones = ['Hemianaestesia/hipoestesia derecha', 'Hemianaestesia/hipoestesia izquierda', 'Otro'];
  visionOpciones = ['Hemianopsia derecha', 'Hemianopsia izquierda', 'Ceguera bilateral', 'Otro'];
  audicionOpciones = ['Hipoacusia derecha', 'Hipoacusia izquierda', 'Hipoacusia bilateral', 'Usa audífonos'];
  atencionespacialOpciones = ['Hipoacusia derecha', 'Hipoacusia izquierda', 'Hipoacusia bilateral', 'Usa audífonos'];
  praxiamanualOpciones = ['Hipoacusia derecha', 'Hipoacusia izquierda', 'Hipoacusia bilateral', 'Usa audífonos'];
  deglucionOpciones = ['Disfagia para líquidos', 'Disfagia para sólidos'];
  p1p1 = [{ etiqueta: '0:Ejecucion INCORRECTA', valor: 0 }, { etiqueta: '1:Ejecucion CORRECTA', valor: 1 }];
  p1p2 = [{ etiqueta: '0:Ejecucion INCORRECTA', valor: 0 }, { etiqueta: '0.5:Incompleta o error en el orden', valor: 0.5 }, { etiqueta: '1:Ejecucion CORRECTA', valor: 1 }];
  p1p3 = [{ etiqueta: '0:Ejecucion INCORRECTA', valor: 0 }, { etiqueta: '0.5:Ejecucion incompleta, omite dos comandos', valor: 0.5 }, { etiqueta: '1:Ejecucion incompleta omite un comando', valor: 1 }, { etiqueta: '1.5:Error en el orden, no omite ningun comando', valor: 1.5 }, { etiqueta: '2:Ejecucion CORRECTA', valor: 2 }];
  p2p1 = [{ etiqueta: '0:Habla ausente o ininteligible', valor: 0 }, { etiqueta: '0.25:Respuesta incompleta, parafasias fonémicas y errores fonéticos', valor: 0.25 }, { etiqueta: '0.5:Respuesta completa y correcta', valor: 0.5 }];
  p2p2 = [{ etiqueta: '0:Habla ausente o ininteligible', valor: 0 }, { etiqueta: '1:Pronuncia una unidad de contenio agramatical', valor: 1 }, { etiqueta: '1.5:Pronuncia dos unidades de contenio agramatical', valor: 1.5 }, { etiqueta: '2.5Pronuncia una oracion bien construida y adecuada', valor: 2.5 }];
  p3p1 = [{ etiqueta: '0:Ausencia de Respuesta', valor: 0 }, { etiqueta: '0.5:Repeticion Correcta', valor: 0.5 }];
  p3p2 = [{ etiqueta: '0:Ausencia de Respuesta', valor: 0 }, { etiqueta: '1:Repeticion Correcta', valor: 1 }];
  p3p3 = [{ etiqueta: '0:Ausencia de Respuesta', valor: 0 }, { etiqueta: '0.25:Repeticion Incompleta, repite almenos la mitad de las palabras', valor: 0.25 }, { etiqueta: '0.5:Repeticion Correcta', valor: 0.5 }];
  p3p4 = [{ etiqueta: '0:Ausencia de Respuesta', valor: 0 }, { etiqueta: '0.5:Repeticion Incompleta, repite almenos la mitad de las palabras', valor: 0.5 }, { etiqueta: '1:Repeticion Correcta', valor: 1 }];
  p4p1 = [{ etiqueta: '0:Respuesta errónea: anomia, parafasia, neologismo', valor: 0 }, { etiqueta: '1:Denominación correcta', valor: 1 }]
  p4p2 = [{ etiqueta: '0:Respuesta errónea: anomia, parafasia, neologismo', valor: 0 }, { etiqueta: '2:Denominación correcta', valor: 2 }]
  p5p1 = [{ etiqueta: '0:Ausencia de respuesta, o respuesta errónea', valor: 0 }, { etiqueta: '0.5:Respuesta correcta', valor: 0.5 }];
  p5p2 = [{ etiqueta: '0:Ausencia de respuesta, o respuesta errónea', valor: 0 }, { etiqueta: '1:Respuesta correcta', valor: 1 }];


  //Variables para los totales
  tp1: number = 0;
  tp2: number = 0;
  tp3: number = 0;
  tp4: number = 0;
  tp5: number = 0;
  tp6: number = 0;
  tpt:number=0;


  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.template = 0;
    this.forma = this.fb.group({
      indice: [''],
      inicialesPaciente: ['', Validators.required],
      nacimiento: ['', Validators.required],
      dominancia: ['', Validators.required],
      lengua: ['', Validators.required],
      escolaridad: ['', Validators.required],
      fechaProtocolo: [this.dateDay],
      resumenclinico: [''],
      alerta: ['', Validators.required],
      alertaOpcion: [''],
      alertaOpcionOtro: [''],
      estadoemocional: ['', Validators.required],
      estadoemocionalOpcion: [''],
      estadoemocionalOpcionOtro: [''],
      fuerza: ['', Validators.required],
      fuerzaOpcion: [''],
      fuerzaOpcionOtro: [''],
      coordinacionmotora: ['', Validators.required],
      coordinacionmotoraOpcion: [''],
      coordinacionmotoraOpcionOtro: [''],
      sensibilidad: ['', Validators.required],
      sensibilidadOpcion: [''],
      sensibilidadOpcionOtro: [''],
      vision: ['', Validators.required],
      visionOpcion: [''],
      visionOpcionOtro: [''],
      audicion: ['', Validators.required],
      audicionOpcion: [''],
      atencionespacial: ['', Validators.required],
      atencionespacialOpcion: [''],
      praxiaManual: ['', Validators.required],
      praxiaManualOpcion: [''],
      praxiaOrolinguofaciales: ['', Validators.required],
      deglucion: ['', Validators.required],
      deglucionOpcion: [''],
      p1p1: ['', Validators.required],
      p1p2: ['', Validators.required],
      p1p3: ['', Validators.required],
      p1p4: ['', Validators.required],
      p1p5: ['', Validators.required],
      p1c1o1: [''],
      p1c1o2: [''],
      p1c1o3: [''],
      p1c2o1: [''],
      p1c2o2: [''],
      p2p1: [''],
      p2p2: [''],
      p2p3: [''],
      p2p4: [''],
      p2c1o1: [],
      p2c1o2: [],
      p2c1o3: [],
      p2c2o1: [],
      p2c2o2c1: [],
      p2c2o2c2: [],
      p2c2o2c3: [],
      p2c2o2c4: [],
      p2c2o2c5: [],
      p2c2o2c6: [],
      p2c3o1: [],
      p2c3o2: [],
      p2c3o3: [],
      p2c3o4: [],
      p2c3o5: [],
      p2c3o6: [],
      p3p1: [''],
      p3p2: [''],
      p3p3: [''],
      p3p4: [''],
      p3p5: [''],
      p3p6: [''],
      p3p7: [''],
      p3p8: [''],
      p3p9: [''],
      p4p1: [''],
      p4p2: [''],
      p4p3: [''],
      p4p4: [''],
      p5p1: [''],
      p5p2: [''],
      p5p3: [''],
      p5p4: [''],
      p5p5: [''],
      p5p6: [''],
      p5p7: [''],
      p5p8: [''],
      p5p9: [''],
      p5p10: [''],
      p5p11: [''],
      p6p1: [''],
      p6p2: [''],
      p6p3: [''],
      p6p4: [''],
      p6p5: [''],
      p6p6: [''],
      p6p7: [''],
      p6p8: [''],
      p6p9: [''],
      conclusiones:['']
    });

  }
  ngOnInit(): void {
  }
  nextTemplate() {
    if (this.template == 0) {
      if (this.forma.value.indice != '' && this.template == 0) {
        this.seleccionarPaciente();
        this.template = this.template + 1;
        return;
      }
      else {
        this.toastr.error('Debe elegir un usuario', 'ERROR')
      }
    }
    if (this.template == 1) {
      if (this.forma.value.alerta != '' &&
        this.forma.value.estadoemocional != '' &&
        this.forma.value.fuerza != '' &&
        this.forma.value.coordinacionmotora != '' &&
        this.forma.value.sensibilidad != '' &&
        this.forma.value.vision != '' &&
        this.forma.value.audicion != '' &&
        this.forma.value.atencionespacial != '' &&
        this.forma.value.praxiaManual != '' &&
        this.forma.value.praxiaOrolinguofaciales != '' &&
        this.forma.value.deglucion != '' && this.template == 1) {
        this.template = this.template + 1
        return;
      }
      else {
        this.toastr.error('Todos los campos son obligatorios', 'ERROR')
      }
    }
    if (this.template == 2) {
      if(this.forma.value.p1p1!=''&&
        this.forma.value.p1p2!=''&&
        this.forma.value.p1p3!=''&&
        this.forma.value.p1p4!=''&&
        this.forma.value.p1p5!=''){
          this.template = this.template + 1
          return;
        }
      else{
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }  
    }
    if (this.template == 3) {
      if(this.forma.value.p2p1!=''&&
        this.forma.value.p2p2!=''&&
        this.forma.value.p2p3!=''&&
        this.forma.value.p2p4!=''){
          this.template = this.template + 1
          return;
        }
      else{
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }  
    }
    if (this.template == 4) {
      if(this.forma.value.p3p1!=''&&
        this.forma.value.p3p2!=''&&
        this.forma.value.p3p3!=''&&
        this.forma.value.p3p4!=''&&
        this.forma.value.p3p5!=''&&
        this.forma.value.p3p6!=''&&
        this.forma.value.p3p7!=''&&
        this.forma.value.p3p8!=''&&
        this.forma.value.p3p9!=''){
          this.template = this.template + 1
          return;
        }
      else{
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }  
    }
    if (this.template == 5) {
      if(this.forma.value.p4p1!=''&&
        this.forma.value.p4p2!=''&&
        this.forma.value.p4p3!=''&&
        this.forma.value.p4p4!=''){
          this.template = this.template + 1
          return;
        }
      else{
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }  
    }
    if (this.template == 6) {
      if(this.forma.value.p5p1!=''&&
        this.forma.value.p5p2!=''&&
        this.forma.value.p5p3!=''&&
        this.forma.value.p5p4!=''&&
        this.forma.value.p5p5!=''&&
        this.forma.value.p5p6!=''&&
        this.forma.value.p5p7!=''&&
        this.forma.value.p5p8!=''&&
        this.forma.value.p5p9!=''&&
        this.forma.value.p5p10!=''&&
        this.forma.value.p5p11!=''){
          this.template = this.template + 1
          return;
        }
      else{
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }  
    }
    if (this.template == 7) {
      if(this.forma.value.p6p1!=''&&
        this.forma.value.p6p2!=''&&
        this.forma.value.p6p3!=''&&
        this.forma.value.p6p4!=''&&
        this.forma.value.p6p5!=''&&
        this.forma.value.p6p6!=''&&
        this.forma.value.p6p7!=''&&
        this.forma.value.p6p8!=''&&
        this.forma.value.p6p9!=''){
          this.tpt=this.tp1+this.tp2+this.tp3+this.tp4+this.tp5+this.tp6
          this.template = this.template + 1
          return;
        }
      else{
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }  
    }

    
  }
  backTemplate() {

    this.template = this.template - 1
  }
  //cuando seleccione un empleado de la lista se ejecutara otra peticion http para traer la info del empleado seleccionado y asi cargarlo en el form
  seleccionarPaciente() {
    this.forma.value.inicialesPaciente = this.mispacientes[this.forma.value.indice].idUsuario;
    this.forma.value.nacimiento = this.mispacientes[this.forma.value.indice].nacimiento;
    this.forma.value.escolaridad = this.mispacientes[this.forma.value.indice].escolaridad;
    this.forma.value.lengua = this.mispacientes[this.forma.value.indice].lengua;
    this.forma.value.dominancia = this.mispacientes[this.forma.value.indice].dominancia;
  }
  sumapaso6() {
    var v1: number;
    var v2: number;
    var v3: number;
    var v4: number;
    var v5: number;
    var v6: number;
    var v7: number;
    var v8: number;
    var v9: number;
    if (this.forma.value.p6p1 == null) {
      v1 = 0;
    }
    else {
      v1 = +this.forma.value.p6p1;
    }
    if (this.forma.value.p6p2 == null) {
      v2 = 0;
    }
    else {
      v2 = +this.forma.value.p6p2;
    }
    if (this.forma.value.p6p3 == null) {
      v3 = 0;
    }
    else {
      v3 = +this.forma.value.p6p3;
    }
    if (this.forma.value.p6p4 == null) {
      v4 = 0;
    }
    else {
      v4 = +this.forma.value.p6p4;
    }
    if (this.forma.value.p6p5 == null) {
      v5 = 0;
    }
    else {
      v5 = +this.forma.value.p6p5;
    }
    if (this.forma.value.p6p6 == null) {
      v6 = 0;
    }
    else {
      v6 = +this.forma.value.p6p6;
    }
    if (this.forma.value.p6p7 == null) {
      v7 = 0;
    }
    else {
      v7 = +this.forma.value.p6p7;
    }
    if (this.forma.value.p6p8 == null) {
      v8 = 0;
    }
    else {
      v8 = +this.forma.value.p6p8;
    }
    if (this.forma.value.p6p9 == null) {
      v9 = 0;
    }
    else {
      v9 = +this.forma.value.p6p9;
    }

    this.tp6 = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9
  }

  sumapaso5() {
    var v1: number;
    var v2: number;
    var v3: number;
    var v4: number;
    var v5: number;
    var v6: number;
    var v7: number;
    var v8: number;
    var v9: number;
    var v10: number;
    var v11: number;
    if (this.forma.value.p5p1 == null) {
      v1 = 0;
    }
    else {
      v1 = +this.forma.value.p6p1;
    }
    if (this.forma.value.p5p2 == null) {
      v2 = 0;
    }
    else {
      v2 = +this.forma.value.p5p2;
    }
    if (this.forma.value.p5p3 == null) {
      v3 = 0;
    }
    else {
      v3 = +this.forma.value.p5p3;
    }
    if (this.forma.value.p5p4 == null) {
      v4 = 0;
    }
    else {
      v4 = +this.forma.value.p5p4;
    }
    if (this.forma.value.p5p5 == null) {
      v5 = 0;
    }
    else {
      v5 = +this.forma.value.p5p5;
    }
    if (this.forma.value.p5p6 == null) {
      v6 = 0;
    }
    else {
      v6 = +this.forma.value.p5p6;
    }
    if (this.forma.value.p5p7 == null) {
      v7 = 0;
    }
    else {
      v7 = +this.forma.value.p5p7;
    }
    if (this.forma.value.p5p8 == null) {
      v8 = 0;
    }
    else {
      v8 = +this.forma.value.p5p8;
    }
    if (this.forma.value.p5p9 == null) {
      v9 = 0;
    }
    else {
      v9 = +this.forma.value.p5p9;
    }
    if (this.forma.value.p5p10 == null) {
      v10 = 0;
    }
    else {
      v10 = +this.forma.value.p5p10;
    }
    if (this.forma.value.p5p11 == null) {
      v11 = 0;
    }
    else {
      v11 = +this.forma.value.p5p11;
    }

    this.tp5 = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 + v10 + v11
  }


  sumapaso4() {
    var v1: number;
    var v2: number;
    var v3: number;
    var v4: number;
    if (this.forma.value.p4p1 == null) {
      v1 = 0;
    }
    else {
      v1 = +this.forma.value.p4p1;
    }
    if (this.forma.value.p4p2 == null) {
      v2 = 0;
    }
    else {
      v2 = +this.forma.value.p4p2;
    }
    if (this.forma.value.p4p3 == null) {
      v3 = 0;
    }
    else {
      v3 = +this.forma.value.p4p3;
    }
    if (this.forma.value.p4p4 == null) {
      v4 = 0;
    }
    else {
      v4 = +this.forma.value.p4p4;
    }
    this.tp4 = v1 + v2 + v3 + v4
  }

  sumapaso3() {
    var v1: number;
    var v2: number;
    var v3: number;
    var v4: number;
    var v5: number;
    var v6: number;
    var v7: number;
    var v8: number;
    var v9: number;
    if (this.forma.value.p3p1 == null) {
      v1 = 0;
    }
    else {
      v1 = +this.forma.value.p3p1;
    }
    if (this.forma.value.p3p2 == null) {
      v2 = 0;
    }
    else {
      v2 = +this.forma.value.p3p2;
    }
    if (this.forma.value.p3p3 == null) {
      v3 = 0;
    }
    else {
      v3 = +this.forma.value.p3p3;
    }
    if (this.forma.value.p3p4 == null) {
      v4 = 0;
    }
    else {
      v4 = +this.forma.value.p3p4;
    }
    if (this.forma.value.p3p5 == null) {
      v5 = 0;
    }
    else {
      v5 = +this.forma.value.p3p5;
    }
    if (this.forma.value.p3p6 == null) {
      v6 = 0;
    }
    else {
      v6 = +this.forma.value.p3p6;
    }
    if (this.forma.value.p3p7 == null) {
      v7 = 0;
    }
    else {
      v7 = +this.forma.value.p3p7;
    }
    if (this.forma.value.p3p8 == null) {
      v8 = 0;
    }
    else {
      v8 = +this.forma.value.p3p8;
    }
    if (this.forma.value.p3p9 == null) {
      v9 = 0;
    }
    else {
      v9 = +this.forma.value.p3p9;
    }

    this.tp3 = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9
  }
  sumapaso2() {
    var v1: number;
    var v2: number;
    var v3: number;
    var v4: number;
    if (this.forma.value.p2p1 == null) {
      v1 = 0;
    }
    else {
      v1 = +this.forma.value.p2p1;
    }
    if (this.forma.value.p2p2 == null) {
      v2 = 0;
    }
    else {
      v2 = +this.forma.value.p2p2;
    }
    if (this.forma.value.p2p3 == null) {
      v3 = 0;
    }
    else {
      v3 = +this.forma.value.p2p3;
    }
    if (this.forma.value.p2p4 == null) {
      v4 = 0;
    }
    else {
      v4 = +this.forma.value.p2p4;
    }


    this.tp2 = v1 + v2 + v3 + v4
  }
  sumapaso1() {
    var v1: number;
    var v2: number;
    var v3: number;
    var v4: number;
    var v5: number;
    if (this.forma.value.p1p1 == null) {
      v1 = 0;
    }
    else {
      v1 = +this.forma.value.p1p1;
    }
    if (this.forma.value.p1p2 == null) {
      v2 = 0;
    }
    else {
      v2 = +this.forma.value.p1p2;
    }
    if (this.forma.value.p1p3 == null) {
      v3 = 0;
    }
    else {
      v3 = +this.forma.value.p1p3;
    }
    if (this.forma.value.p1p4 == null) {
      v4 = 0;
    }
    else {
      v4 = +this.forma.value.p1p4;
    }
    if (this.forma.value.p1p5 == null) {
      v5 = 0;
    }
    else {
      v5 = +this.forma.value.p1p4;
    }
    this.tp1 = v1 + v2 + v3 + v4 + v5
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from '../../Class/paciente';
import { ToastrService } from 'ngx-toastr';
import { MispacientesService } from 'src/app/service/mispacientes.service';
import { DatePipe } from '@angular/common';
import { SalvarprotocoloService } from '../../service/salvarprotocolo.service';
import { Protocolo } from '../../Class/protocolo/protocolo';
import { Lectura } from '../../Class/protocolo/lectura';
import { Escritura } from '../../Class/protocolo/escritura';
import { Denominacion } from '../../Class/protocolo/denominacion';
import { ComprensionAuditiva } from '../../Class/protocolo/expresionauditiva';
import { ExpresionOral } from '../../Class/protocolo/expresionoral';
import { Sintomasneurologicos } from '../../Class/protocolo/sintomasneurologicos';
import { Repeticion } from '../../Class/protocolo/repeticion';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevoprotocoloporid',
  templateUrl: './nuevoprotocoloporid.component.html',
  styleUrls: ['./nuevoprotocoloporid.component.css']
})
export class NuevoprotocoloporidComponent implements OnInit {
  template: number;
  enviado:boolean=false;
  //--------------------------------------------
  mispacientes: any;
  idpaciente:any;
  dateDay =new Date(); 
  protocolo:Protocolo;
  lectura:Lectura;
  escritura:Escritura;
  denominacion:Denominacion;
  comprensionAuditiva:ComprensionAuditiva;
  expresionOral:ExpresionOral;
  repeticion:Repeticion;
  sintomasneurologicos:Sintomasneurologicos;
  idprotocolo:any;

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
  sensibilidadOpciones = ['Hemianaestesia/hipoestesia derecha', 'Hemianaestesia/hipoestesia izquierda', 'Otro'];
  visionOpciones = ['Hemianopsia derecha', 'Hemianopsia izquierda', 'Ceguera bilateral', 'Usa Lentes'];
  audicionOpciones = ['Hipoacusia derecha', 'Hipoacusia izquierda', 'Hipoacusia bilateral', 'Usa audífonos'];
  coordinacioncOpciones=['Distemia','Temblor','Otro']
  atencionespacialOpciones = ['Heminegligencia derecha', 'Heminegligencia izquierda'];
  praxiamanualOpciones = ['Apraxia mano derecha', 'Apraxia mano izquierda'];
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
  tpt: number = 0;

  id:any;
//niveles funcionales
nivelca:any;
niveleo:any;
nivelr:any;
niveld:any;
nivell:any;
nivele:any;
  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private _mispacientes: MispacientesService, private _protocolo: SalvarprotocoloService,
    private router:Router, private _ac:ActivatedRoute, private paciente:MispacientesService) { 
      this.template = 0;
    this.protocolo= new Protocolo();
    this.lectura = new Lectura();
    this.escritura= new Escritura();
    this.denominacion = new Denominacion();
    this.comprensionAuditiva=new ComprensionAuditiva();
    this.expresionOral=new ExpresionOral();
    this.repeticion=new Repeticion();
    this.sintomasneurologicos= new Sintomasneurologicos();



    this.mpacientes();
    this.forma = this.fb.group({
      indice: [],
      inicialesPaciente: ['', Validators.required],
      nacimiento: ['', Validators.required],
      dominancia: ['', Validators.required],
      lengua: ['', Validators.required],
      escolaridad: ['', Validators.required],
      fechaProtocolo: [this.dateDay.toLocaleDateString()],
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
      conclusiones: ['']
    });
    this._ac.paramMap.subscribe(param=>{
      this.id= param.get('id');
    })
    this.paciente.pacientePorId(this.id).subscribe(resp=>{
      this.mispacientes=resp;
      console.log(resp);
     
    })

 
  }

  ngOnInit(): void {

  }

  nextTemplate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.cargarpasos();
    this.asignarNivelFuncional();
    if (this.template == 0) {
        this.template = this.template + 1;
        return;
    }if (this.template == 1) {
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
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
      else {
        this.toastr.error('Todos los campos son obligatorios', 'ERROR')
      }
    }
    if (this.template == 2) {
      if (this.forma.value.p1p1 != '' &&
        this.forma.value.p1p2 != '' &&
        this.forma.value.p1p3 != '' &&
        this.forma.value.p1p4 != '' &&
        this.forma.value.p1p5 != '') {
        this.template = this.template + 1;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return;
      }
      else {
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }
    }
    if (this.template == 3) {
      if (this.forma.value.p2p1 != '' &&
        this.forma.value.p2p2 != '' &&
        this.forma.value.p2p3 != '' &&
        this.forma.value.p2p4 != '') {
        this.template = this.template + 1;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return;
      }
      else {
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }
    }
    if (this.template == 4) {
      if (this.forma.value.p3p1 != '' &&
        this.forma.value.p3p2 != '' &&
        this.forma.value.p3p3 != '' &&
        this.forma.value.p3p4 != '' &&
        this.forma.value.p3p5 != '' &&
        this.forma.value.p3p6 != '' &&
        this.forma.value.p3p7 != '' &&
        this.forma.value.p3p8 != '' &&
        this.forma.value.p3p9 != '') {
        this.template = this.template + 1;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return;
      }
      else {
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }
    }
    if (this.template == 5) {
      if (this.forma.value.p4p1 != '' &&
        this.forma.value.p4p2 != '' &&
        this.forma.value.p4p3 != '' &&
        this.forma.value.p4p4 != '') {
        this.template = this.template + 1;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return;
      }
      else {
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }
    }
    if (this.template == 6) {
      if (this.forma.value.p5p1 != '' &&
        this.forma.value.p5p2 != '' &&
        this.forma.value.p5p3 != '' &&
        this.forma.value.p5p4 != '' &&
        this.forma.value.p5p5 != '' &&
        this.forma.value.p5p6 != '' &&
        this.forma.value.p5p7 != '' &&
        this.forma.value.p5p8 != '' &&
        this.forma.value.p5p9 != '' &&
        this.forma.value.p5p10 != '' &&
        this.forma.value.p5p11 != '') {
        this.template = this.template + 1;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return;
      }
      else {
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }
    }
    if (this.template == 7) {
      if (this.forma.value.p6p1 != '' &&
        this.forma.value.p6p2 != '' &&
        this.forma.value.p6p3 != '' &&
        this.forma.value.p6p4 != '' &&
        this.forma.value.p6p5 != '' &&
        this.forma.value.p6p6 != '' &&
        this.forma.value.p6p7 != '' &&
        this.forma.value.p6p8 != '' &&
        this.forma.value.p6p9 != '') {
        this.tpt = this.tp1 + this.tp2 + this.tp3 + this.tp4 + this.tp5 + this.tp6
        this.template = this.template + 1;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return;
      }
      else {
        this.toastr.error('Todos los campos con puntuacion son obligatorios', 'ERROR')
      }
    }


  }
  backTemplate() {

    this.template = this.template - 1
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
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
      v1 = +this.forma.value.p5p1;
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
  //
  //Peticiones http
  //
  //
  mpacientes(){
    this._mispacientes.mispacientes().subscribe(resp=>{
      this.mispacientes=resp;
      console.log(resp);
    })
  }

finalizarProtocolo(){
    //this.cargarprotocolo();
    this.cargarprotocolo();
    console.log('lalalalal');
    
  }
  cargarpasos(){
    this.sintomasneurologicos.Alerta=this.forma.value.alerta;
    this.sintomasneurologicos.AlertaTipoAlteracion=this.forma.value.alertaOpcion;
    this.sintomasneurologicos.AlertaTipoAlteracionOtro=this.forma.value.alertaOpcionOtro;
    this.sintomasneurologicos.AtencionEspacial=this.forma.value.atencionespacial;
    this.sintomasneurologicos.AtencionEspacialTipoAlteracion=this.forma.value.atencionespacialOpcion;
    this.sintomasneurologicos.Audicion=this.forma.value.audicion;
    this.sintomasneurologicos.AudicionTipoAlteracion=this.forma.value.audicionOpcion;
    this.sintomasneurologicos.CondicionMotora=this.forma.value.coordinacionmotora;
    this.sintomasneurologicos.CondicionMotoraTipoAlteracion=this.forma.value.coordinacionmotoraOpcion;
    this.sintomasneurologicos.CondicionMotoraTipoAlteracionOtro=this.forma.value.coordinacionmotoraOpcionOtro;
    this.sintomasneurologicos.Deglucion=this.forma.value.deglucion;
    this.sintomasneurologicos.DeglucionTipoAlteracion=this.forma.value.deglucionOpcion;
    this.sintomasneurologicos.EstadoEmocional=this.forma.value.estadoemocional;
    this.sintomasneurologicos.EstadoEmocionalTipoAlteracion=this.forma.value.estadoemocionalOpcion;
    this.sintomasneurologicos.EstadoEmocionalTipoAlteracionOtro=this.forma.value.estadoemocionalOpcionOtro;
    this.sintomasneurologicos.Fuerza=this.forma.value.fuerza;
    this.sintomasneurologicos.FuerzaTipoAlteracion=this.forma.value.fuerzaOpcion;
    this.sintomasneurologicos.FuerzaTipoAlteracionOtro=this.forma.value.fuerzaOpcionOtro;
    this.sintomasneurologicos.PraxiaManual=this.forma.value.praxiaManual;
    this.sintomasneurologicos.PraxiaManualTipoAlteracion=this.forma.value.praxiaManualOpcion;
    this.sintomasneurologicos.PraxiaOronguofaciales=this.forma.value.praxiaOrolinguofaciales;
    this.sintomasneurologicos.Sensibilidad=this.forma.value.sensibilidad;
    this.sintomasneurologicos.SensibilidadTipoAlteracion=this.forma.value.sensibilidadOpcion;
    this.sintomasneurologicos.SensibilidadTipoAlteracionOtro=this.forma.value.sensibilidadOpcionOtro;
    this.sintomasneurologicos.Vision=this.forma.value.vision;
    this.sintomasneurologicos.VisionTipoAlteracion=this.forma.value.visionOpcion;
    this.sintomasneurologicos.VisionTipoAlteracionOtro=this.forma.value.visionOpcionOtro;
    this.comprensionAuditiva.SenialeElPato=this.forma.value.p1p2;
    this.comprensionAuditiva.SenialeElTecho=this.forma.value.p1p4;
    this.comprensionAuditiva.SenialeLaOveja=this.forma.value.p1p1;
    this.comprensionAuditiva.SenialeLaPuerta=this.forma.value.p1p5;
    this.comprensionAuditiva.ToqueseLaOreja=this.forma.value.p1p3;
    this.expresionOral.DigaSuNombre=this.forma.value.p2p1;
    this.expresionOral.EnQueCiudadNacio=this.forma.value.p2p2;
    this.expresionOral.LaminaConsultaMedica=this.forma.value.p2p4;
    this.expresionOral.LaminaElParque=this.forma.value.p2p3;
    this.repeticion.Almusipa=this.forma.value.p3p9;
    this.repeticion.ElHombreGuardo=this.forma.value.p3p5;
    this.repeticion.Fo=this.forma.value.p3p7;
    this.repeticion.LaMujerRegalo=this.forma.value.p3p6;
    this.repeticion.MuchoRuido=this.forma.value.p3p4;
    this.repeticion.Pensamiento=this.forma.value.p3p3;
    this.repeticion.Precio=this.forma.value.p3p2;
    this.repeticion.Sol=this.forma.value.p3p1;
    this.repeticion.Treyo=this.forma.value.p3p8;
    this.denominacion.LaminaCama=this.forma.value.p4p1;
    this.denominacion.LaminaCome=this.forma.value.p4p3;
    this.denominacion.LaminaRema=this.forma.value.p4p4;
    this.denominacion.LaminaViolin=this.forma.value.p4p2;
    this.lectura.Arco=this.forma.value.p5p2;
    this.lectura.Bleja=this.forma.value.p5p9;
    this.lectura.Casa=this.forma.value.p5p3;
    this.lectura.Cho=this.forma.value.p5p8;
    this.lectura.Comunidad=this.forma.value.p5p6;
    this.lectura.Estatua=this.forma.value.p5p5;
    this.lectura.Grito=this.forma.value.p5p4;
    this.lectura.Mono=this.forma.value.p5p1;
    this.lectura.Ne=this.forma.value.p5p7;
    this.lectura.SaqueLaMano=this.forma.value.p5p11;
    this.lectura.Tudipro=this.forma.value.p5p10;
    this.escritura.Aclaracion=this.forma.value.p6p6;
    this.escritura.Dirchole=this.forma.value.p6p9;
    this.escritura.EME=this.forma.value.p6p1;
    this.escritura.Esperanza=this.forma.value.p6p5;
    this.escritura.Gente=this.forma.value.p6p4;
    this.escritura.Guela=this.forma.value.p6p8;
    this.escritura.Jo=this.forma.value.p6p7;
    this.escritura.Mano=this.forma.value.p6p3;
    this.escritura.ZETA=this.forma.value.p6p2;
  }
  guardarProtocolo(){
    this.cargarpasos();
    this._protocolo.guardarProtocolo(this.protocolo).subscribe(resp=>{
      console.log(resp);
      var id:any=resp;
      this.idprotocolo=id.Id_Protocolo;
      this.enviado=true;
    })
  }
  cargarprotocolo(){
    this.protocolo.ResumenClinico=this.forma.value.resumenclinico;
    this.protocolo.Id_Repeticion_Cualitativa=1;
    this.protocolo.Id_Escritura_Cualitativa=1;
    this.protocolo.Id_Lectura_Cualitativa=1;
    this.protocolo.Id_Denominacion_Cualitativa=1;
    this.protocolo.Id_ComprensionAuditiva_Cualitativa=1;
    this.protocolo.Id_ExpresionOral_Cualitativa=1;
    this.protocolo.ConclusionesRecomendaciones=this.forma.value.conclusiones;
    this.protocolo.Fecha_Protocolo=String(this.dateDay.toLocaleDateString());
    this.protocolo.Total=this.tpt
    this.protocolo.Id_Paciente=this.mispacientes[0].Id_Paciente;
    this.protocolo.Id_Profesional=Number(localStorage.getItem('idusuario'));
    this._protocolo.guardarComprensionAuditivaCuanti(this.comprensionAuditiva)
    .subscribe(resp=>{
      console.log(resp);
      var id:any=resp;
      this.protocolo.Id_ComprensionAuditiva_Cuantitativa=id.Id_ComprensionAuditiva_Cuantitativa;
    
    this._protocolo.guardarLecturaCuanti(this.lectura)
    .subscribe(resp=>{
      console.log(resp);
      var id:any=resp;
      this.protocolo.Id_Lectura_Cuantitativa=id.Id_Lectura_Cuantitativa;
    
    this._protocolo.guardarEscrituraCuanti(this.escritura)
    .subscribe(resp=>{
      console.log(resp);
      var id:any=resp;
      this.protocolo.Id_Escritura_Cuantitativa=id.Id_Escritura_Cuantitativa;
    
    this._protocolo.guardarRepeticionCuanti(this.repeticion)
    .subscribe(resp=>{
      console.log(resp);
      var id:any=resp;
      this.protocolo.Id_Repeticion_Cuantitativa=id.Id_Repeticion_Cuantitativa;
    
    this._protocolo.guardarExpresionOralCuanti(this.expresionOral)
    .subscribe(resp=>{
      console.log(resp);
      var id:any=resp;
      this.protocolo.Id_ExpresionOral_Cuantitativa=id.Id_ExpresionOral_Cuantitativa;
    
    this._protocolo.guardarDenominacionCuanti(this.denominacion)
    .subscribe(resp=>{
      console.log(resp);
      var id:any=resp;
      this.protocolo.Id_Denominacion_Cuantitativa=id.Id_Denominacion_Cuantitativa;
    
    this._protocolo.guardarSintomasNeurologicos(this.sintomasneurologicos)
    .subscribe(resp=>{
      console.log(resp);
      var id:any=resp;
      this.protocolo.Id_SintomasNeurologicos=id.Id_SintomasNeurologicos;
      this.guardarProtocolo();
    })})})})})})})
  }
  asignarNivelFuncional(){
    this.nivelca=this.nivelFuncional(this.tp1);
    this.niveleo=this.nivelFuncional(this.tp2);
    this.nivelr=this.nivelFuncional(this.tp3);
    this.niveld=this.nivelFuncional(this.tp4);
    this.nivell=this.nivelFuncional(this.tp5);
    this.nivele=this.nivelFuncional(this.tp6);
  }
  nivelFuncional(subtotal:number):string {
    var conservado= 'Conservado';
    var alteradol ='Alteracion Leve';
    var alteradom ='Alteracion Moderada';
    var alterados ='Alteracion Severa';
    if (subtotal == 6) {
      return conservado;
    }
    if (subtotal < 6 && subtotal>4) {
      return alteradol;
    }
    if (subtotal <= 4 && subtotal > 2) {
      return alteradom;
    }
    if(subtotal>= 0 && subtotal <= 2){
      return alterados;
      }
      return conservado;
  }

  
verProtocolo(){
  this.router.navigate(['/verProtocolo',this.idprotocolo])
}


}
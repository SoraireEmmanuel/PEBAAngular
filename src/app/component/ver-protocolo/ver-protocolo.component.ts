import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecuperarprotocoloService } from 'src/app/service/recuperarprotocolo.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { image } from 'html2canvas/dist/types/css/types/image';
//import * as jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';

//import jsPDF from 'jspdf';


@Component({
  selector: 'app-ver-protocolo',
  templateUrl: './ver-protocolo.component.html',
  styleUrls: ['./ver-protocolo.component.css']
})
export class VerProtocoloComponent implements OnInit {
  doc: any;
  sintomasneuronales: any;
  denominacionCuali: any;
  denominacionCuanti: any;
  d1: any;
  d2: any;
  d3: any;
  d4: any;
  comprensionAuditivaCuali: any;
  comprensionAuditivaCuanti: any;
  cap1: any;
  cap2: any;
  cap3: any;
  cap4: any;
  cap5: any;
  escrituraCuanti: any;
  escrituraCuali: any;
  e1: any;
  e2: any;
  e3: any;
  e4: any;
  e5: any;
  e6: any;
  e7: any;
  e8: any;
  e9: any;
  lecturaCuanti: any;
  lecturaCuali: any;
  l1: any;
  l2: any;
  l3: any;
  l4: any;
  l5: any;
  l6: any;
  l7: any;
  l8: any;
  l9: any;
  l10: any;
  l11: any;
  repeticionCuali: any;
  repeticionCuanti: any;
  r1: any;
  r2: any;
  r3: any;
  r4: any;
  r5: any;
  r6: any;
  r7: any;
  r8: any;
  r9: any;
  expresionOralCuali: any;
  expresionOralCuanti: any;
  eo1: any;
  eo2: any;
  eo3: any;
  eo4: any;
  paciente: any;
  protocolo: any;
  id: any;
  subtotalComprensionAuditiva: any;
  subtotalComprensionAuditivaNivelFuncional: any;
  subtotalExpresionOralNivelFuncional: any;
  subtotalExpresionOral: any;
  subtotalRepeticion: any;
  subtotalRepeticionNivelFuncional: any;
  subtotalDenominacion: any;
  subtotalDenominacionNivelFuncional: any;
  subtotalLectura: any;
  subtotalLecturaNivelFuncional: any;
  subtotalEscritura: any;
  subtotalEscrituraNivelFuncional: any;

//  @ViewChild('informeCuantitativo', { static: false }) el!: ElementRef<HTMLElement>;
@ViewChild('encabezado', { static: false }) encabezado!: ElementRef<HTMLElement>;
@ViewChild('cuantitativo', { static: false }) cuantitativo!: ElementRef<HTMLElement>;
@ViewChild('tablapuntaje', { static: false }) tablapuntaje!: ElementRef<HTMLElement>;

  constructor(private _service: RecuperarprotocoloService,
    private _ac: ActivatedRoute) {

    this._ac.paramMap.subscribe(param => {
      this.id = param.get('id');
    })

    this._service.recuperarProtocolo(this.id).subscribe(resp => {
      this.cargarProtocolo(resp);
      console.log(resp);
      this.protocolo = resp;
    })
  }
  ngAfterViewInit() {

  }


  ngOnInit(): void {
  }
  cargarProtocolo(protocolo: any) {
    //recuperamos comprensionauditivacualitativa
    this._service.recuperarComprensionAuditivaCuali(protocolo.Id_ComprensionAuditiva_Cualitativa)
      .subscribe(res => {
        this.comprensionAuditivaCuali = res;
        console.log(res);

      })

    //recuperamos comprensionauditivacuantitativa
    this._service.recuperarComprensionAuditivaCuanti(protocolo.Id_ComprensionAuditiva_Cuantitativa).subscribe(res => {
      this.comprensionAuditivaCuanti = res;
      console.log(res);
      this.cap1 = this.respuestatipo1(this.comprensionAuditivaCuanti.SenialeLaOveja, 1);
      this.cap2 = this.respuestatipo1(this.comprensionAuditivaCuanti.SenialeElPato, 1);
      this.cap3 = this.respuestatipo1(this.comprensionAuditivaCuanti.ToqueseLaOreja, 1);
      this.cap4 = this.respuestatipo1(this.comprensionAuditivaCuanti.SenialeElTecho, 2);
      this.cap5 = this.respuestatipo1(this.comprensionAuditivaCuanti.SenialeLaPuerta, 3);
      this.calcularCA(this.comprensionAuditivaCuanti);
    })

    //recuperamos lecturaCualitativa
    this._service.recuperarLecturaCuali(protocolo.Id_Lectura_Cualitativa).subscribe(res => {
      this.lecturaCuali = res;
      console.log(res);
    })
    //recuperamos lecturacuantitativa
    this._service.recuperarLecturaCuanti(protocolo.Id_Lectura_Cuantitativa).subscribe(res => {
      this.lecturaCuanti = res;
      console.log(res);
      this.l1 = this.respuestatipo5(this.lecturaCuanti.Mono, 1);
      this.l2 = this.respuestatipo5(this.lecturaCuanti.Arco, 1);
      this.l3 = this.respuestatipo5(this.lecturaCuanti.Casa, 1);
      this.l4 = this.respuestatipo5(this.lecturaCuanti.Grito, 1);
      this.l5 = this.respuestatipo5(this.lecturaCuanti.Estatua, 1);
      this.l6 = this.respuestatipo5(this.lecturaCuanti.Comunidad, 1);
      this.l7 = this.respuestatipo5(this.lecturaCuanti.Ne, 1);
      this.l8 = this.respuestatipo5(this.lecturaCuanti.Cho, 1);
      this.l9 = this.respuestatipo5(this.lecturaCuanti.Bleja, 1);
      this.l10 = this.respuestatipo5(this.lecturaCuanti.Tudipro, 1);
      this.l11 = this.respuestatipo5(this.lecturaCuanti.SaqueLaMano, 2);
      this.calcularL(this.lecturaCuanti);
    })
    //recuperamos escruturacualitativa
    this._service.recuperarEscrituraCuali(protocolo.Id_Escritura_Cualitativa).subscribe(res => {
      this.escrituraCuali = res;
      console.log(res);
    })
    //recuperamos escrituracuantitativa
    this._service.recuperarEscrituraCuanti(protocolo.Id_Escritura_Cuantitativa).subscribe(res => {
      this.escrituraCuanti = res;
      console.log(res);
      this.e1 = this.respuestatipo5(this.escrituraCuanti.EME, 1);
      this.e2 = this.respuestatipo5(this.escrituraCuanti.ZETA, 1);
      this.e3 = this.respuestatipo5(this.escrituraCuanti.Mano, 1);
      this.e4 = this.respuestatipo5(this.escrituraCuanti.Gente, 1);
      this.e5 = this.respuestatipo5(this.escrituraCuanti.Esperanza, 2);
      this.e6 = this.respuestatipo5(this.escrituraCuanti.Aclaracion, 2);
      this.e7 = this.respuestatipo5(this.escrituraCuanti.Jo, 1);
      this.e8 = this.respuestatipo5(this.escrituraCuanti.Guela, 1);
      this.e9 = this.respuestatipo5(this.escrituraCuanti.Dirchole, 2);
      this.calcularE(this.escrituraCuanti);
    })
    //recuperamos denominacion cualitativa
    this._service.recuperarDenominacionCuali(protocolo.Id_Denominacion_Cualitativa).subscribe(res => {
      this.denominacionCuali = res;
      console.log(res);
    })
    //recuperamos denominacion cuantitativa
    this._service.recuperarDenominacionCuanti(protocolo.Id_Denominacion_Cuantitativa).subscribe(res => {
      this.denominacionCuanti = res;
      console.log(res);
      this.d1 = this.respuestatipo4(this.denominacionCuanti.LaminaCama, 1);
      this.d2 = this.respuestatipo4(this.denominacionCuanti.LaminaViolin, 2);
      this.d3 = this.respuestatipo4(this.denominacionCuanti.LaminaCome, 1);
      this.d4 = this.respuestatipo4(this.denominacionCuanti.LaminaRema, 2);
      this.calcularD(this.denominacionCuanti);
    })
    //recuperamos expresionoral cualitativa
    this._service.recuperarExprecionOralCuali(protocolo.Id_ExpresionOral_Cualitativa).subscribe(res => {
      this.expresionOralCuali = res;
      console.log(res);
    })
    //recuperamos expresionoral cuantitativa
    this._service.recuperarExprecionOralCuanti(protocolo.Id_ExpresionOral_Cuantitativa).subscribe(res => {
      this.expresionOralCuanti = res;
      console.log(res);
      this.eo1 = this.respuestatipo2(this.expresionOralCuanti.DigaSuNombre, 1)
      this.eo2 = this.respuestatipo2(this.expresionOralCuanti.EnQueCiudadNacio, 1)
      this.eo3 = this.respuestatipo2(this.expresionOralCuanti.LaminaElParque, 2)
      this.eo4 = this.respuestatipo2(this.expresionOralCuanti.LaminaConsultaMedica, 2)
      this.calcularEO(this.expresionOralCuanti);
    })
    //recuperamos repeticion cualitativa
    this._service.recuperarRepeticionCuali(protocolo.Id_Repeticion_Cualitativa).subscribe(res => {
      this.repeticionCuali = res;
      console.log(res);

    })
    //recuperamos repeticion cualitativa
    this._service.recuperarRepeticionCuanti(protocolo.Id_Repeticion_Cuantitativa).subscribe(res => {
      this.repeticionCuanti = res;
      console.log(res);
      this.r1 = this.respuestatipo3(this.repeticionCuanti.Sol, 1);
      this.r2 = this.respuestatipo3(this.repeticionCuanti.Precio, 1);
      this.r3 = this.respuestatipo3(this.repeticionCuanti.Pensamiento, 2);
      this.r4 = this.respuestatipo3(this.repeticionCuanti.MuchoRuido, 1);
      this.r5 = this.respuestatipo3(this.repeticionCuanti.ElHombreGuardo, 3);
      this.r6 = this.respuestatipo3(this.repeticionCuanti.LaMujerRegalo, 4);
      this.r7 = this.respuestatipo3(this.repeticionCuanti.Fo, 1);
      this.r8 = this.respuestatipo3(this.repeticionCuanti.Treyo, 1);
      this.r9 = this.respuestatipo3(this.repeticionCuanti.Almusipa, 2);
      this.calcularR(this.repeticionCuanti);
      this.nivelFuncionalR();
    })
    //recuperamos paciente
    this._service.recuperarPaciente(protocolo.Id_Paciente).subscribe(res => {
      this.paciente = res;
      console.log(res);
    })
    //recuperamos sintomas neurologicos
    this._service.recuperarSintomasNeuronales(protocolo.Id_SintomasNeurologicos).subscribe(res => {
      this.sintomasneuronales = res;
      console.log(res);

    })
  }

  respuestatipo1(puntos: any, tipo: number): string {
    var resp: string = ''
    if (puntos == '0') {
      resp = 'Respuesta Incorrecta';
    }
    if (tipo == 1) {
      if (puntos == '1') {
        resp = 'Respuesta Correcta';
      }
    }
    if (tipo == 2) {
      if (puntos == '1') {
        resp = 'Respuesta Correcta';
      }
      if (puntos == '0.5') {
        resp = 'Incompleta o error en el orden';
      }
    }
    if (tipo == 3) {
      if (puntos == '2') {
        resp = 'Ejecucion Correcta';
      }
      if (puntos == '1.5') {
        resp = 'Error en el orden, no omite ningun comando';
      }
      if (puntos == '1') {
        resp = 'Ejecucion incompleta, omite un comando';
      }
      if (puntos == '0.5') {
        resp = 'Ejecucion incompleta, omite dos comandos';
      }
    }
    return resp;
  }

  respuestatipo2(puntos: any, tipo: number): string {
    var resp: string = '';
    if (puntos == 0) {
      resp = 'Habla ausente o ininteligible'
    }
    if (tipo == 1) {
      if (puntos == '0.25') {
        resp = 'Respuesta incompleta, parafasias fonemicas y errores foneticos';
      }
      if (puntos == '0.5') {
        resp = 'Respuesta completa y correcta';
      }
    }
    if (tipo == 2) {
      if (puntos == '1') {
        resp = 'Pronuncia una unidad de contenido agramatical';
      }
      if (puntos == '1.5') {
        resp = 'Pronuncia dos unidades de contenido agramatical';
      }
      if (puntos == '2.5') {
        resp = 'Pronuncia una oracion bien construida y adecuada';
      }
    }
    return resp;
  }
  respuestatipo3(puntos: any, tipo: number) {
    var resp: string = '';
    if (puntos == 0) {
      resp = 'Ausencia de Respuesta'
    }
    if (tipo == 1) {
      if (puntos == 0.5) {
        resp = 'Repeticion Correcta'
      }
    }
    if (tipo == 2) {
      if (puntos == 1) {
        resp = 'Repeticion Correcta'
      }
    }
    if (tipo == 3) {
      if (puntos == 0.25) {
        resp = 'Repeticion Incompleta. Repite almenos la mitad de las palabras'
      }
      if (puntos == 0.5) {
        resp = 'Repeticion Correcta';
      }
    }
    if (tipo == 4) {
      if (puntos == 0.5) {
        resp = 'Repeticion Incompleta. Repite almenos la mitad de las palabras'
      }
      if (puntos == 0.1) {
        resp = 'Repeticion Correcta';
      }
    }
    return resp;
  }
  respuestatipo4(puntos: any, tipo: number): string {
    var resp: string = '';
    if (puntos == 0) {
      resp = 'Respuesta erronea: anomia, parafasia, neologismo'
    }
    if (tipo == 1) {
      if (puntos == 1) {
        resp = 'Denominacion Correcta'
      }
    }
    if (tipo == 2) {
      if (puntos == 2) {
        resp = 'Denominacion Correcta'
      }
    }
    return resp;
  }

  respuestatipo5(puntos: any, tipo: number): string {
    var resp: string = '';
    if (puntos == 0) {
      resp = 'Ausencia de respuesta o respuesta erronea'
    }
    if (tipo == 1) {
      if (puntos == 0.5) {
        resp = 'Respuesta correcta'
      }
    }
    if (tipo == 2) {
      if (puntos == 1) {
        resp = 'Respuesta correcta'
      }
    }
    return resp;
  }
  calcularCA(object: any) {
    this.subtotalComprensionAuditiva = Number(object.SenialeElPato) +
      Number(object.SenialeElTecho) + Number(object.SenialeLaOveja)
      + Number(object.SenialeLaPuerta) + Number(object.ToqueseLaOreja);
    this.nivelFuncionalCA();
  }
  calcularEO(object: any) {
    this.subtotalExpresionOral = Number(object.DigaSuNombre) +
      Number(object.EnQueCiudadNacio) + Number(object.LaminaConsultaMedica)
      + Number(object.LaminaElParque);
    this.nivelFuncionalEO();
  }
  calcularR(object: any) {
    this.subtotalRepeticion = Number(object.Almusipa) +
      Number(object.ElHombreGuardo) + Number(object.Fo)
      + Number(object.LaMujerRegalo) + Number(object.MuchoRuido)
      + Number(object.Pensamiento) + Number(object.Treyo)
      + Number(object.Precio) + Number(object.Sol);
    this.nivelFuncionalR
  }
  calcularD(object: any) {
    this.subtotalDenominacion = Number(object.LaminaCama) +
      Number(object.LaminaCama) + Number(object.LaminaRema)
      + Number(object.LaminaViolin);
    this.nivelFuncionalD();
  }
  calcularL(object: any) {
    this.subtotalLectura = Number(object.Arco) +
      Number(object.Bleja) + Number(object.Casa)
      + Number(object.Cho) + Number(object.Comunidad) +
      Number(object.Estatua) + Number(object.Grito)
      + Number(object.Mono) + Number(object.Ne)
      + Number(object.SaqueLaMano) + Number(object.Tudipro);
    this.nivelFuncionalL();
  }
  calcularE(object: any) {
    this.subtotalEscritura = Number(object.Aclaracion) +
      Number(object.Dirchole) + Number(object.EME)
      + Number(object.Esperanza) + Number(object.Gente) +
      Number(object.Guela) + Number(object.Jo)
      + Number(object.Mano) + Number(object.ZETA);
    //this.subtotalEscritura=Number(1.1111);
    this.nivelFuncionalE();
  }
  nivelFuncionalCA() {
    if (this.subtotalComprensionAuditiva == 6) {
      this.subtotalComprensionAuditivaNivelFuncional = 'Conservado';
    }
    if (this.subtotalComprensionAuditiva < 6 && this.subtotalComprensionAuditiva > 4) {
      this.subtotalComprensionAuditivaNivelFuncional = 'Alteracion Leve';
    }
    if (this.subtotalComprensionAuditiva <= 4 && this.subtotalComprensionAuditiva > 2) {
      this.subtotalComprensionAuditivaNivelFuncional = 'Alteracion Moderada';
    }
    if (this.subtotalComprensionAuditiva >= 0 && this.subtotalComprensionAuditiva <= 2) {
      this.subtotalComprensionAuditivaNivelFuncional = 'Alteracion Severa';
    }

  }
  nivelFuncionalEO() {
    if (this.subtotalExpresionOral == 6) {
      this.subtotalExpresionOralNivelFuncional = 'Conservado';
    }
    if (this.subtotalExpresionOral < 6 && this.subtotalExpresionOral > 4) {
      this.subtotalExpresionOralNivelFuncional = 'Alteracion Leve';
    }
    if (this.subtotalExpresionOral <= 4 && this.subtotalExpresionOral > 2) {
      this.subtotalExpresionOralNivelFuncional = 'Alteracion Moderada';
    }
    if (this.subtotalExpresionOral >= 0 && this.subtotalExpresionOral <= 2) {
      this.subtotalExpresionOralNivelFuncional = 'Alteracion Severa';
    }
  }
  nivelFuncionalE() {
    if (this.subtotalEscritura == 6) {
      this.subtotalEscrituraNivelFuncional = 'Conservado';
    }
    if (this.subtotalEscritura < 6 && this.subtotalEscritura > 4) {
      this.subtotalEscrituraNivelFuncional = 'Alteracion Leve';
    }
    if (this.subtotalEscritura <= 4 && this.subtotalEscritura > 2) {
      this.subtotalEscrituraNivelFuncional = 'Alteracion Moderada';
    }
    if (this.subtotalEscritura >= 0 && this.subtotalEscritura <= 2) {
      this.subtotalEscrituraNivelFuncional = 'Alteracion Severa';
    }
  }
  nivelFuncionalD() {
    if (this.subtotalDenominacion == 6) {
      this.subtotalDenominacionNivelFuncional = 'Conservado';
    }
    if (this.subtotalDenominacion < 6 && this.subtotalDenominacion > 4) {
      this.subtotalDenominacionNivelFuncional = 'Alteracion Leve';
    }
    if (this.subtotalDenominacion <= 4 && this.subtotalDenominacion > 2) {
      this.subtotalDenominacionNivelFuncional = 'Alteracion Moderada';
    }
    if (this.subtotalDenominacion >= 0 && this.subtotalDenominacion <= 2) {
      this.subtotalDenominacionNivelFuncional = 'Alteracion Severa';
    }
  }
  nivelFuncionalL() {
    if (this.subtotalLectura == 6) {
      this.subtotalLecturaNivelFuncional = 'Conservado';
    }
    if (this.subtotalLectura < 6 && this.subtotalLectura > 4) {
      this.subtotalLecturaNivelFuncional = 'Alteracion Leve';
    }
    if (this.subtotalLectura <= 4 && this.subtotalLectura > 2) {
      this.subtotalLecturaNivelFuncional = 'Alteracion Moderada';
    }
    if (this.subtotalLectura >= 0 && this.subtotalLectura <= 2) {
      this.subtotalLecturaNivelFuncional = 'Alteracion Severa';
    }
  }
  nivelFuncionalR() {
    if (this.subtotalRepeticion == 6) {
      this.subtotalRepeticionNivelFuncional = 'Conservado';
    }
    if (this.subtotalRepeticion < 6 && this.subtotalRepeticion > 4) {
      this.subtotalRepeticionNivelFuncional = 'Alteracion Leve';
    }
    if (this.subtotalRepeticion <= 4 && this.subtotalRepeticion > 2) {
      this.subtotalRepeticionNivelFuncional = 'Alteracion Moderada';
    }
    if (this.subtotalRepeticion >= 0 && this.subtotalRepeticion <= 2) {
      this.subtotalRepeticionNivelFuncional = 'Alteracion Severa';
    }
  }
  createPDFCauntitativo() {
    //console.log(this.encabezado.nativeElement);
    //html2canvas(this.encabezado.nativeElement).then((canvas) => {
    //  const imgData = canvas.toDataURL('image/jpeg');
    //  const pdf = new jsPDF({ orientation: 'portrait' });
    //  const imageProps = pdf.getImageProperties(imgData);
    //  console.log(imgData);
    //  const pdfw = pdf.internal.pageSize.getWidth();
    //  const pdfh = (imageProps.height * pdfw) / imageProps.width;
    //  pdf.addImage(imgData, 'png', 5, 5, pdfw, pdfh);   
    //  pdf.save('mypdf.pdf');
    //})
    console.log(this.encabezado.nativeElement);
    const pdf = new jsPDF({ orientation: 'portrait' });
    html2canvas(this.encabezado.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const imageProps = pdf.getImageProperties(imgData);
      
      const pdfw = pdf.internal.pageSize.getWidth();
      const pdfh = (imageProps.height * pdfw) / imageProps.width;
      pdf.addImage(imgData, 'png', 2, 2, pdfw, pdfh);   
         
    pdf.addPage();
    html2canvas(this.cuantitativo.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const imageProps = pdf.getImageProperties(imgData);
      
      const pdfw = pdf.internal.pageSize.getWidth();
      const pdfh = (imageProps.height * pdfw) / imageProps.width;
      pdf.addImage(imgData, 'png', 2, 2, pdfw, pdfh);   
      
      pdf.addPage();
      html2canvas(this.tablapuntaje.nativeElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const imageProps = pdf.getImageProperties(imgData);
        
        const pdfw = pdf.internal.pageSize.getWidth();
        const pdfh = (imageProps.height * pdfw) / imageProps.width;
        pdf.addImage(imgData, 'png', 2, 2, pdfw, pdfh);   
        pdf.save('mypdf.pdf');
      })
    })
  })
  }
  
  createPDFCualitativo() {

  }
}
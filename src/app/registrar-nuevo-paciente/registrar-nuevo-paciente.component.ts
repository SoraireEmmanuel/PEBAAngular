import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registrar-nuevo-paciente',
  templateUrl: './registrar-nuevo-paciente.component.html',
  styleUrls: ['./registrar-nuevo-paciente.component.css']
})
export class RegistrarNuevoPacienteComponent implements OnInit {
lengua=["Español","Portugues","Ingles"];
dominancia=["Ambidiestro","Diestro","Zurdo"];
estudios=["Primaria Incompleta","Primaria Completa","Secundaria Incompleta","Secundaria Completa", "Terciario Incompleto","Terciario Completo","Universitario Incompleto", "Universitario Completo","Sin Estudios"];
  forma:FormGroup;
  constructor(private fb:FormBuilder, private toastr: ToastrService) {
    this.forma=this.fb.group({
      iniciales:['', [Validators.required, Validators.minLength(2)] ],
      nacimiento:['', Validators.required],
      lengua:['', Validators.required],
      dominancia:['', [Validators.required, Validators.minLength(6),Validators.maxLength(16)]],
      estudios:['', [Validators.required, Validators.minLength(6),Validators.maxLength(16)]]
    });
   }

  ngOnInit(): void {
  }
  inicialesValido(){
    return this.forma.get('iniciales')?.invalid && this.forma.get('iniciales')?.touched
  }
  nacimientoValido(){
    return this.forma.get('nacimiento')?.invalid && this.forma.get('nacimiento')?.touched
  }
  lenguaValido(){
    return this.forma.get('lengua')?.invalid && this.forma.get('lengua')?.touched
  }
  diminanciaValido(){
    return this.forma.get('dominancia')?.invalid && this.forma.get('dominancia')?.touched
  }
  estudiosValido(){
    return this.forma.get('estudios')?.invalid && this.forma.get('estudios')?.touched
  }
  convertirMayuscula(){
    this.forma.value.iniciales=this.forma.value.iniciales.toUpperCase();
    console.log(this.forma)
  }
  crearPaciente(){
    this.convertirMayuscula();
  }

}

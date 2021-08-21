import { group } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Profesional } from '../Class/Profesional';
import { AutenticacionService } from '../service/autenticacion.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  profesional: Profesional;
  forma: FormGroup;
  profesion = ["Fonoaudióloga/o", "Psicóloga/o", "Psicopedagoga/o"]
  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private autenticacion: AutenticacionService) {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      profesion: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      terminosyCondiciones: [false, Validators.requiredTrue]
    });
    this.profesional = new Profesional();
  }

  ngOnInit(): void {
  }
  nombreValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }
  apellidoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }
  profesionValido() {
    return this.forma.get('profesion')?.invalid && this.forma.get('profesion')?.touched
  }
  matriculaValido() {
    return this.forma.get('matricula')?.invalid && this.forma.get('matricula')?.touched
  }
  password1Valido() {
    return this.forma.get('password1')?.invalid && this.forma.get('password1')?.touched
  }
  password2Valido() {

    return this.forma.get('password2')?.value != this.forma.get('password1')?.value && this.forma.get('password2')?.touched
  }
  mailValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }
  terminosValido() {
    return this.forma.get('terminos')?.invalid && this.forma.get('terminos')?.touched
  }
  crearCuenta() {
    if (this.forma.invalid) {
      this.toastr.error('Por favor verifique la informacion ingresada', 'ERROR');
      return Object.values(this.forma.controls).forEach(element => {
        element.markAsTouched();
      });
    }
    else {
      this.profesionalClass();
      console.log(this.profesional);
      this.autenticacion.nuevoUsuario(this.profesional)
        .subscribe ( respuesta => {
          console.log(respuesta);
        })
  


      this.toastr.success('Se envio un mail para validar el correo, haga click en el LINK!!', 'CREACION EXITOSA');
    }
  }

  profesionalClass(){
    this.profesional.Apellido=this.forma.value.apellido;
    this.profesional.Mail= this.forma.value.correo;
    this.profesional.Matricula= this.forma.value.matricula;
    this.profesional.Nombre= this.forma.value.nombre;
    this.profesional.PasswordCuenta= this.forma.value.password1
    this.profesional.Profesion= this.forma.value.profesion;
    this.profesional.Terminosycondicioes= this.forma.value.terminosyCondiciones;
    
  }


}

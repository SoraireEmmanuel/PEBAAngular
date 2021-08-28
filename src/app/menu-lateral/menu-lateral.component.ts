import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../Class/UsuarioLogin'
import { AutenticacionService } from '../service/autenticacion.service';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  usuariologin: UsuarioLogin;
  menuView: boolean = true;

  constructor(private toastr: ToastrService, private router: Router,
    private autenticacion: AutenticacionService) {

    this.usuariologin = new UsuarioLogin();
  }

  ngOnInit() {
    if (this.autenticacion.estaAutenticado()) {
      this.menuView = false;
    } else {
      this.menuView = true;
    }
  }

  login() {
    //validar el login con el servicio y dependiendo de lo que retorne el servidor encender el toast y cammbiar el estado del menuView, sea cual sea el resultado blanquear las variables
    if (this.usuariologin.Mail != '' && this.usuariologin.PasswordCuenta != '') {
      this.autenticacion.login(this.usuariologin)
        .subscribe(respuesta => {
          console.log(respuesta);
          localStorage.setItem('token', respuesta);

          this.autenticacion.idUsuario(this.usuariologin).subscribe(resp => {
            console.log(resp[0].id_profesional);
            localStorage.setItem('idusuario', resp[0].id_profesional)
            this.menuView = false;
            this.router.navigate(['misPacientes']);
          })

        },
          (error) => {
            console.log('not');
          }
        )
    }
    else {
      this.toastr.error('Debe ingresar una Matricula y su Contraseña', 'LOGIN ERROR')
      this.usuariologin.Mail = '';
      this.usuariologin.PasswordCuenta = '';
    }
  }
  logout() {
    this.autenticacion.logout();
    this.menuView = true;
    this.router.navigate(['home']);
    // borrar el token y cambiar el estado del menu
  }
}

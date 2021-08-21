import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../Class/UsuarioLogin'


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  usuariologin: UsuarioLogin;
  menuView: boolean = true;
 
  constructor(private toastr: ToastrService, private router: Router) { 
    this.usuariologin = new UsuarioLogin();
  }

  ngOnInit(){
  }

  login() {
    //validar el login con el servicio y dependiendo de lo que retorne el servidor encender el toast y cammbiar el estado del menuView, sea cual sea el resultado blanquear las variables
    if (this.usuariologin.Matricula != '' && this.usuariologin.PasswordCuenta!='') {
      this.menuView=false;
      this.router.navigate(['misPacientes'])
    }
    else {
      this.toastr.error('Debe ingresar una Matricula y su Contraseña', 'LOGIN ERROR')
      this.usuariologin.Matricula='';
      this.usuariologin.PasswordCuenta='';
    }
  }
  logout() {
    //    this.menuView=true;
    //   this.router.navigate(['home']);
    // borrar el token y cambiar el estado del menu
  }
}

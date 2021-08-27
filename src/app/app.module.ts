import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';

//importamos las rutas
import { RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';

//Importar modulos para formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//toast module
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'

//boostrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MisPacientesComponent } from './mis-pacientes/mis-pacientes.component';
import { RegistrarNuevoPacienteComponent } from './registrar-nuevo-paciente/registrar-nuevo-paciente.component';
import { NuevoProtocoloComponent } from './nuevo-protocolo/nuevo-protocolo.component';
import { HistorialComponent } from './historial/historial.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';

import { AutocompleteLibModule} from 'angular-ng-autocomplete'

import { NgSelect2Module } from 'ng-select2';
import { HistorialporusuarioComponent } from './component/historialporusuario/historialporusuario.component';
import { NuevoprotocoloporidComponent } from './component/nuevoprotocoloporid/nuevoprotocoloporid.component';
import { VerProtocoloComponent } from './component/ver-protocolo/ver-protocolo.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuLateralComponent,
    RegistrarUsuarioComponent,
    MisPacientesComponent,
    RegistrarNuevoPacienteComponent,
    NuevoProtocoloComponent,
    HistorialComponent,
    ProtocoloComponent,
    HistorialporusuarioComponent,
    NuevoprotocoloporidComponent,
    VerProtocoloComponent
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    AutocompleteLibModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserModule,
    NgSelect2Module,
    RouterModule.forRoot( ROUTES, {useHash:true}),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }) // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

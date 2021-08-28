import { Routes} from '@angular/router'
import { HistorialporusuarioComponent } from './component/historialporusuario/historialporusuario.component';
import { NuevoprotocoloporidComponent } from './component/nuevoprotocoloporid/nuevoprotocoloporid.component';
import { VerProtocoloComponent } from './component/ver-protocolo/ver-protocolo.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { HistorialComponent } from './historial/historial.component';
import { InicioComponent } from './inicio/inicio.component'
import { MisPacientesComponent } from './mis-pacientes/mis-pacientes.component';
import { NuevoProtocoloComponent } from './nuevo-protocolo/nuevo-protocolo.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';
import { RegistrarNuevoPacienteComponent } from './registrar-nuevo-paciente/registrar-nuevo-paciente.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component'

export const ROUTES:Routes=[
    { path: 'inicio', component: InicioComponent },
    { path: 'registrarUsuario', component: RegistrarUsuarioComponent },
    { path: 'misPacientes', component: MisPacientesComponent, canActivate:[AutenticacionGuard] },
    { path: 'registrarNuevoPaciente', component: RegistrarNuevoPacienteComponent, canActivate:[AutenticacionGuard] },
    { path: 'protocolo', component: ProtocoloComponent , canActivate:[AutenticacionGuard]},
    { path: 'histrial', component: HistorialComponent , canActivate:[AutenticacionGuard]},
    { path: 'histrialporusuario/:id', component: HistorialporusuarioComponent , canActivate:[AutenticacionGuard]},
    { path: 'protocoloporusuario/:id', component:NuevoprotocoloporidComponent  , canActivate:[AutenticacionGuard]},
    { path: 'verProtocolo/:id', component:VerProtocoloComponent  , canActivate:[AutenticacionGuard]},
    { path: '', pathMatch: 'full', redirectTo: 'inicio'},
    { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

 
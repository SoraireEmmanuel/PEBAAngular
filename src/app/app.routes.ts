import { Routes} from '@angular/router'
import { HistorialporusuarioComponent } from './component/historialporusuario/historialporusuario.component';
import { NuevoprotocoloporidComponent } from './component/nuevoprotocoloporid/nuevoprotocoloporid.component';
import { VerProtocoloComponent } from './component/ver-protocolo/ver-protocolo.component';
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
    { path: 'misPacientes', component: MisPacientesComponent },
    { path: 'registrarNuevoPaciente', component: RegistrarNuevoPacienteComponent },
    { path: 'protocolo', component: ProtocoloComponent},
    { path: 'histrial', component: HistorialComponent },
    { path: 'histrialporusuario/:id', component: HistorialporusuarioComponent },
    { path: 'protocoloporusuario/:id', component:NuevoprotocoloporidComponent  },
    { path: 'verProtocolo/:id', component:VerProtocoloComponent  },
    { path: '', pathMatch: 'full', redirectTo: 'inicio'},
    { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

 
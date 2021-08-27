import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MispacientesService} from '../service/mispacientes.service'

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.css']
})
export class MisPacientesComponent implements OnInit {
  pacientes:any;
  constructor(private mispacientes:MispacientesService,
              private router:Router) {
    this.mispacientes.mispacientes().subscribe(resp=>{
      console.log(resp);
      this.pacientes=resp;

    })
   }

  ngOnInit(): void {
  
  }

protocolosPrevios(id:string){
  console.log(id);
  this.router.navigate(['/histrialporusuario',id])

}
nuevoProtocolo(id:string){
  console.log(id);
  this.router.navigate(['/protocoloporusuario',id])
}


}

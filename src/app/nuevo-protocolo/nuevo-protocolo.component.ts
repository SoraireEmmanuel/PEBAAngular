import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nuevo-protocolo',
  templateUrl: './nuevo-protocolo.component.html',
  styleUrls: ['./nuevo-protocolo.component.css']
})
export class NuevoProtocoloComponent implements OnInit {
  template:number;
  dateDay=new Date();
  date:string;
  selectSearch:string="";
  constructor(private datePipe:DatePipe) {
    this.date = 's'+this.datePipe.transform(this.dateDay, 'dd-MM-yyyy');
    this.template=9;
   }

  ngOnInit(): void {
  }
  userSelected():boolean{
    if(this.selectSearch!=""){
    return true;
    }
    else{
    return false;
    }
  }
  nextTemplate(){
    this.template=this.template+1
  }
  backTemplate(){
    this.template=this.template-1
  }
}

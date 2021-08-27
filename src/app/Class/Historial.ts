export class HistorialProtocolo{
    public Id_Protocolo:number;
    public Cod_Paciente:string;
    public FechaProtocolo:string;
    public Total: number;
      constructor(
                  ){
  
          this.Cod_Paciente='';
          this.Id_Protocolo=0;
          this.FechaProtocolo='';
          this.Total=0;
      }
  }
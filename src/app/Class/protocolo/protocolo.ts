export class Protocolo{
    public ConclusionesRecomendaciones:string;
    public Fecha_Protocolo:string;
    public Id_ComprensionAuditiva_Cualitativa:number;
    public Id_ComprensionAuditiva_Cuantitativa: number;
    public Id_Denominacion_Cualitativa:number;
    public Id_Denominacion_Cuantitativa:number;
    public Id_Escritura_Cualitativa:number;
    public Id_Escritura_Cuantitativa: number;
    public Id_ExpresionOral_Cualitativa:number;
    public Id_ExpresionOral_Cuantitativa:number;
    public Id_Lectura_Cualitativa:number;
    public Id_Lectura_Cuantitativa:number;
    public Id_Paciente:number;
    public Id_Profesional: number;
    public Id_Repeticion_Cualitativa:number;
    public Id_Repeticion_Cuantitativa:number;
    public Id_SintomasNeurologicos:number;
    public ResumenClinico :string;
    public Total :number;
    

      constructor(
                  ){
      this.ConclusionesRecomendaciones='';
      this.Fecha_Protocolo='';
      this.Id_ComprensionAuditiva_Cualitativa=1;
      this.Id_ComprensionAuditiva_Cuantitativa=1;
      this.Id_Denominacion_Cualitativa=1;
      this.Id_Denominacion_Cuantitativa=2;
      this.Id_Escritura_Cualitativa=2;
      this.Id_Escritura_Cuantitativa=4;
      this.Id_ExpresionOral_Cualitativa=1;
      this.Id_ExpresionOral_Cuantitativa=1;
      this.Id_Lectura_Cualitativa=1;
      this.Id_Lectura_Cuantitativa=1;
      this.Id_Paciente=1;
      this.Id_Profesional=1;
      this.Id_Repeticion_Cualitativa=1;
      this.Id_Repeticion_Cuantitativa=1;
      this.Id_SintomasNeurologicos=3;
      this.ResumenClinico='';
      this.Total=1;
      }
  }

export class Paciente{
  public Cod_Paciente:string;
  public Iniciales:string;
  public FechaNacimiento:string;
  public Lengua: string;
  public Dominancia:string;
  public Estudios: string;
  public Id_Profesional:any;
    constructor(
                ){

        this.Cod_Paciente='';
        this.Iniciales='';
        this.FechaNacimiento='';
        this.Lengua='';
        this.Dominancia='';
        this.Estudios='';
        this.Id_Profesional='';
    }
}
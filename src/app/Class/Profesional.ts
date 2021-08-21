export class Profesional{
    public Nombre:string;
    public Apellido: string;
    public Profesion: string;
    public PasswordCuenta: string;
    public Matricula: string;
    public Mail: string;
    public Terminosycondicioes: boolean
    constructor(
               
                ){
    this.Nombre='';
    this.Apellido='';
    this.Profesion='';
    this.PasswordCuenta='';
    this.Matricula='';
    this.Mail='';
    this.Terminosycondicioes=false;
    }
}
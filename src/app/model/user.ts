import {registro} from './registro'
export class user{

    public Id:Number;
    public PNombre:string;
    public SNombre:string;
    public PApellido:string;
    public SApellido:string;
    public InicioIngreso:string;
    public PaisEmpleo:string;
    public TipoIdentificacion:string;
    public NumeroIdentificacion:string;
    public CorreoElectronico:string;
    public Area:string;
    public Estado:string;
    public FechaHoraRegistro:string;
    public registro:registro/*{"InicioIngreso": "",
    "PaisEmpleo": "",
    "Area": 1, 
    "Estado": 1, 
    "FechaHoraRegistro": "",
    "TipoIdentificacion": "",
    "NumeroIdentificacion": "",
    "CorreoElectronico": ""};*/

    constructor(
        Id:Number,
        PNombre:string,
        SNombre:string,
        PApellido:string,
        SApellido:string,
        InicioIngreso:string,
        PaisEmpleo:string,
        TipoIdentificacion:string,
        NumeroIdentificacion:string,
        CorreoElectronico:string,
        Area:string,
        Estado:string,
        FechaHoraRegistro:string,
        registro:registro /*{"InicioIngreso": "",
        "PaisEmpleo": "",
        "Area": 1, 
        "Estado": 1, 
        "FechaHoraRegistro": "",
        "TipoIdentificacion": "",
        "NumeroIdentificacion": "",
        "CorreoElectronico": ""}*/){
       this.Id= Id
       this.PNombre= PNombre
       this.SNombre= SNombre
       this.PApellido= PApellido
       this.SApellido= SApellido
       this.InicioIngreso= InicioIngreso
       this.PaisEmpleo= PaisEmpleo
       this.TipoIdentificacion= TipoIdentificacion
       this.NumeroIdentificacion= NumeroIdentificacion
       this.CorreoElectronico= CorreoElectronico
       this.Area= Area
       this.Estado= Estado
       this.FechaHoraRegistro= FechaHoraRegistro
       this.registro= registro
    }


}
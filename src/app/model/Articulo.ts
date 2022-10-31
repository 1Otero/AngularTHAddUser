export class Articulo{
    public Id:number
    public PNombre:string
    public SNombre:string
    public PApellido:string
    public SApellido:string
    public PaisEmpleo:string
    public Area:string
    public NumeroIdentificacion:string
    public CorreoElectronico:string
    constructor(Id:number,PNombre:string,SNombre:string,PApellido:string,SApellido:string,PaisEmpleo:string,Area:string,NumeroIdentificacion:string,CorreoElectronico:string){
        this.Id=Id
        this.PNombre=PNombre
        this.SNombre=SNombre
        this.PApellido=PApellido
        this.SApellido=SApellido
        this.PaisEmpleo=PaisEmpleo
        this.Area=Area
        this.NumeroIdentificacion=NumeroIdentificacion
        this.CorreoElectronico=CorreoElectronico
    }
}
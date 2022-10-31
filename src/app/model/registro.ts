export class registro{
    public InicioIngreso:string 
    public PaisEmpleo:string
    public Area:string
    public Estado:string
    public FechaHoraRegistro:string
    public TipoIdentificacion:string
    public NumeroIdentificacion:string
    public CorreoElectronico:string

    constructor(InicioIngreso:string,
        PaisEmpleo:string,
        Area:string,
        Estado:string,
        FechaHoraRegistro:string,
        TipoIdentificacion:string,
        NumeroIdentificacion:string,
        CorreoElectronico:string){
            this.InicioIngreso=InicioIngreso
            this.PaisEmpleo=PaisEmpleo
            this.Area=Area
            this.Estado=Estado
            this.FechaHoraRegistro=FechaHoraRegistro
            this.TipoIdentificacion=TipoIdentificacion
            this.NumeroIdentificacion=NumeroIdentificacion
            this.CorreoElectronico=CorreoElectronico
    }
}
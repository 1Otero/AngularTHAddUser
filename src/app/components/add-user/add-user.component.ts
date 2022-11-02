import {Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {user} from '../../model/user'
import {registro as registroo} from '../../model/registro'
import {UserServicesService} from '../../services/user-services.service'
import {ActivatedRoute, Router} from '@angular/router'
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form!:FormGroup
  @ViewChild('testt') public tst!:ElementRef 
  @ViewChild('btn') public btn!:ElementRef
  @ViewChild('pais') pais!:ElementRef
  @ViewChild('iIdent') iIdent!:ElementRef
  area:any=['Elegir area','Ventas','Mercadeo','Taquillas','call center','IT']
  modificar:Boolean=false
  paso:number=0
  cli:user={
    Id: 0,
    PNombre: '',
    SNombre: '',
    PApellido: '',
    SApellido: '',
    InicioIngreso: '',
    PaisEmpleo: '',
    TipoIdentificacion: '',
    NumeroIdentificacion: '',
    CorreoElectronico: '',
    Area: '',
    Estado: '',
    FechaHoraRegistro: '',
    registro: new registroo("","","0","0","","","","")
  }
  
  constructor(private service:UserServicesService,
     private activate:ActivatedRoute,
     private router:Router, 
     private  renderer2:Renderer2,
     private builForm: FormBuilder) { 
    this.buildForm()
  } 
  ngOnInit(): void {
    this.clickFunction()
  }
  async getUser(Id:Number){
    await (await this.service.getUser(Id)).subscribe(e => {
      this.cli = e
      console.log(e)
      console.log(this.cli)
    })
  }
  async clickFunction(){
    var params = this.activate.snapshot.params
    var id = params['Id']
     if(params['Id']){
      await this.getUser(id)
      this.modificar=true
     }
  }
  generarCorreoAlternativo(n:number){
    //return "".concat(this.cli.PNombre,".",this.cli.PApellido,".",n.toString(),"@cidenet.com.",this.cli.registro.PaisEmpleo.slice(0,2))
    return "".concat(this.cli.PNombre,".",this.cli.PApellido,".",n.toString(),"@cidenet.com.",this.pais.nativeElement.value.slice(0,2))
  }
  async validarCorreo(validar:string,id:Number){
    var correos:number = await this.service.getCorreos(validar,id)
    console.log(await correos)
    if(await correos > 0){
      var nuevo = await this.generarCorreoAlternativo(correos)
      return nuevo
    }else{
      //return validar.concat("@cidenet.com.",this.cli.registro.PaisEmpleo.slice(0,2))
      return validar.concat("@cidenet.com.",this.pais.nativeElement.value.slice(0,2))
    }
  }
  async generarCorreo(){
    var PNombre= this.cli.PNombre.toLowerCase()
    var PApellido= this.cli.PApellido.toLowerCase()
    //var validar = "".concat(PNombre,".",PApellido,"@cidenet.com.",pais.slice(0,2))
    var validar = "".concat(PNombre,".",PApellido)
    var correo= await this.validarCorreo(validar,this.cli.Id)
    return correo
  }
  async refresh(){
    var params = this.activate.snapshot.params
    var id = params['Id']
    var enviar = {
      "Id": this.modificar==true?params['Id']:null,
      "PNombre": this.cli.PNombre,
      "SNombre": this.cli.SNombre,
      "PApellido": this.cli.PApellido,
      "SApellido": this.cli.SApellido,
      "registro": {"InicioIngreso": this.cli.registro.InicioIngreso,
      "PaisEmpleo": this.pais.nativeElement.value,
      //"PaisEmpleo": this.cli.registro.PaisEmpleo==null?'col':this.cli.registro.PaisEmpleo, //city
      "Area": Number.parseInt(this.cli.registro.Area), 
      "Estado": Number.parseInt(this.cli.registro.Estado), 
      //"TipoIdentificacion": this.cli.registro.TipoIdentificacion,
      "TipoIdentificacion": this.iIdent.nativeElement.value,
      "NumeroIdentificacion": this.cli.registro.NumeroIdentificacion,
      "CorreoElectronico": this.paso==1?await this.generarCorreo():this.cli.registro.CorreoElectronico}
      }
      return await enviar
  }
  async modificarUser(){
   this.paso= 1
   var dato = await this.refresh()
   console.log(dato)
   await this.service.update(dato) 
   this.router.navigate(['/'])
  }
  async guardar(){   
    this.paso= 1 
    var dato = await this.refresh()
    console.log(await dato)
    await this.service.save(await dato)
    this.router.navigate(['/'])
  }
  private buildForm(){
    this.form = this.builForm.group({
      'PNombre':[0,Validators.compose([Validators.minLength(4),Validators.pattern(/^[A-Z]+$/),Validators.required])],
      'SNombre':[0,Validators.compose([Validators.minLength(4), Validators.pattern(/^[A-Z]+$/)])],
      'PApellido':[0,Validators.compose([Validators.minLength(4),Validators.pattern(/^[A-Z]+$/),Validators.required])],
      'SApellido':[0,Validators.compose([Validators.minLength(4),Validators.pattern(/^[A-Z]+$/)])]
    })
  }
}



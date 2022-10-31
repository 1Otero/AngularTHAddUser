import { Component, OnInit } from '@angular/core';
import {user} from '../../model/user'
import {registro as registroo} from '../../model/registro'
import {UserServicesService} from '../../services/user-services.service'
import {ActivatedRoute, Router} from '@angular/router'
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

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
    registro: new registroo("","col","0","0","","","","")/*{"InicioIngreso": "",
    "PaisEmpleo": "",
    "Area": 1, 
    "Estado": 1, 
    "FechaHoraRegistro": "",
    "TipoIdentificacion": "",
    "NumeroIdentificacion": "",
    "CorreoElectronico": ""}*/
  }

  constructor(private service:UserServicesService, private activate:ActivatedRoute, private router:Router) { }

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
    return "".concat(this.cli.PNombre,".",this.cli.PApellido,".",n.toString(),"@cidenet.com.",this.cli.registro.PaisEmpleo.slice(0,2))
  }
  async validarCorreo(validar:string){
    var correos = await this.service.getCorreos(validar)
    if(correos > 0){
      var nuevo = await this.generarCorreoAlternativo(correos)
      return nuevo
    }else{
      return validar.concat("@cidenet.com.",this.cli.registro.PaisEmpleo.slice(0,2))
    }
  }
  async generarCorreo(){
    var PNombre= this.cli.PNombre
    var PApellido= this.cli.PApellido
    //var validar = "".concat(PNombre,".",PApellido,"@cidenet.com.",pais.slice(0,2))
    var validar = "".concat(PNombre,".",PApellido)
    var correo= await this.validarCorreo(validar)
    return correo
  }
  async refresh(){
    var params = this.activate.snapshot.params
    var id = params['Id']
    var enviar = await {
      "Id": this.modificar==true?params['Id']:null,
      "PNombre": this.cli.PNombre,
      "SNombre": this.cli.SNombre,
      "PApellido": this.cli.PApellido,
      "SApellido": this.cli.SApellido,
      "registro": {"InicioIngreso": this.cli.registro.InicioIngreso,
      "PaisEmpleo": this.cli.registro.PaisEmpleo==null?'col':this.cli.registro.PaisEmpleo,
      "Area": Number.parseInt(this.cli.registro.Area), 
      "Estado": Number.parseInt(this.cli.registro.Estado), 
      "TipoIdentificacion": this.cli.registro.TipoIdentificacion,
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
    await this.service.save(dato)
    this.router.navigate(['/'])
  }
}

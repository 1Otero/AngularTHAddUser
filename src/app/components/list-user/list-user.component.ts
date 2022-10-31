import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserServicesService} from '../../services/user-services.service'
import {user} from '../../model/user'
import {Articulo} from '../../model/Articulo'
import {Observable} from 'rxjs'
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  dataSource:any
  cargando:Boolean=true
  areas:any=['Ventas','Mercadeo','Taquillas','call center','IT']
  //listObservable!:Observable<user[]>
  listObservable!:user[]
  columnas:String[]=["Id","PNombre","SNombre","PApellido","SApellido","PaisEmpleo","Area","NumeroIdentificacion","CorreoElectronico"]
  constructor(private UService:UserServicesService) { }

  ngOnInit(): void {
    this.cargando=true
    setTimeout(() => {
      this.getAllUsers()
      this.cargando=false
    },1000)
  }
  async getAllUsers(){
    //this.listObservable = await this.UService.getAllUser()
    await (await this.UService.getAllUser()).subscribe(e => {
      this.listObservable = e
      this.dataSource = new MatTableDataSource(e)
    })
  }
  filtrar(event:Event){
    const filtro = (event.target as HTMLInputElement).value
    this.dataSource.filter = filtro.trim().toLowerCase()
  }
  async deleteUser(Id:Number){
    this.UService.delete(Id)
    this.getAllUsers
  }
}

import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable, retry} from 'rxjs'
import {user} from '../model/user'

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  ruta:String="http://localhost:8081/api/api"

  constructor(private http:HttpClient) { }

  async getUser(Id:Number):Promise<Observable<user>>{
    return await this.http.get<user>(`${this.ruta}/usuario/id?id=${Id}`)
  }
  async getAllUser():Promise<Observable<user[]>>{
    return await  this.http.get<user[]>(`${this.ruta}/`)
  }
  //async save(cli:any){
  async save(cli:any):Promise<void>{
    await this.http.post<user>(`${this.ruta}/add`,cli)
    .subscribe(e => {
      console.log(e)
    })
  }
  async update(cli:any){
    console.log("paso service update")
    await this.http.post<user>(`${this.ruta}/update`,cli)
    .subscribe(e => {
      console.log(e)
    })
  }
  delete(Id:Number){
    this.http.delete(`${this.ruta}/delete/id?id=${Id}`).subscribe(e => {
      console.log("paso eliminar" + Id) 
    }) 
  }
  async getCorreos(validar:string,id:Number){
    var numCorreos!:number;
    var dato = await this.http.post<number>(`${this.ruta}/validarcorreo`,{correo:validar,id})
    dato.subscribe(e => {
      numCorreos = e
    })
    return numCorreos
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
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
  async save(cli:any){
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
  async delete(Id:Number){
    console.log("Eliminando: " + Id)
    await this.http.delete(`${this.ruta}/delete/id?id=${Id}`).subscribe() 
  }
  async getCorreos(validar:string):Promise<number>{
    var numCorreos = 0;
    await this.http.post<number>(`${this.ruta}/validarcorreo`,validar).subscribe(e => {
      numCorreos = e
    })
    return await numCorreos
  }
}

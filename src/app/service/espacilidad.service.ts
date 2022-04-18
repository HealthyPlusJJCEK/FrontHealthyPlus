import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Paciente} from "../models/paciente";
import {map, Observable} from "rxjs";
import {Usuario} from "../models/usuario";
import {Espacilidad} from "../models/espacilidad";

@Injectable({
  providedIn: 'root'
})
export class EspacilidadService {

  private urlEndPoint:string='https://apphealthyplus.herokuapp.com/api/especiliades';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http:HttpClient) { }


  saveEspecilidad(espacilidad: Espacilidad):Observable<Usuario>{
    return this.http.post<Paciente>(this.urlEndPoint,espacilidad,{headers: this.httpHeaders})
  }

  updateEspecilidad(espacilidad: Espacilidad):Observable<Usuario>{
    return this.http.put<Espacilidad>(this.urlEndPoint,espacilidad,{headers: this.httpHeaders})
  }

  deleteEspecilidad(id?: Number){
    return this.http.delete<Espacilidad>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getEspecilidad():Observable<Espacilidad[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Espacilidad[]))
  }
}

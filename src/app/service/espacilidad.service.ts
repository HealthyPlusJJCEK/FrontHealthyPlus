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

  private urlEndPoint:string='http://localhost:8080/api/especiliades';
  private httpHeaders = new HttpHeaders()

  constructor(private http:HttpClient) { }


  saveEspecilidad(espacilidad: Espacilidad):Observable<Usuario>{
    console.log(espacilidad);
    return this.http.post<Paciente>(this.urlEndPoint,espacilidad)
  }

  updateEspecilidad(espacilidad: Espacilidad):Observable<Usuario>{
    console.log(espacilidad);
    return this.http.put<Espacilidad>(this.urlEndPoint,espacilidad)
  }

  deleteEspecilidad(id?: Number){
    return this.http.delete<Espacilidad>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getEspecilidad():Observable<Espacilidad[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Espacilidad[]))
  }
}

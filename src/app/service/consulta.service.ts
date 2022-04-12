import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Citas} from "../models/citas";
import {map, Observable} from "rxjs";
import {Consultas, Diagnostico} from "../models/consultas";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private urlEndPoint:string='http://localhost:8080/api/consultas';
  private httpHeaders = new HttpHeaders()

  constructor(private http:HttpClient) { }


  saveConsultas(consultas: Consultas):Observable<Consultas>{
    console.log(consultas);
    return this.http.post<Consultas>(this.urlEndPoint,consultas)
  }

  updateConsultas(consultas: Consultas):Observable<Consultas>{
    console.log(consultas);
    return this.http.put<Consultas>(this.urlEndPoint,consultas)
  }

  deleteConsultas(id?: Number){
    return this.http.delete<Citas>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getConsultas():Observable<Consultas[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Consultas[]))
  }
}

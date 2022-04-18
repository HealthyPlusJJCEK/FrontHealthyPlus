import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Paciente} from "../models/paciente";
import {map, Observable} from "rxjs";
import {Usuario} from "../models/usuario";
import {Horarios} from "../models/horarios";

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private urlEndPoint:string='https://apphealthyplus.herokuapp.com/api/horarios';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http:HttpClient) { }


  saveHorario(horarios: Horarios):Observable<Usuario>{
    return this.http.post<Horarios>(this.urlEndPoint,horarios,{headers: this.httpHeaders})
  }

  updateHorario(horarios: Horarios):Observable<Usuario>{
    return this.http.put<Horarios>(this.urlEndPoint,horarios,{headers: this.httpHeaders})
  }

  deleteHorario(id?: Number){
    return this.http.delete<Horarios>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getHorario():Observable<Horarios[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Horarios[]))
  }
}

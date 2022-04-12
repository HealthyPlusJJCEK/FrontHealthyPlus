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

  private urlEndPoint:string='http://localhost:8080/api/horarios';
  private httpHeaders = new HttpHeaders()

  constructor(private http:HttpClient) { }


  saveHorario(horarios: Horarios):Observable<Usuario>{
    console.log(horarios);
    return this.http.post<Horarios>(this.urlEndPoint,horarios)
  }

  updateHorario(horarios: Horarios):Observable<Usuario>{
    console.log(horarios);
    return this.http.put<Horarios>(this.urlEndPoint,horarios)
  }

  deleteHorario(id?: Number){
    return this.http.delete<Horarios>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getHorario():Observable<Horarios[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Horarios[]))
  }
}

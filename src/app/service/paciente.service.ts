import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {map, Observable} from "rxjs";
import {Paciente} from "../models/paciente";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlEndPoint:string='https://apphealthyplus.herokuapp.com/api/pacientes';
  private httpHeaders = new HttpHeaders({})

  constructor(private http:HttpClient) { }


  savePaciente(paciente: Paciente):Observable<Usuario>{
    return this.http.post<Paciente>(this.urlEndPoint,paciente)
  }

  updatePaciente(paciente: Paciente):Observable<Usuario>{
    console.log(paciente);
    return this.http.put<Paciente>(this.urlEndPoint,paciente)
  }

  deletePaciente(id?: Number){
    return this.http.delete<Paciente>(this.urlEndPoint+'/'+id)
  }

  getPaciente():Observable<Paciente[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Paciente[]))
  }
}

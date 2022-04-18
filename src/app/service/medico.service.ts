import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Paciente} from "../models/paciente";
import {map, Observable} from "rxjs";
import {Usuario} from "../models/usuario";
import {Medico} from "../models/medico";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private urlEndPoint:string='https://apphealthyplus.herokuapp.com/api/medicos';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http:HttpClient) { }


  saveMedico(medico: Medico):Observable<Medico>{
    return this.http.post<Paciente>(this.urlEndPoint,medico,{headers: this.httpHeaders})
  }

  updateMedico(medico: Medico):Observable<Medico>{
    return this.http.put<Medico>(this.urlEndPoint,medico,{headers: this.httpHeaders})
  }

  deleteMedico(id?: Number){
    return this.http.delete<Medico>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getMedico():Observable<Medico[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Medico[]))
  }
}

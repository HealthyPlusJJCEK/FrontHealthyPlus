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

  private urlEndPoint:string='http://localhost:8080/api/medicos';
  private httpHeaders = new HttpHeaders()

  constructor(private http:HttpClient) { }


  saveMedico(medico: Medico):Observable<Medico>{
    console.log(medico);
    return this.http.post<Paciente>(this.urlEndPoint,medico)
  }

  updateMedico(medico: Medico):Observable<Medico>{
    console.log(medico);
    return this.http.put<Medico>(this.urlEndPoint,medico)
  }

  deleteMedico(id?: Number){
    return this.http.delete<Medico>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getMedico():Observable<Medico[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Medico[]))
  }
}

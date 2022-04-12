import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Espacilidad} from "../models/espacilidad";
import {map, Observable} from "rxjs";
import {Usuario} from "../models/usuario";
import {Paciente} from "../models/paciente";
import {Citas} from "../models/citas";

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private urlEndPoint:string='http://localhost:8080/api/citas';
  private httpHeaders = new HttpHeaders()

  constructor(private http:HttpClient) { }


  saveCita(citas: Citas):Observable<Citas>{
    console.log(citas);
    return this.http.post<Citas>(this.urlEndPoint,citas)
  }

  updateCita(citas: Citas):Observable<Citas>{
    console.log(citas);
    return this.http.put<Citas>(this.urlEndPoint,citas)
  }

  deleteCita(id?: Number){
    return this.http.delete<Citas>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getCita():Observable<Citas[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Citas[]))
  }
}

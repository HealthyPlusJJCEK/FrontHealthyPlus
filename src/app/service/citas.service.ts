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

  private urlEndPoint:string='https://apphealthyplus.herokuapp.com/api/citas';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http:HttpClient) { }


  saveCita(citas: Citas):Observable<Citas>{
    console.log(citas);
    return this.http.post<Citas>(this.urlEndPoint,citas,{headers: this.httpHeaders})
  }

  updateCita(citas: Citas):Observable<Citas>{
    console.log(citas);
    return this.http.put<Citas>(this.urlEndPoint,citas,{headers: this.httpHeaders})
  }

  deleteCita(id?: Number){
    return this.http.delete<Citas>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getCita():Observable<Citas[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Citas[]))
  }
}

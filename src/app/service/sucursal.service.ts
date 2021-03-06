import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {map, Observable} from "rxjs";
import {Sucursal} from "../models/sucursal";

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private urlEndPoint:string='https://apphealthyplus.herokuapp.com/api/sucursales';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http:HttpClient) { }


  saveSucursal(sucursal: Sucursal):Observable<Usuario>{
    return this.http.post<Sucursal>(this.urlEndPoint,sucursal,{headers: this.httpHeaders})
  }

  updateSucursal(sucursal: Sucursal):Observable<Usuario>{
    return this.http.put<Sucursal>(this.urlEndPoint,sucursal,{headers: this.httpHeaders})
  }

  deleteSucursal(id?: Number){
    return this.http.delete<Sucursal>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getSucursal():Observable<Sucursal[]>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(Response => Response as Sucursal[]))
  }
}

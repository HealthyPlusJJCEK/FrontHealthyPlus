import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {map, Observable} from "rxjs";
import {Sucursal} from "../models/sucursal";

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private urlEndPoint:string='http://localhost:8080/api/sucursales';
  private httpHeaders = new HttpHeaders()

  constructor(private http:HttpClient) { }


  saveSucursal(sucursal: Sucursal):Observable<Usuario>{
    console.log(sucursal);
    return this.http.post<Sucursal>(this.urlEndPoint,sucursal)
  }

  updateSucursal(sucursal: Sucursal):Observable<Usuario>{
    console.log(sucursal);
    return this.http.put<Sucursal>(this.urlEndPoint,sucursal)
  }

  deleteSucursal(id?: Number){
    return this.http.delete<Sucursal>(this.urlEndPoint+'/'+id,{headers: this.httpHeaders})
  }

  getSucursal():Observable<Sucursal[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Sucursal[]))
  }
}

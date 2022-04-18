import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Usuario} from "../models/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private urlEndPoint:string='https://apphealthyplus.herokuapp.com/api/usuarios';
  private httpHeaders = new HttpHeaders()

  constructor(private http:HttpClient) { }


  saveUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint,usuario)
  }

  updateUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.urlEndPoint,usuario)
  }
  deleteUsuario(id?: Number){
    return this.http.delete<Usuario>(this.urlEndPoint+'/'+id)
  }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get(this.urlEndPoint).pipe(map(Response => Response as Usuario[]))
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Citas} from "../models/citas";
import {map, Observable} from "rxjs";
import {As} from "../models/as";

@Injectable({
  providedIn: 'root'
})
export class AssestService {

  private urlEndPoint:string='http://localhost:8080/api/assets';
  private httpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["user"]).token
  })

  constructor(private http:HttpClient) { }


  updateImagen(formData: FormData):Observable<As>{
    return this.http.post<As>(this.urlEndPoint+"/upload",formData,{headers: this.httpHeaders})
  }

  deleteImagen(key:String){
    return this.http.delete<Citas>(this.urlEndPoint+'/delect-object'+key,{headers: this.httpHeaders})
  }

  getImagen(key:String):Observable<As>{
    return this.http.get(this.urlEndPoint+"/get-object"+key,{headers: this.httpHeaders})
  }
}


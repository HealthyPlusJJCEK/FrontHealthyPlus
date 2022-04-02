import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public rol?:String
  loging?:String;
  usuario:Usuario = new Usuario();
  constructor(private router:Router) {
  }

  ngOnInit(): void {
    try {
      if(JSON.parse(sessionStorage['user']).length!=0){
        this.usuario=JSON.parse(sessionStorage['user']);
        this.loging= this.usuario.rol
      }else {
        this.loging="ND";
        console.log(this.loging)
      }
    }catch (e){
      this.loging="ND";
      console.log(this.loging)
    }
  }


  cerrarSesion(){
    sessionStorage.clear;
    localStorage.removeItem("user");
    sessionStorage.setItem('user', JSON.stringify(""));
    console.log(JSON.parse(sessionStorage['user']))
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }
}

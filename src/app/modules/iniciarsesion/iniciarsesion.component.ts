import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsuarioService} from "../../service/usuario.service";
import {Usuario} from "../../models/usuario";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {
  //IniciarSesionADMIN
  cedualaad?:String;
  correoad?:String;
  clavead?:String;
  usuario?:Usuario = new Usuario();
  issloading=true;

  hide = true;
  public rol?:String="ND";

  constructor(private router:Router,
              private usuarioService:UsuarioService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }
  profileFormAdmin = new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    email: new FormControl('',[Validators.required, Validators.email]),
    contrasena: new FormControl('',Validators.required),
  });

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.issloading=false;
    },1000)
  }

  seleccionrol(rol:String){
    console.log(rol)
    this.rol=rol;
  }

  inicarSesionAdmin(){
    this.issloading=true;
    this.usuarioService.getUsuarios().subscribe(value => {
      if(value.filter(value1 => value1.correo==this.correoad&&value1.rol=="AD").length==0){
        this._snackBar.open("Usuario no existe, los credenciales ingresados no se encontraron", "",{
          duration: 1 * 1000,
        });
        this.issloading=false;
        console.log("Unsario no existe")
      }else {
        this.usuario=value.filter(value1 => value1.correo==this.correoad&&value1.rol=="AD")[0];
        if(this.usuario.cedula==this.cedualaad&&this.usuario.clave==this.clavead){
          sessionStorage.clear;
          sessionStorage.setItem('user', JSON.stringify(this.usuario));
          this.issloading=true;
          this.router.navigate(['/inicio']).then(() => {
            window.location.reload();
          });
        }else{
          this._snackBar.open("Las credenciales ingresadas son incorrectas", "",{
            duration: 1 * 1000,
          });
          this.issloading=false;
        }
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sucursal} from "../../models/sucursal";
import {SucursalService} from "../../service/sucursal.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-nuevasucursal',
  templateUrl: './nuevasucursal.component.html',
  styleUrls: ['./nuevasucursal.component.css']
})
export class NuevasucursalComponent implements OnInit {

  public sucursal:Sucursal = new Sucursal();
  constructor(private sucursalService:SucursalService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private title: Title) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id!="?"){
          this.title.setTitle("Editar sucursal")
          this.sucursalService.getSucursal().subscribe(value => {
            this.sucursal=value.filter(value1 => value1.id==id)[0];
            this.issloading=false;
          })
        }else {
          this.issloading=false;
          this.title.setTitle("Nueva sucursal")
        }
      })
    }else {
      this.router.navigate(['/inicio']);
    }
  }

  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }
  profileForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern('[0-9]+')]),
  });


  guardarSucursales(sucursal:Sucursal){
    this.sucursalService.saveSucursal(sucursal).subscribe(value => {
      this._snackBar.open("Sucursal creada de forma exitosa", "",{
        duration: 1 * 1000,
      });
      this.router.navigate(['/inicio/adminstradar/versucursales'])
    },error => {
      this._snackBar.open("Sucursal no se guardo", "",{
        duration: 1 * 1000,
      });
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {SucursalService} from "../../service/sucursal.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {EspacilidadService} from "../../service/espacilidad.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sucursal} from "../../models/sucursal";
import {Espacilidad} from "../../models/espacilidad";

@Component({
  selector: 'app-nuevaespacialidad',
  templateUrl: './nuevaespacialidad.component.html',
  styleUrls: ['./nuevaespacialidad.component.css']
})
export class NuevaespacialidadComponent implements OnInit {

  espacilidad:Espacilidad = new Espacilidad();
  constructor(private espacilidadService:EspacilidadService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id!="?"){
          this.espacilidadService.getEspecilidad().subscribe(value => {
            this.espacilidad=value.filter(value1 => value1.id==id)[0];
            this.issloading=false;
          })
        }
        this.issloading=false;
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
    espacilidad: new FormControl('',Validators.required),
  });

  guardarEspacilidad(espacilidad:Espacilidad){
    this.espacilidadService.saveEspecilidad(espacilidad).subscribe(value => {
      this._snackBar.open("Espacilida guardada de forma exitosa", "",{
        duration: 1 * 1000,
      });
      this.router.navigate(['/inicio/adminstradar/verespacilidad'])
    },error => {
      this._snackBar.open("Espacilidad no se guardo", "",{
        duration: 1 * 1000,
      });
    })
  }
}

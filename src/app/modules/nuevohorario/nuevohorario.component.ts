import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {HorarioService} from "../../service/horario.service";
import {Horarios} from "../../models/horarios";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-nuevohorario',
  templateUrl: './nuevohorario.component.html',
  styleUrls: ['./nuevohorario.component.css']
})
export class NuevohorarioComponent implements OnInit {


  horario:Horarios = new Horarios();

  constructor(private _snackBar: MatSnackBar,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private horarioService:HorarioService,
              private title: Title) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id!="?"){
          this.title.setTitle("Editar horario")
          this.horarioService.getHorario().subscribe(value => {
            this.horario=value.filter(value1 => value1.id==id)[0]
            this.issloading=false;
          })
        }else {
          this.title.setTitle("Nuevo horario")
          this.issloading=false;
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
    dia: new FormControl('',Validators.required),
    horauno: new FormControl('',Validators.required),
    horados: new FormControl('',Validators.required),
  });

  guardarHoarios(horarios:Horarios){
    // @ts-ignore
    if(horarios.hora_final>horarios.hora_inico){
      this.horarioService.saveHorario(horarios).subscribe(value => {
        this._snackBar.open("Horario guardado de forma exitosa", "",{
          duration: 1 * 1000,
        });
        this.router.navigate(['/inicio/adminstradar/verhorario'])
      },error => {
        this._snackBar.open("Error, horario no se creo", "",{
          duration: 1 * 1000,
        });
      })
    }else {
      this._snackBar.open("La hora incial no pude ser mayor a la final", "Aceptar",{

      });
    }
  }

}

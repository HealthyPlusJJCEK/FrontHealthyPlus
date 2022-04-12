import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import {SucursalService} from "../../service/sucursal.service";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HorarioService} from "../../service/horario.service";
import {DateAdapter} from "@angular/material/core";
import {UsuarioService} from "../../service/usuario.service";
import {MedicoService} from "../../service/medico.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Medico} from "../../models/medico";

@Component({
  selector: 'app-editarmedico',
  templateUrl: './editarmedico.component.html',
  styleUrls: ['./editarmedico.component.css']
})
export class EditarmedicoComponent implements OnInit {

  usuario:Usuario = new Usuario();
  medico:Medico = new Medico();
  hide = true;

  constructor(private _formBuilder: FormBuilder,
              private sucursalService:SucursalService,
              private espacilidadService:EspacilidadService,
              private _snackBar: MatSnackBar,
              private horarioService:HorarioService,
              private _adapter: DateAdapter<any>,
              private usuarioService:UsuarioService,
              private medicoService:MedicoService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id!=""){
          this.usuarioService.getUsuarios().subscribe(value => {
            this.usuario=value.filter(value1 => value1.id==id)[0];
            this.medicoService.getMedico().subscribe(value1 => {
              this.medico=value1.filter(value2=>value2.id_usuario==id)[0];
            })
          })
        }
      })
    }else {
      this.router.navigate(['/inicio']);
    }
  }

  profileFormMedico= new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    sexo: new FormControl('',Validators.required),
    telefono: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nacimiento: new FormControl('',Validators.required),
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),
    titulo: new FormControl('',Validators.required),
    foto: new FormControl('',Validators.required),
  });


  guardarMedico(medico:Medico,usuario:Usuario){
    this.usuarioService.updateUsuario(usuario).subscribe(value => {
      this.medicoService.updateMedico(medico).subscribe(value1 => {
        this._snackBar.open("Datos actualizados exitosamente", "",{
          duration: 1 * 1000,
        });
        sessionStorage.clear;
        sessionStorage.setItem('user', JSON.stringify(usuario));
        this.router.navigate(['/inicio']).then(() => {
          window.location.reload();
        });
      },error => {
        this._snackBar.open("Los datos no se actualizaron", "",{
          duration: 1 * 1000,
        });
      })
    },error => {
      this._snackBar.open("Los datos no se actualizaron", "",{
        duration: 1 * 1000,
      });
    })
  }


}

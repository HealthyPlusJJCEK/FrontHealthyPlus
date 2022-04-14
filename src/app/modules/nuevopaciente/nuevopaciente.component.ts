import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../models/usuario";
import {Paciente} from "../../models/paciente";
import {UsuarioService} from "../../service/usuario.service";
import {PacienteService} from "../../service/paciente.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-nuevopaciente',
  templateUrl: './nuevopaciente.component.html',
  styleUrls: ['./nuevopaciente.component.css']
})
export class NuevopacienteComponent implements OnInit {

  isLinear = false;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  hide = true;

  accion:Boolean=true;

  usuario:Usuario = new Usuario();
  paciente:Paciente = new Paciente();

  profileFormPaciente = new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    sexo: new FormControl('',Validators.required),
    telefono: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nacimiento: new FormControl('',Validators.required),
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),
    sangre: new FormControl('',Validators.required),
    ocupacion: new FormControl('',Validators.required),
    estado: new FormControl('',Validators.required),

  });
  constructor(private _formBuilder: FormBuilder,
              private usuarioService:UsuarioService,
              private pacienteService:PacienteService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private title: Title) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id!=""){
        this.title.setTitle("Editar paciente")
        if(JSON.parse(sessionStorage['user']).length!=""){
          this.usuarioService.getUsuarios().subscribe(value => {
            this.usuario=value.filter(value1 => value1.id==id)[0];
            this.pacienteService.getPaciente().subscribe(value1 => {
              this.paciente=value1.filter(value2=>value2.id_usuario==id)[0];
              this.accion=false;
              this.issloading=false;
            })
          })
        }else {
          this.router.navigate(['/inicio']);
        }
      }else {
        this.title.setTitle("Nuevo paciente")
        this.issloading=false;
      }
    })
  }
  issloading=true;
  registrarUsuario(usuario:Usuario,paciente:Paciente){
    this.usuarioService.getUsuarios().subscribe(value => {
       // @ts-ignore
      usuario.id=Number(value.pop().id)+1;
      if(value.filter(value1 => value1.correo==usuario.correo).length==0){
        usuario.rol="PA"
        this.usuarioService.saveUsuario(usuario).subscribe(value1 => {
          paciente.id_usuario=this.usuario.id;
          this.pacienteService.savePaciente(paciente).subscribe(value2 => {
            this._snackBar.open("Usuario registrado corrctamente, ahora puede inciar sesión", "",{
              duration: 1 * 1000
            });
            console.log("hOLdesf")
            this.router.navigate(['/inicio/inicarsesion']).then(() => {
              window.location.reload();
            });
          },error => {
            this._snackBar.open("Hubo un error al crear el usuario intente mas tarde", "",{
              duration: 1 * 1000,
            });
          })
          console.log("hOL1")
        },error => {
          this._snackBar.open("Hubo un error al crear el usuario intente mas tarde", "",{
            duration: 1 * 1000,
          });
        })
      }else {
        this._snackBar.open("El correo ingresado ya esta registrado", "",{
          duration: 1 * 1000,
        });
        console.log("hOL")
      }
    })
  }

  editarUsuario(usuario:Usuario,paciente:Paciente){
    console.log(usuario,paciente)
    this.usuarioService.updateUsuario(usuario).subscribe(value1 => {
      this.pacienteService.updatePaciente(paciente).subscribe(value2 => {
        this._snackBar.open("Usuario guardado corrctamente", "",{
          duration: 1 * 1000
        });
        console.log("hOLdesf")
        this.router.navigate(['/inicio']).then(() => {
          window.location.reload();
        });
      },error => {
        this._snackBar.open("Hubo un error al guardar los datos", "",{
          duration: 1 * 1000,
        });
      })
      console.log("hOL1")
    },error => {
      this._snackBar.open("Hubo un error al guardar los datos", "",{
        duration: 1 * 1000,
      });
    })
  }
}

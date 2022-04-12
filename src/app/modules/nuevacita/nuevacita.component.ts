import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EspacilidadService} from "../../service/espacilidad.service";
import {Espacilidad} from "../../models/espacilidad";
import {MedicoService} from "../../service/medico.service";
import {MatSelectionListChange} from "@angular/material/list";
import {Medico} from "../../models/medico";
import {Usuario} from "../../models/usuario";
import {UsuarioService} from "../../service/usuario.service";
import {CitasService} from "../../service/citas.service";
import {Horarios} from "../../models/horarios";
import {Paciente} from "../../models/paciente";
import {PacienteService} from "../../service/paciente.service";
import {Citas} from "../../models/citas";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-nuevacita',
  templateUrl: './nuevacita.component.html',
  styleUrls: ['./nuevacita.component.css']
})
export class NuevacitaComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirhFormGroup?: FormGroup;

  espacilidad:Espacilidad[]=[];
  medicos:Medico[]=[];

  usuarioPaciente:Usuario= new Usuario();
  usuarioMedico:Usuario= new Usuario();


  pacienteSelect:Paciente = new Paciente();
  medicoSelect:Medico = new Medico();
  horarioSelect:Horarios = new Horarios();

  constructor(private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private espacilidadService:EspacilidadService,
              private medicoService:MedicoService,
              private usuarioService:UsuarioService,
              private citasService:CitasService,
              private pacienteService:PacienteService,
              private _snackBar: MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id!="?"){
          this.usuarioService.getUsuarios().subscribe(value => {
            this.usuarioPaciente=value.filter(value1 => value1.id==id)[0]
          })
          this.pacienteService.getPaciente().subscribe(value => {
            this.pacienteSelect=value.filter(value1 => value1.id_usuario==id)[0]
          })

        }
      })
      this.espacilidadService.getEspecilidad().subscribe(value => {
        this.espacilidad=value;
      })
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
      this.thirhFormGroup = this._formBuilder.group({
        thirhCtrl: ['', Validators.required],
      });
    }else {
      this.router.navigate(['/inicio']);
    }
  }


  selectEspacilidad(espalidadselect: MatSelectionListChange){
    this.usuarioMedico= new Usuario();
    var espalidad:Espacilidad=new Espacilidad();
    espalidad=espalidadselect.option.value;
    console.log(espalidad)
    this.usuarioService.getUsuarios().subscribe(user =>{
      this.medicoService.getMedico().subscribe(value => {
        // @ts-ignore
        this.medicos=value.filter(value1 => value1.especialidad[0].id==espalidad.id)
      })
    })
  }

  selectDoctor(doctorselect: MatSelectionListChange){
    this.medicoSelect=doctorselect.option.value;
    this.medicoSelect.horarios?.forEach(value => {
      this.citasService.getCita().subscribe(value1 => {
        if(value1.filter(value2 => value2.id==this.medicoSelect.id
          &&value2.horarios?.filter(value3 => value3.id==value.id).length==0&&value2.estado=="PN").length==0){
          console.log(value)
        }
      })
    })
    this.usuarioService.getUsuarios().subscribe(value => {
      this.usuarioMedico=value.filter(value1 => value1.id==doctorselect.option.value.id_usuario)[0];
    })
  }

  selectHoraios(horarioselect:MatSelectionListChange){
    this.horarioSelect=horarioselect.option.value;
  }


  citas:Citas= new Citas();
  obterdatos():Citas{
    var paciente:Paciente[]=[];
    var horario:Horarios[]=[];
    var medico:Medico[]=[];
    paciente.push(this.pacienteSelect);
    horario.push(this.horarioSelect);
    medico.push(this.medicoSelect)
    this.citas.estado="PN";
    this.citas.paciente=paciente;
    this.citas.horarios=horario
    this.citas.medico=medico
    return this.citas;
  }


  guardarCita(){
    this.citasService.saveCita(this.obterdatos()).subscribe(value => {
      this._snackBar.open("Cita agendada correctamente", "",{
        duration: 1 * 1000,
      });
      // @ts-ignore
      this.router.navigate(['/inicio/inicarsesion/vercitas',this.obterdatos().paciente[0].id_usuario])
    },error => {
      this._snackBar.open("No se a agendada la cita", "",{
        duration: 1 * 1000,
      });
    })
  }



}

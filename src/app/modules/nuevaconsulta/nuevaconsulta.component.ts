import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MedicoService} from "../../service/medico.service";
import {UsuarioService} from "../../service/usuario.service";
import {CitasService} from "../../service/citas.service";
import {PacienteService} from "../../service/paciente.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Consultas, Diagnostico, Enfermedad, Tratamiento} from "../../models/consultas";
import {ConsultaService} from "../../service/consulta.service";
import {Citas} from "../../models/citas";

@Component({
  selector: 'app-nuevaconsulta',
  templateUrl: './nuevaconsulta.component.html',
  styleUrls: ['./nuevaconsulta.component.css']
})
export class NuevaconsultaComponent implements OnInit {

  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;


  consulta:Consultas = new Consultas();
  diagnostico:Diagnostico = new Diagnostico();
  tratamiento:Tratamiento = new Tratamiento();
  enfermedad:Enfermedad = new Enfermedad();
  cita:Citas = new Citas();


  constructor(private activatedRoute: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private espacilidadService:EspacilidadService,
              private medicoService:MedicoService,
              private usuarioService:UsuarioService,
              private citasService:CitasService,
              private pacienteService:PacienteService,
              private _snackBar: MatSnackBar,
              private consultaService:ConsultaService,
              private router:Router) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id!="?"){
          this.citasService.getCita().subscribe(value => {
            this.cita=value.filter(value1 => value1.id==id)[0]
          })
        }
      })

      this.firstFormGroup = this._formBuilder.group({
        motivo: ['', Validators.required],
        precion: ['', Validators.required],
        frecu: ['', Validators.required],
        tempe: ['', Validators.required],
        talla: ['', Validators.required],
        peso: ['', Validators.required],
      });
      this.secondFormGroup = this._formBuilder.group({
        enfermedad: ['', Validators.required],
        diagnos: ['', Validators.required],
        proce: ['', Validators.required],
        descri: ['', Validators.required],
        conclu: ['', Validators.required],
      });
    }else {
      this.router.navigate(['/inicio']);
    }
  }

  guardarConsulta(){
    this.consulta.fecha=new Date();
    this.consulta.enfermedad=this.enfermedad;
    this.consulta.tratamiento=this.tratamiento;
    this.consulta.diagnostico=this.diagnostico;
    this.consulta.pacienteSet=this.cita.paciente;
    this.consulta.medicoSet=this.cita.medico;
    this.consultaService.saveConsultas(this.consulta).subscribe(value => {
      this.cita.estado="CO";
      this.citasService.updateCita(this.cita).subscribe(value1 => {
        this._snackBar.open("Consulta guardar con exito", "",{
          duration: 1 * 1000,
        });
      })
      // @ts-ignore
      this.router.navigate(['/inicio/inicarsesion/verconsulta',this.consulta.medicoSet[0].id_usuario])
    },error => {
      this._snackBar.open("Consulta no guardada", "",{
        duration: 1 * 1000,
      });
    })
    console.log(this.consulta)
  }

}

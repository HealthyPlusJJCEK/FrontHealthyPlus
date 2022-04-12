import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MedicoService} from "../../service/medico.service";
import {UsuarioService} from "../../service/usuario.service";
import {CitasService} from "../../service/citas.service";
import {PacienteService} from "../../service/paciente.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConsultaService} from "../../service/consulta.service";
import {Consultas, Diagnostico, Enfermedad, Tratamiento} from "../../models/consultas";
import {Citas} from "../../models/citas";

@Component({
  selector: 'app-editarconsulta',
  templateUrl: './editarconsulta.component.html',
  styleUrls: ['./editarconsulta.component.css']
})
export class EditarconsultaComponent implements OnInit {

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
          this.consultaService.getConsultas().subscribe(value => {
            this.consulta=value.filter(value1 => value1.id==id)[0];
            // @ts-ignore
            this.diagnostico=this.consulta.diagnostico;
            // @ts-ignore
            this.tratamiento=this.consulta.tratamiento;
            // @ts-ignore
            this.enfermedad=this.consulta.enfermedad;

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
    this.consulta.enfermedad=this.enfermedad;
    this.consulta.tratamiento=this.tratamiento;
    this.consulta.diagnostico=this.diagnostico;
    this.consultaService.saveConsultas(this.consulta).subscribe(value => {
      this._snackBar.open("Consulta guardar con exito", "",{
        duration: 1 * 1000,
      });
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

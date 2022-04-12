import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MedicoService} from "../../service/medico.service";
import {UsuarioService} from "../../service/usuario.service";
import {CitasService} from "../../service/citas.service";
import {PacienteService} from "../../service/paciente.service";
import {Espacilidad} from "../../models/espacilidad";
import {Medico} from "../../models/medico";
import {Usuario} from "../../models/usuario";
import {Paciente} from "../../models/paciente";
import {Horarios} from "../../models/horarios";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Citas} from "../../models/citas";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-vercitas',
  templateUrl: './vercitas.component.html',
  styleUrls: ['./vercitas.component.css']
})
export class VercitasComponent implements OnInit {


  displayedColumns: string[] = ['id', 'estado', 'medico','horarios','cancelar','obtener'];
  // @ts-ignore
  dataSource: MatTableDataSource<Citas>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  espacilidad:Espacilidad[]=[];
  medicos:Medico[]=[];

  usuarioPaciente:Usuario= new Usuario();
  usuarioMedico:Usuario= new Usuario();


  pacienteSelect:Paciente = new Paciente();
  medicoSelect:Medico = new Medico();
  horarioSelect:Horarios = new Horarios();

  citas:Citas[]=[];

  dia?:String=new Date().toISOString();


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
          this.listarCitas(id)
        }
      })
    }else {
      this.router.navigate(['/inicio']);
    }
  }

  listarCitas(id:Number){
    this.citasService.getCita().subscribe(value => {
      // @ts-ignore
      this.citas=value.filter(value1 => value1.paciente[0].id_usuario==id)
      this.dataSource = new MatTableDataSource(this.citas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.citas)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  eliminarConsulta(cita:Citas){
    this.citasService.deleteCita(cita.id).subscribe(value => {
      this._snackBar.open("Cita cancelada", "",{
        duration: 1 * 1000,
      });
      // @ts-ignore
      this.listarCitas(cita.paciente[0].id_usuario)
    },error => {
      this._snackBar.open("Cita no cancelada", "",{
        duration: 1 * 1000,
      });
    })
  }
}

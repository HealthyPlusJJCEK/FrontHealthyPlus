import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MedicoService} from "../../service/medico.service";
import {UsuarioService} from "../../service/usuario.service";
import {CitasService} from "../../service/citas.service";
import {PacienteService} from "../../service/paciente.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConsultaService} from "../../service/consulta.service";
import {Consultas} from "../../models/consultas";
import {MatTableDataSource} from "@angular/material/table";
import {Citas} from "../../models/citas";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-verconsultas',
  templateUrl: './verconsultas.component.html',
  styleUrls: ['./verconsultas.component.css']
})
export class VerconsultasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Dia', 'motivo','conclision','editar','eliminar','reporte'];
  // @ts-ignore
  dataSource: MatTableDataSource<Consultas>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  consultas:Consultas[]=[];

  ID?:null

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
          this.ID=id;
          this.listaConsultas(id)
        }
      })
    }else {
      this.router.navigate(['/inicio']);
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  listaConsultas(id?:Number){
    this.consultaService.getConsultas().subscribe(value => {
      // @ts-ignore
      this.consultas=value.filter(value1 => value1.medicoSet[0].id_usuario==id);
      this.dataSource = new MatTableDataSource(this.consultas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log( this.consultas)
    })
  }

  eliminarConculta(consulta:Consultas){
    this.consultaService.deleteConsultas(consulta.id).subscribe(value => {
      this._snackBar.open("Consulta elminada con exito", "",{
        duration: 1 * 1000,
      });
      this.router.navigate(['/inicio/inicarsesion/verconsulta',this.ID]).then(()=>
      window.location.reload())
    },error => {
      this._snackBar.open("Consulta no se elimno", "",{
        duration: 1 * 1000,
      });
    })
  }


}

import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MedicoService} from "../../service/medico.service";
import {UsuarioService} from "../../service/usuario.service";
import {CitasService} from "../../service/citas.service";
import {PacienteService} from "../../service/paciente.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Citas} from "../../models/citas";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-vercitas2',
  templateUrl: './vercitas2.component.html',
  styleUrls: ['./vercitas2.component.css']
})
export class Vercitas2Component implements OnInit {


  displayedColumns: string[] = ['id', 'estado', 'medico','horarios','realizar','obtener'];
  // @ts-ignore
  dataSource: MatTableDataSource<Citas>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  citas:Citas[]=[];

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
          this.listaCitas(id)
        }
      })
    }else {
      this.router.navigate(['/inicio']);
    }
  }

  listaCitas(id?:Number){
    this.citasService.getCita().subscribe(value => {
      // @ts-ignore
      this.citas=value.filter(value1 => value1.medico[0].id_usuario==id);
      console.log(this.citas)
      this.dataSource = new MatTableDataSource(this.citas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

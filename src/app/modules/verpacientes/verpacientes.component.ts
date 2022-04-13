import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Usuario} from "../../models/usuario";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";
import {SucursalService} from "../../service/sucursal.service";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HorarioService} from "../../service/horario.service";
import {DateAdapter} from "@angular/material/core";
import {UsuarioService} from "../../service/usuario.service";
import {MedicoService} from "../../service/medico.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verpacientes',
  templateUrl: './verpacientes.component.html',
  styleUrls: ['./verpacientes.component.css']
})
export class VerpacientesComponent implements OnInit {


  displayedColumns: string[] = ['id', 'cedula', 'nombre', 'telefono','correo'];
  // @ts-ignore
  dataSource: MatTableDataSource<Usuario>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  usuario:Usuario[]=[];
  constructor(private _formBuilder: FormBuilder,
              private sucursalService:SucursalService,
              private espacilidadService:EspacilidadService,
              private _snackBar: MatSnackBar,
              private horarioService:HorarioService,
              private _adapter: DateAdapter<any>,
              private usuarioService:UsuarioService,
              private medicoService:MedicoService,
              private router:Router) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(value => {
      this.usuario=value.filter(value1 => value1.rol=="PA")
      this.dataSource = new MatTableDataSource(this.usuario);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.issloading=false;
      this.issloading=false;
    })
  }
  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

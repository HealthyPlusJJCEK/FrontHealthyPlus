import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {HorarioService} from "../../service/horario.service";
import {MatTableDataSource} from "@angular/material/table";
import {Sucursal} from "../../models/sucursal";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Horarios} from "../../models/horarios";

@Component({
  selector: 'app-verhorarios',
  templateUrl: './verhorarios.component.html',
  styleUrls: ['./verhorarios.component.css']
})
export class VerhorariosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dia', 'hora_inico', 'hora_final','eliminar','editar'];
  // @ts-ignore
  dataSource: MatTableDataSource<Horarios>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private horarioService:HorarioService) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.listarHoarios();
    }else {
      this.router.navigate(['/inicio']);
    }
  }
  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }


  listarHoarios(){
    this.horarioService.getHorario().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.issloading=false;
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarHorario(horario:Horarios){
    this.horarioService.deleteHorario(horario.id).subscribe(value => {
      this._snackBar.open("Sucursal eliminada de forma exitosa", "",{
        duration: 1 * 1000,
      });
      this.listarHoarios();
    },error => {
      this._snackBar.open("Sucursal no se elimino", "",{
        duration: 1 * 1000,
      });
    })
  }
}

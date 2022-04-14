import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Horarios} from "../../models/horarios";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Espacilidad} from "../../models/espacilidad";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-verespaclidades',
  templateUrl: './verespaclidades.component.html',
  styleUrls: ['./verespaclidades.component.css']
})
export class VerespaclidadesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'descripcion','eliminar','editar'];
  // @ts-ignore
  dataSource: MatTableDataSource<Espacilidad>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private espacilidadService:EspacilidadService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private title: Title) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.listarEspacilidades();
      this.title.setTitle("Ver especialidad")
    }else {
      this.router.navigate(['/inicio']);
    }
  }
  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }


  listarEspacilidades(){
    this.espacilidadService.getEspecilidad().subscribe(value => {
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

  eliminarEspacilidad(espacilidad:Espacilidad){
    this.espacilidadService.deleteEspecilidad(espacilidad.id).subscribe(value => {
      this._snackBar.open("Espacidad eliminada de forma exitosa", "",{
        duration: 1 * 1000,
      });
      this.listarEspacilidades();
    },error => {
      this._snackBar.open("Espacidad no se elimino", "",{
        duration: 1 * 1000,
      });
    })
  }
}

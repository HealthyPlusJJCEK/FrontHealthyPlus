import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Sucursal} from "../../models/sucursal";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SucursalService} from "../../service/sucursal.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-versucursales',
  templateUrl: './versucursales.component.html',
  styleUrls: ['./versucursales.component.css']
})
export class VersucursalesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'telefono','eliminar','editar'];
  // @ts-ignore
  dataSource: MatTableDataSource<Sucursal>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sucursalService:SucursalService,
              private _snackBar: MatSnackBar,
              private router:Router,
              private title: Title) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.listarSucursales()
    }else {
      this.router.navigate(['/inicio']);
    }
  }
  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }

  listarSucursales(){
    this.sucursalService.getSucursal().subscribe(value => {
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



  eliminarSucursal(sucursal:Sucursal){
    this.sucursalService.deleteSucursal(sucursal.id).subscribe(value => {
      this._snackBar.open("Sucursal eliminada de forma exitosa", "",{
        duration: 1 * 1000,
      });
      this.listarSucursales();
    },error => {
      this._snackBar.open("Sucursal no se elimino", "",{
        duration: 1 * 1000,
      });
    })
  }

}

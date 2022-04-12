import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Sucursal} from "../../models/sucursal";
import {SucursalService} from "../../service/sucursal.service";
import {Espacilidad} from "../../models/espacilidad";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EspacilidadService} from "../../service/espacilidad.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Horarios} from "../../models/horarios";
import {HorarioService} from "../../service/horario.service";
import {DateAdapter} from "@angular/material/core";
import {MatSort} from "@angular/material/sort";
import {Usuario} from "../../models/usuario";
import {UsuarioService} from "../../service/usuario.service";
import {Medico} from "../../models/medico";
import {MedicoService} from "../../service/medico.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevomedico',
  templateUrl: './nuevomedico.component.html',
  styleUrls: ['./nuevomedico.component.css']
})
export class NuevomedicoComponent implements OnInit {

  displayedColumns: string[] = ['select','id', 'dia', 'hora_inico', 'hora_final'];
  // @ts-ignore
  dataSource: MatTableDataSource<Horarios>;
  selection = new SelectionModel<Horarios>(true, []);
// @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  isLinear = true;
  firstFormGroup?: FormGroup;
  secondFormGroup?: FormGroup;
  thirtFormGroup?:FormGroup;

  hide = true;
  sucursales:Sucursal[]=[];
  espacilidades:Espacilidad[]=[];

  usuarios:Usuario=new Usuario();
  medico:Medico = new Medico();

  sucursal:Sucursal=new Sucursal();
  especialidad:Espacilidad=new Espacilidad();


  constructor(private _formBuilder: FormBuilder,
              private sucursalService:SucursalService,
              private espacilidadService:EspacilidadService,
              private _snackBar: MatSnackBar,
              private horarioService:HorarioService,
              private _adapter: DateAdapter<any>,
              private usuarioService:UsuarioService,
              private medicoService:MedicoService,
              private router:Router) {
    this._adapter.setLocale('es-ec');
  }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.sucursalService.getSucursal().subscribe(value => {
        this.sucursales=value;
      })
      this.espacilidadService.getEspecilidad().subscribe(value => {
        this.espacilidades=value;
      })
      this.horarioService.getHorario().subscribe(value => {
        this.dataSource= new MatTableDataSource(value);
        this.dataSource.sort = this.sort;
      })
      this.firstFormGroup = this._formBuilder.group({
        cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
        clave: ['', Validators.required],
      });
      this.secondFormGroup = this._formBuilder.group({
        sucursal: ['', Validators.required],
        especilidad: ['', Validators.required],
      });
      this.thirtFormGroup = this._formBuilder.group({
      });
    }else {
      this.router.navigate(['/inicio']);
    }
  }

  isAllSelected() {
    const numSelected = this.selection?.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Horarios): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // @ts-ignore
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  guardarMedico(medico:Medico,usuario:Usuario){
    var sucusal:Sucursal[]=[];
    var espacilidad:Espacilidad[]=[];
    sucusal.push(this.sucursal)
    espacilidad.push(this.especialidad)
    this.usuarioService.getUsuarios().subscribe(value => {
      // @ts-ignore
      usuario.id=Number(value.pop().id)+1;
      if(this.selection.selected.length!=0){
        if(value.filter(value1 => value1.cedula==usuario.cedula&&value1.rol=="DO").length==0){
          usuario.rol="DO";
          this.usuarioService.saveUsuario(usuario).subscribe(value1 => {
            medico.sucursal=sucusal;
            medico.especialidad=espacilidad;
            medico.id_usuario=usuario.id;
            medico.horarios=this.selection.selected;
            this.medicoService.saveMedico(medico).subscribe(value2 => {
              this._snackBar.open("Se guardo el medico de forma exitosa", "",{
                duration: 1 * 1000,
              });
            },error => {
              this._snackBar.open("Error, no se guardo el medico", "",{
                duration: 1 * 1000,
              });
            })
          },error => {
            this._snackBar.open("Error, no se guardo el medico", "",{
              duration: 1 * 1000,
            });
          })
          console.log(medico,usuario)
        }else {
          this._snackBar.open("Error, ya existe un medico con en esa cédula", "Aceptar",{
          });
        }
      }else {
        this._snackBar.open("Error, es necesario que el medico tenga algun horario", "Aceptar",{
        });
      }
    })
  }

}

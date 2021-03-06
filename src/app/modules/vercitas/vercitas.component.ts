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
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from "@angular/common";
import {Title} from "@angular/platform-browser";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
              private router:Router,
              private title: Title) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id!="?"){
          this.title.setTitle("Ver citas")
          this.listarCitas(id)
        }else{
          this.issloading=false;
          this.title.setTitle("Ver citas")
        }
      })
    }else {
      this.router.navigate(['/inicio']);
    }
  }
  issloading=true;
  ngAfterViewInit(): void {
    setTimeout(()=>{

    },1000)
  }


  listarCitas(id:Number){
    this.citasService.getCita().subscribe(value => {
      // @ts-ignore
      this.citas=value.filter(value1 => value1.paciente[0].id_usuario==id)
      this.dataSource = new MatTableDataSource(this.citas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.citas)
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

  async createPdf(cita:Citas) {
    var pipe:DatePipe = new DatePipe('en-US')
    var usuarioPaciente:Usuario = new Usuario();
    var usuarioMedico:Usuario = new Usuario();
    this.usuarioService.getUsuarios().subscribe(async value => {
      // @ts-ignore
      usuarioPaciente = value.filter(value1 => value1.id == cita.paciente[0].id_usuario)[0];
      // @ts-ignore
      usuarioMedico = value.filter(value1 => value1.id == cita.medico[0].id_usuario)[0];
      const pdfDefinition: any = {
        content: [
          {image: await this.getBase64ImageFromURL('assets/images/HealthyPlusV2.png'), width: 50},
          {
            text: '_________________________________________________________________________________________',
            alignment: 'center'
          },
          // @ts-ignore
          {text: this.dia, alignment: 'right'},
          {text: 'CERTIFICADO DE CITA', fontSize: 15, bold: true, alignment: 'center'},
          {text: 'INFORMACION DE CITA GENERAL', fontSize: 15, margin: [0, 0, 20, 0]},
          {text: '    '},
          {text: 'PACIENTE:', fontSize: 13, bold: true},
          {text: 'C??dula: ' + usuarioPaciente.cedula},
          {text: 'Nombre: ' + usuarioPaciente.nombres_completos},
          {text: 'T??lefono: ' + usuarioPaciente.telefono},
          {text: '    '},
          {text: 'MEDICO:', fontSize: 13, bold: true},
          {text: 'Nombre: ' + usuarioMedico.nombres_completos},
          {text: 'T??lefono: ' + usuarioMedico.telefono},
          // @ts-ignore
          {text: 'Especilidad: ' + cita.medico[0].especialidad[0].descripcion},
          // @ts-ignore
          {text: 'Titulo: ' + cita.medico[0].titulo.nombre_titulo},
          {text: '    '},
          {text: 'DIRECCION:', fontSize: 13, bold: true},
          // @ts-ignore
          {text: 'Sucursal nombre : ' + cita.medico[0].sucursal[0].nombre},
          // @ts-ignore
          {text: 'T??lefono: ' + cita.medico[0].sucursal[0].telefono},
          // @ts-ignore
          {text: 'Direcci??n: ' + cita.medico[0].sucursal[0].direccion},
          {text: '    '},
          {text: 'HORARIOS:', fontSize: 13, bold: true},
          // @ts-ignore
          {text: 'Dia: ' + pipe.transform(cita.horarios[0].dia,'dd/MM/yyyy')},
          // @ts-ignore
          {text: 'Desde: ' +  cita.horarios[0].hora_inico},
          // @ts-ignore
          {text: 'Hasta: ' + cita.horarios[0].hora_final},

        ]
      }
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    })
  }

  getBase64ImageFromURL(url:any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        // @ts-ignore
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });}

}

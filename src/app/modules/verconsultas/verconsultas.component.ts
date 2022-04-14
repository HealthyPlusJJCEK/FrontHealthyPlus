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
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from "@angular/common";
import {Usuario} from "../../models/usuario";
import {Title} from "@angular/platform-browser";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
              private router:Router,
              private title: Title) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage['user']).length!=""){
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id!="?"){
          this.title.setTitle("Ver consultas")
          this.ID=id;
          this.listaConsultas(id)
        }else {
          this.title.setTitle("Ver consultas")
          this.issloading=false;
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
      this.issloading=false;
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
  async createPdf(consultas:Consultas) {
    var dia:String=new Date().toISOString();
    var pipe:DatePipe = new DatePipe('en-US')
    var usuarioPaciente:Usuario = new Usuario();
    var usuarioMedico:Usuario = new Usuario();
    this.usuarioService.getUsuarios().subscribe(async value => {
      // @ts-ignore
      usuarioPaciente = value.filter(value1 => value1.id == consultas.pacienteSet[0].id_usuario)[0];
      // @ts-ignore
      usuarioMedico = value.filter(value1 => value1.id == consultas.medicoSet[0].id_usuario)[0];
      const pdfDefinition: any = {
        content: [
          {image:await this.getBase64ImageFromURL('assets/images/HealthyPlusV2.png'), width: 50},
          {
            text: '_________________________________________________________________________________________',
            alignment: 'center'
          },
          // @ts-ignore
          {text: dia, alignment: 'right'},
          {text: 'CONSULTA', fontSize: 15, bold: true, alignment: 'center'},
          {text: 'INFORMACION GENERAL', fontSize: 15, margin: [0, 0, 20, 0]},
          {text: '    '},
          {text: 'PACIENTE:', fontSize: 13, bold: true},
          {text: 'Cédula: ' + usuarioPaciente.cedula},
          {text: 'Nombre: ' + usuarioPaciente.nombres_completos},
          {text: 'Edad: ' + this.CalculateAge(usuarioPaciente.fecha_nacimiento)},
          {text: 'Télefono: ' + usuarioPaciente.telefono},
          {text: '    '},
          {text: 'MEDICO:',bold: true},
          {text: 'Nombre: ' + usuarioMedico.nombres_completos},
          {text: 'Télefono: ' + usuarioMedico.telefono},
          // @ts-ignore
          {text: 'Especilidad: ' + consultas.medicoSet[0].especialidad[0].descripcion},
          // @ts-ignore
          {text: 'Titulo: ' + consultas.medicoSet[0].titulo.nombre_titulo},
          {text: '    '},
          {text: 'SUCURSAL:', fontSize: 13, bold: true},
          // @ts-ignore
          {text: 'Sucursal nombre : ' + consultas.medicoSet[0].sucursal[0].nombre},
          // @ts-ignore
          {text: 'Télefono: ' + consultas.medicoSet[0].sucursal[0].telefono},
          // @ts-ignore
          {text: 'Dirección: ' + consultas.medicoSet[0].sucursal[0].direccion},
          {text: '    '},
          {text: 'INFORMACION DE CONSULTA', fontSize: 13, bold: true, alignment: 'center'},
          {text: '    '},
          {
            fontSize: 13,
            table: {
              widths: ['50%', '50%'],
              body: [
                ['Motivo: '+consultas.motivo, 'Precion arterial: '+consultas.presion_arterial],
                ['Frecuencia cardiaca :'+consultas.frecuencia_cardaica, 'Temperartura: '+consultas.temperatura],
                ['Talla: '+consultas.talla, 'Peso: '+consultas.peso]
              ]
            }
          },
          {text: '    '},
          {
            fontSize: 13,
            table: {
              widths: ['50%', '50%'],
              body: [
                ['Enfermedad: '+consultas.enfermedad?.nombre, 'Diagnostico: '+consultas.diagnostico?.descripcion],
                ['Tratamiento: '+consultas.tratamiento?.procedimiento, 'Descripción: '+consultas.tratamiento?.descripcion],
              ]
            }
          },
          {text: '    '},
          {
            fontSize: 13,
            table: {
              widths: ['100%'],
              body: [
                ['Conlusión: '+consultas.conclusion],
              ]
            }
          },
          {text: '    '},
          {text: 'FIRMA',fontSize: 13,bold: true, alignment: 'center'},
          {text: '    '},
          {text: '    '},
          {text: '________________________',fontSize: 13,bold: true, alignment: 'center'},
          {text: 'Dr.a '+usuarioMedico.nombres_completos,fontSize: 13, alignment: 'center'},

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
    });
  }
  CalculateAge(fecha?:Date): number {
    if (fecha!=null) {
      const convertAge = new Date(fecha);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      return  Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    } else {
      return 0;
    }
  }


}

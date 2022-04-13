import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './layout/header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './modules/home/home.component';
import { IniciarsesionComponent } from './modules/iniciarsesion/iniciarsesion.component';
import { NuevasucursalComponent } from './modules/nuevasucursal/nuevasucursal.component';
import { VersucursalesComponent } from './modules/versucursales/versucursales.component';
import { NuevomedicoComponent } from './modules/nuevomedico/nuevomedico.component';
import { NuevopacienteComponent } from './modules/nuevopaciente/nuevopaciente.component';
import { NuevohorarioComponent } from './modules/nuevohorario/nuevohorario.component';
import { VerhorariosComponent } from './modules/verhorarios/verhorarios.component';
import { NuevaespacialidadComponent } from './modules/nuevaespacialidad/nuevaespacialidad.component';
import { VerespaclidadesComponent } from './modules/verespaclidades/verespaclidades.component';
import { EditarmedicoComponent } from './modules/editarmedico/editarmedico.component';
import {MaterialFileInputModule} from "ngx-material-file-input";
import { NuevacitaComponent } from './modules/nuevacita/nuevacita.component';
import { VercitasComponent } from './modules/vercitas/vercitas.component';
import { Vercitas2Component } from './modules/vercitas2/vercitas2.component';
import { NuevaconsultaComponent } from './modules/nuevaconsulta/nuevaconsulta.component';
import { VerconsultasComponent } from './modules/verconsultas/verconsultas.component';
import { EditarconsultaComponent } from './modules/editarconsulta/editarconsulta.component';
import { Verconsultas2Component } from './modules/verconsultas2/verconsultas2.component';
import {HospitalizacionComponent} from "./modules/hospitalizacion/hospitalizacion.component";
import {QuirofanoComponent} from "./modules/quirofano/quirofano.component";
import {EmergenciasComponent} from "./modules/emergencias/emergencias.component";
import {NoticiasComponent} from "./modules/noticias/noticias.component";
import {ContactoComponent} from "./modules/contacto/contacto.component";
import {QuienesSomosComponent} from "./modules/quienes-somos/quienes-somos.component";
import {CuidadoIntensivoComponent} from "./modules/cuidado-intensivo/cuidado-intensivo.component";
import { VermedicosComponent } from './modules/vermedicos/vermedicos.component';
import { VerpacientesComponent } from './modules/verpacientes/verpacientes.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent,  pathMatch: 'full'},
  { path: 'inicio/inicarsesion', component: IniciarsesionComponent},
  { path: 'inicio/adminstradar/nuevesucursal/:id', component: NuevasucursalComponent},
  { path: 'inicio/adminstradar/versucursales', component: VersucursalesComponent},
  { path: 'inicio/adminstradar/nuevomedico', component: NuevomedicoComponent},
  { path: 'inicio/inicarsesion/nuevopaciente/:id', component: NuevopacienteComponent},
  { path: 'inicio/adminstradar/nuevohorario/:id', component: NuevohorarioComponent},
  { path: 'inicio/adminstradar/verhorario', component: VerhorariosComponent},
  { path: 'inicio/adminstradar/nuevoespacilidad/:id', component: NuevaespacialidadComponent},
  { path: 'inicio/adminstradar/verespacilidad', component: VerespaclidadesComponent},
  { path: 'inicio/inicarsesion/editarmedico/:id', component: EditarmedicoComponent},
  { path: 'inicio/inicarsesion/nuevacita/:id', component: NuevacitaComponent},
  { path: 'inicio/inicarsesion/vercitas/:id', component: VercitasComponent},
  { path: 'inicio/inicarsesion/vercitas2/:id', component: Vercitas2Component},
  { path: 'inicio/inicarsesion/nuevaconsulta/:id', component: NuevaconsultaComponent},
  { path: 'inicio/inicarsesion/verconsulta/:id', component: VerconsultasComponent},
  { path: 'inicio/inicarsesion/editarconsulta/:id', component: EditarconsultaComponent},
  { path: 'inicio/inicarsesion/verresultados/:id', component: Verconsultas2Component},
  { path: 'inicio/hospitalizacion', component: HospitalizacionComponent},
  { path: 'inicio/emergencias', component: EmergenciasComponent},
  { path: 'inicio/quirofano', component: QuirofanoComponent},
  { path: 'inicio/cuidado-intensivo', component: CuidadoIntensivoComponent},
  { path: 'inicio/quienes-somos', component:QuienesSomosComponent},
  { path: 'inicio/contactanos', component: ContactoComponent},
  { path: 'inicio/noticias', component:NoticiasComponent},
  { path: 'inicio/adminstradar/vermedico', component:VermedicosComponent},
  { path: 'inicio/adminstradar/verpaciente', component:VerpacientesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    IniciarsesionComponent,
    NuevasucursalComponent,
    VersucursalesComponent,
    NuevomedicoComponent,
    NuevopacienteComponent,
    NuevohorarioComponent,
    VerhorariosComponent,
    NuevaespacialidadComponent,
    VerespaclidadesComponent,
    EditarmedicoComponent,
    NuevacitaComponent,
    VercitasComponent,
    Vercitas2Component,
    NuevaconsultaComponent,
    VerconsultasComponent,
    EditarconsultaComponent,
    Verconsultas2Component,
    HospitalizacionComponent,
    QuirofanoComponent,
    EmergenciasComponent,
    CuidadoIntensivoComponent,
    QuienesSomosComponent,
    NoticiasComponent,
    ContactoComponent,
    VermedicosComponent,
    VerpacientesComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        MaterialFileInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './layout/header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './modules/home/home.component';
import { IniciarsesionComponent } from './modules/iniciarsesion/iniciarsesion.component';
import { NuevasucursalComponent } from './modules/nuevasucursal/nuevasucursal.component';
import { VersucursalesComponent } from './modules/versucursales/versucursales.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent,  pathMatch: 'full'},
  { path: 'inicio/inicarsesion', component: IniciarsesionComponent},
  { path: 'inicio/adminstradar/nuevesucursal/:id', component: NuevasucursalComponent},
  { path: 'inicio/adminstradar/versucursales', component: VersucursalesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    IniciarsesionComponent,
    NuevasucursalComponent,
    VersucursalesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

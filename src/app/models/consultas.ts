import {Paciente} from "./paciente";
import {Medico} from "./medico";

export class Consultas {
  id?:Number;
  fecha?:Date;
  motivo?:String;
  presion_arterial?:String;
  frecuencia_cardaica?:String;
  temperatura?:String;
  talla?:String;
  peso?:String;
  conclusion?:String
  pacienteSet?:Paciente[];
  medicoSet?:Medico[];
  diagnostico?:Diagnostico;
  tratamiento?:Tratamiento;
  enfermedad?:Enfermedad;

}

export class Diagnostico{
  id?:String;
  descripcion?:String;
}

export class Tratamiento{
  id?:String;
  procedimiento?:String;
  descripcion?:String;
}

export class Enfermedad{
  id?:String;
  nombre?:String;
}

import {Medico} from "./medico";
import {Paciente} from "./paciente";
import {Horarios} from "./horarios";

export class Citas {
  id?:Number;
  estado?:String;
  medico?:Medico[];
  paciente?:Paciente[];
  horarios?:Horarios[];

}

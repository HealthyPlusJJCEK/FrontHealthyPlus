import {Sucursal} from "./sucursal";
import {Espacilidad} from "./espacilidad";
import {Horarios} from "./horarios";

export class Medico {
  id?:Number;
  foto?:String;
  id_usuario?:Number;
  sucursal?:Sucursal[];
  especialidad?:Espacilidad[];
  horarios?:Horarios[];
  titulo?:Titulo;

}

export class Titulo{
  id?:Number;
  nombre_titulo?:String;
}

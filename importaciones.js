import veneno from './img/wallTypes/veneno.png';
import bicho from './img/wallTypes/bicho.png';
import fuego from './img/wallTypes/fuego.png';
import agua from './img/wallTypes/agua.png';
import hierba from './img/wallTypes/hierba.png';
import normal from './img/wallTypes/normal.png';
import hada from './img/wallTypes/hada.png';
import acero from './img/wallTypes/acero.png';
import psiquico from './img/wallTypes/psiquico.png';
import electrico from './img/wallTypes/electrico.png';
import tierra from './img/wallTypes/tierra.png';
import fantasma from './img/wallTypes/fantasma.png';
import luchador from './img/wallTypes/luchador.png';
import roca from './img/wallTypes/roca.png';
import hielo from './img/wallTypes/hielo.png';
import dragon from './img/wallTypes/dragon.png';
import oscuro from './img/wallTypes/oscuro.png';
import volador from './img/wallTypes/volador.png';

//Obtener imagen en base al tipo de pokemon
export let wallType = name =>{
    let resultado
    name == "poison" ? resultado = veneno:
    name == "bug" ? resultado = bicho:
    name == "fire" ? resultado = fuego:
    name == "water" ? resultado = agua:
    name == "grass" ? resultado = hierba:
    name == "normal" ? resultado = normal:
    name == "fairy" ? resultado = hada:
    name == "steel" ?resultado = acero:
    name == "psychic" ? resultado = psiquico:
    name == "electric" ?resultado = electrico:
    name == "ground" ?resultado = tierra:
    name == "ghost" ?resultado = fantasma:
    name == "fighting" ?resultado = luchador:
    name == "rock" ? resultado = roca:
    name == "ice" ? resultado = hielo:
    name == "dragon" ?resultado = dragon:
    name == "dark" ? resultado = oscuro:
    name == "flying" ? resultado = volador:
    resultado = agua

    return resultado;
}
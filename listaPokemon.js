import './style.css'
import { wallType } from './importaciones'; //Imagenes de fondo
import pokeballIMG from './img/pokeballPNG.png'//Imagen de cargar más

//Guarda posición de continuación para la lista
let position = 1; 

const consumirAPI = async () => {
    //for asegura que pokemon se carguen en orden, no comenzará el siguiente hasta que termine en anterior
    for(let i = 0; i<20; i++){
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${position}`)
            
            if (respuesta.status === 200) {
                const datos = await respuesta.json(); //Obtener JSON
                let cardImg;
                datos.sprites.other.dream_world.front_default ? cardImg = datos.sprites.other.dream_world.front_default : 
                datos.sprites.other["official-artwork"].front_default ? cardImg = datos.sprites.other["official-artwork"].front_default : cardImg = pokeballIMG
    
                //Se eliminar botón de "Ver más"
                if(document.getElementById("cargarMas"))
                    document.getElementById("cargarMas").remove()
    
                //Rellenar tarjeta y se añade botón "Ver más" al final
                containerMiniCards.innerHTML +=
                    `
                    <a href="https://www.wikidex.net/wiki/${datos.name}" target="_blank" class="col-3 miniCard">
                    <h4 m-0 py-3>${datos.name}</h4>
                        <div class="cardsInside" style="background-image: url(${wallType(datos.types[0].type.name)})">
                            <div class="card-top">
                                <img class="cardimg" src="${cardImg}" alt="Card image cap">
                            </div>
                        </div>
                    </a>
                    <div id="cargarMas" class="col-3 miniCard">
                        <h4 m-0 py-3>Cargar más</h4>
                        <div class="cardsInside">
                            <div class="card-top">
                                <img class="cardimg" src="${pokeballIMG}" alt="Card image cap">
                            </div>
                        </div>
                    </div>
                    `
                document.getElementById("cargarMas").addEventListener("click", consumirAPI)
                document.getElementById("cargarMas").style.cursor = "pointer"
            }
            // ========================================= ERROR
            else if (respuesta.status === 404) {
                containerMiniCards.innerHTML = "Pokemon no encontrado";
            }
            else console.log("Algo salió mal, favor intentar nuevamente")
    
        } catch (error) {
            console.log(error);
        }
        position++;
    }
}

//Botón para reiniciar lista de pokemon cargados. Vuelve a 1 y carga los primeros 20
const borrar = () =>{
    containerMiniCards.innerHTML = ""
    position = 1;
    consumirAPI()
}

let containerMiniCards = document.getElementById("containerMiniCards")
document.getElementById("borrar").addEventListener("click", borrar)
//Se espera a que se cargue el DOM antes de cargar los primeros 20 pokemon
document.addEventListener("DOMContentLoaded", () => {
    consumirAPI();
  });

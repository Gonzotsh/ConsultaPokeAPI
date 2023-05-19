import './style.css'
import { wallType } from './importaciones'; //Imagenes de fondo
import pokeballIMG from './img/pokeballPNG.png'//Imagen de pokemon no encontrado


//Variable para mantener el número de pokemon buscado
let ActualPokemonID = 0;

const consultarAPI = async (e, newID) => {
  e.preventDefault();
  //DOM
  const cardName = document.querySelector(".card-title")
  const cardImg = document.querySelector(".cardimg");
  const cardLink = document.getElementById("masInfo");
  const cardObject = document.getElementById("objeto");
  const cardType = document.getElementById("tipo");
  const cardWeight = document.getElementById("peso");
  const cardGame = document.getElementById("juego");
  const buscarNombre = document.getElementById("nombre").value

  let busqueda;
  //Comprobar si se escribe nombre o se presionan botones, si es con botones, comprobar que nunca sea menos de 1

  newID === "string" ? busqueda = buscarNombre : busqueda = newID;
  if (newID <= 0) busqueda = 1

  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)
    if (respuesta.status === 200) {

      //Obtener JSON
      const datos = await respuesta.json();
      ActualPokemonID = datos.id;

      //Nombre de Pokemon
      cardName.innerHTML = `${datos.id} - ${datos.name.charAt(0).toUpperCase() + datos.name.slice(1)}`;
      //Imagen : Los pokemon más actuales no tienen imagen SVG, se debe comprobar entonces de que tengan el arte oficial
      datos.sprites.other.dream_world.front_default ? cardImg.src = datos.sprites.other.dream_world.front_default :
        datos.sprites.other["official-artwork"].front_default ? cardImg.src = datos.sprites.other["official-artwork"].front_default : cardImg.src = pokeballIMG
      //Objeto : Verificar si pokemon tiene algún objeto
      datos.held_items.length > 0 ? cardObject.innerHTML = `Objeto: ${datos.held_items[0].item.name}` : cardObject.innerHTML = "No tiene objeto"
      //Tipo - Peso - Link para más info
      cardType.innerHTML = `Tipo: ${traduccion(datos.types[0].type.name)}`
      cardWeight.innerHTML = `Peso: ${datos.weight / 10} kg`
      cardLink.innerHTML = `<a href="https://www.wikidex.net/wiki/${datos.name}" id="link1" class="card-link" target="_blank">Más info</a>`
      //Primera aparicion : verificar que existe el dato
      datos.game_indices.length > 0 ? cardGame.innerHTML = `Primera aparición: Pokemon ${datos.game_indices[0].version.name}` : cardGame.innerHTML = "Primera aparición no actualizada"

      //Cambiar fondo
      changeBackground(datos.types[0].type.name)

      //Actualizar estadísticas : [0]hp - [1]ataque - [2]defensa - [3]ataque especial - [4]velocidad
      grafico.data.datasets[0].data = [datos.stats[0].base_stat, datos.stats[1].base_stat, datos.stats[2].base_stat, datos.stats[3].base_stat, datos.stats[4].base_stat]
    }
    else if (respuesta.status === 404) {
      cardName.innerHTML = "Pokemon no encontrado";
      cardImg.src = pokeballIMG
      cardType.innerHTML = "No hemos podido encontrar el pokemon que buscas"
      cardObject.innerHTML = ":("
      cardWeight.innerHTML = "Verifica que está bien escrito el nombre"
      cardGame.innerHTML = "O bien escribe un número"
      cardLink.innerHTML = `<a href="#" id="link1" class="card-link">No hay info</a>`
      ActualPokemonID = 0;
    }
    else console.log("Algo salió mal, favor intentar nuevamente")
  } catch (error) {
    console.log(error);
  }
}

// ============= BOTONES PARA BUSCAR POKEMON ==================
//Se consulta pokemon desde input
document.getElementById("botonConsulta").addEventListener("click", (e) => consultarAPI(e, "string"))
//Cambiar pokemon a izquierda o derecha
document.querySelector(".arrowLeft").addEventListener("click", (e) => consultarAPI(e, (ActualPokemonID - 1)))
document.querySelector(".arrowRight").addEventListener("click", (e) => consultarAPI(e, (ActualPokemonID + 1)))
//Se selecciona pokemon al azar
document.getElementById("azar").addEventListener("click", (e) => consultarAPI(e, parseInt(Math.random() * 1000)))

const traduccion = palabra => {
  let traducido
  let colorType

  palabra == "poison" ? (traducido = "Veneno", colorType = "purple") :
  palabra == "bug" ? (traducido = "Bicho", colorType = "green") :
  palabra == "fire" ? (traducido = "Fuego", colorType = "orange") :
  palabra == "water" ? (traducido = "Agua", colorType = "cornflowerblue") :
  palabra == "grass" ? (traducido = "Hierba", colorType = "green") :
  palabra == "normal" ? (traducido = "Normal", colorType = "gray") :
  palabra == "fairy" ? (traducido = "Hada", colorType = "pink") :
  palabra == "steel" ? (traducido = "Acero", colorType = "gray") :
  palabra == "psychic" ? (traducido = "Psíquico", colorType = "purple") :
  palabra == "electric" ? (traducido = "Eléctrico", colorType = "yellow") :
  palabra == "ground" ? (traducido = "Tierra", colorType = "brown") :
  palabra == "ghost" ? (traducido = "Fantasma", colorType = "black") :
  palabra == "fighting" ? (traducido = "Luchador", colorType = "red") :
  palabra == "rock" ? (traducido = "Roca", colorType = "gray") :
  palabra == "ice" ? (traducido = "Hielo", colorType = "aqua") :
  palabra == "dragon" ? (traducido = "Dragón", colorType = "green") :
  palabra == "dark" ? (traducido = "Oscuro", colorType = "black") :
  palabra == "flying" ? (traducido = "Volador", colorType = "blue") :
  (traducido = "Desconocido", colorType = "white")

  const borde = document.querySelector(".card")
  borde.style.borderColor = colorType

  return traducido
}

const changeBackground = type => {
  const backgroundType = document.querySelector(".card-top")
  backgroundType.style.backgroundImage = `url(${wallType(type)})`;
}

const grafico = new Chart(document.getElementById('myChart'), {
  type: 'doughnut',
  data: {
    labels: ['Salud', 'Ataque', 'Defensa', 'Ataque especial', 'Velocidad'],
    datasets: [{
      data: [1, 1, 1, 1, 100],
      borderWidth: 1
    }]
  }
});

const canvasBackground = document.getElementById("canvasBackground")
const canvasContainer = document.getElementById("canvasContainer")

const showPopUp = () => {
  if (ActualPokemonID > 0) {
    canvasBackground.style.display = "flex"
    canvasBackground.style.backgroundColor = "#1a1a1aab";
    canvasContainer.style.marginTop = "5rem"

    document.querySelector(".container").style.filter = "blur(4px)"
    document.querySelector(".navBarFull").style.filter = "blur(4px)"
    setTimeout(() => {
      grafico.update();
    }, 300);
  }
}

const salir = () => {
  canvasContainer.style.marginTop = "-200vh"
  canvasBackground.style.backgroundColor = "#1a1a1a00";
  document.querySelector(".container").style.filter = "blur(0)"
  document.querySelector(".navBarFull").style.filter = "blur(0)"
  setTimeout(() => {
    canvasBackground.style.display = "none"

  }, 400);
}

// Mostrar y ocultar PopUp
document.getElementById("salir").addEventListener("click", salir)
document.querySelector(".cardimg").addEventListener("click", showPopUp)
document.getElementById("canvasBackground").addEventListener("click", salir)
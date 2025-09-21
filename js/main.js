
// Array
const juegosDisponibles = [
  { nombre: "Metegol", precio: 5000 },
  { nombre: "Inflable", precio: 8000 },
  { nombre: "Pool", precio: 6000 },
  { nombre: "Jenga", precio: 3000 }
];

function mostrarJuegos() {
  console.log("Lista de juegos disponibles:");
  for (let i = 0; i < juegosDisponibles.length; i++) {
    console.log(`${i + 1} - ${juegosDisponibles[i].nombre} ($${juegosDisponibles[i].precio})`);
  }
}

function seleccionarJuegos() {
  let seleccionados = [];
  let seguir = true;

  while (seguir) {
    mostrarJuegos();
    let opcion = prompt("Ingrese el número del juego que desea alquilar (o escriba SALIR para terminar):");

    if (opcion && opcion.toLowerCase() === "salir") {
      seguir = false;
    } else {
      let indice = parseInt(opcion) - 1;
      if (indice >= 0 && indice < juegosDisponibles.length) {
        seleccionados.push(juegosDisponibles[indice]);
        alert(`Agregaste ${juegosDisponibles[indice].nombre}`);
      } else {
        alert("Opción inválida, intente de nuevo.");
      }
    }
  }
  return seleccionados;
}

function calcularTotal(listaJuegos) {
  let total = 0;
  for (let i = 0; i < listaJuegos.length; i++) {
    total += listaJuegos[i].precio;
  }

  if (total > 10000) {
    alert("¡Felicidades! Tienes un 10% de descuento por superar $10.000");
    total = total * 0.9;
  }

  return total;
}

function mostrarResumen(cliente, juegos, total) {
  console.log(`Cliente: ${cliente}`);
  console.log("Juegos alquilados:");
  for (let i = 0; i < juegos.length; i++) {
    console.log(`- ${juegos[i].nombre}: $${juegos[i].precio}`);
  }
  console.log(`Total a pagar: $${total}`);
  alert(`Gracias ${cliente}, tu total es $${total}`);
}

alert("Bienvenido al sistema de alquiler de juegos");
let clienteNombre = prompt("Ingrese su nombre:");
const juegosSeleccionados = seleccionarJuegos();
const total = calcularTotal(juegosSeleccionados);
mostrarResumen(clienteNombre, juegosSeleccionados, total);

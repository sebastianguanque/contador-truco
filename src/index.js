import { Contador } from "./contador.js";

const j1 = new Contador("Nosotros", document.getElementById("jugador1"));
const j2 = new Contador("Ellos", document.getElementById("jugador2"));

const reset = document.getElementById("reset");

reset.addEventListener("click", () => {
  j1.reset();
  j2.reset();
  resetDigital();
});

// TABS

/* TABS */
const li = document.querySelectorAll(".li");
const bloque = document.querySelectorAll(".bloque");
let tabActivo = 0; // Inicializamos el tab activo en el primero

// Función para mostrar el tab correspondiente
function mostrarTab(indice) {
  // Validamos que el índice esté dentro de los límites
  if (indice < 0) {
    indice = li.length - 1;
  } else if (indice >= li.length) {
    indice = 0;
  }

  // Quitamos la clase activo a todos los li y bloques
  li.forEach((cadaLi) => cadaLi.classList.remove("activo"));
  bloque.forEach((cadaBloque, index) => {
    cadaBloque.classList.remove("activo");
    cadaBloque.setAttribute("aria-hidden", index !== indice); // Se agrega el atributo aria-hidden para los lectores de pantallas
    cadaBloque.classList.add("oculto"); // Agregamos la clase oculta
  });

  // Añadimos la clase activo al li y bloque correspondientes
  li[indice].classList.add("activo");
  bloque[indice].classList.add("activo");

  // Ocultar todos los bloques
  bloque[indice].classList.remove("oculto"); // Quitamos la clase oculta al activo

  // Actualizamos el índice del tab activo
  tabActivo = indice;
}

// Click en li
li.forEach((cadaLi, i) => {
  cadaLi.addEventListener("click", () => {
    mostrarTab(i);
  });
});

// Eventos de teclado
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    mostrarTab(tabActivo + 1);
  } else if (event.key === "ArrowLeft") {
    mostrarTab(tabActivo - 1);
  }
});

// Mostrar el primer tab por defecto
mostrarTab(tabActivo);

/* CONTADOR DIGITAL */

const display = document.querySelector(".display");
const incrementar = document.querySelector(".incrementar");
const decrementar = document.querySelector(".decrementar");

const display1 = document.querySelector(".display1");
const incrementar2 = document.querySelector(".incrementar2");
const decrementar2 = document.querySelector(".decrementar2");

let count = 0;
let count1 = 0;

// Función para manejar el contador
function actualizarContador(contador, operacion) {
  const limiteSuperior = 30;
  const limiteInferior = 0;

  if (operacion === "incremento" && contador < limiteSuperior) {
    contador++;
  } else if (operacion === "decremento" && contador > limiteInferior) {
    contador--;
  }

  if (contador > 29) {
    modal.showModal();
    start();
  }
  return contador;
}

// Event listeners para el primer contador
incrementar.addEventListener("click", () => {
  count = actualizarContador(count, "incremento");
  display.textContent = `${count}`;
});

decrementar.addEventListener("click", () => {
  count = actualizarContador(count, "decremento");
  display.textContent = `${count}`;
});

// Event listeners para el segundo contador
incrementar2.addEventListener("click", () => {
  count1 = actualizarContador(count1, "incremento");
  display1.textContent = `${count1}`;
});

decrementar2.addEventListener("click", () => {
  count1 = actualizarContador(count1, "decremento");
  display1.textContent = `${count1}`;
});

function resetDigital() {
  count = count1 = 0;
  display.textContent = 0;
  display1.textContent = 0;
}

/* Modal Pop Up */
const modal = document.querySelector(".dialog");
const btnClose = document.querySelector(".btn-close");

function start() {
  confetti.start();
}

function stop() {
  confetti.stop();
}

btnClose.addEventListener("click", () => {
  modal.close();
  stop();
  j1.reset();
  j2.reset();
  resetDigital();
});

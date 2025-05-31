'use strict';

class Contador {
  numero = 0;
  nombre;
  cuentaElement;
  containerElement;
  onGanarChicoCallback;

  constructor(nombre, containerElement, cuentaInicial = 0, onGanarChicoCallback = null) {
    this.nombre = nombre;
    this.numero = cuentaInicial;
    this.containerElement = containerElement;
    this.onGanarChicoCallback = onGanarChicoCallback;

    containerElement.querySelector("h2").innerText = nombre;

    containerElement
      .querySelector(".agregar")
      .addEventListener("click", () => this.agregar());

    containerElement
      .querySelector(".restar")
      .addEventListener("click", () => this.restar());

    this.cuentaElement = containerElement.querySelector(".account");
  }

  agregar(cantidad = 1) {
    this.numero += cantidad;

    if (this.numero >= 30) {
      this.numero = 0;
      this.actualizarCuenta();

      if (typeof this.onGanarChicoCallback === "function") {
        const nombreLower = this.nombre.toLowerCase();
        if (nombreLower.includes("nosotros")) {
          this.onGanarChicoCallback("j1");
        } else if (nombreLower.includes("ellos")) {
          this.onGanarChicoCallback("j2");
        }
      }

      return;
    }

    this.actualizarCuenta();
  }

  restar(cantidad = 1) {
    this.numero = Math.max(0, this.numero - cantidad);
    this.actualizarCuenta();
  }

  reset() {
    this.numero = 0;
    this.actualizarCuenta();
  }

  actualizarCuenta() {
    const grupoActuales = this.containerElement.querySelectorAll(".grupo");
    const separadoresActuales =
      this.containerElement.querySelectorAll(".separador");

    if (grupoActuales.length >= 1) {
      grupoActuales.forEach((grupo) =>
        this.cuentaElement.removeChild(grupo)
      );
      separadoresActuales.forEach((separador) =>
        this.cuentaElement.removeChild(separador)
      );
    }

    let grupoActual;
    for (let i = 0; i < this.numero; i++) {
      if (i % 5 === 0 && i < 30) {
        grupoActual = document.createElement("div");
        grupoActual.classList.add("grupo");

        if (i % 15 === 0 && i !== 0) {
          const separador = document.createElement("div");
          separador.classList.add("separador");
          this.cuentaElement.appendChild(separador);
        }

        this.cuentaElement.appendChild(grupoActual);
      }

      const nuevoFosforo = document.createElement("img");
      nuevoFosforo.src = "public/img/fosforo.avif";
      nuevoFosforo.classList.add("fosforo-" + ((i % 5) + 1));

      grupoActual.appendChild(nuevoFosforo);
    }
  }
}

/* Modal Pop Up */
const modal$1 = document.querySelector(".dialog");
const btnClose$1 = document.querySelector(".btn-close");

function stop$1() {
  confetti.stop();
}

btnClose$1.addEventListener("click", () => {
  modal$1.close();
  stop$1();
});

const j1 = new Contador("Nosotros", document.getElementById("jugador1"), 0, onGanarChico);
const j2 = new Contador("Ellos", document.getElementById("jugador2"), 0, onGanarChico);

j1.otroContador = j2;  // asignamos luego porque j2 aún no existía al crear j1
const reset = document.getElementById("reset");

reset.addEventListener("click", () => {
    j1.reset();
  j2.reset();
  resetDigital();
  chicos1 = 0;
  chicos2 = 0;
  actualizarChicos();
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

let chicos1 = 0;
let chicos2 = 0;

function actualizarChicos() {
  document.getElementById("chicos-j1").textContent = chicos1;
  document.getElementById("chicos-j2").textContent = chicos2;
}

function onGanarChico(ganador) {
  if (ganador === "j1") {
    chicos1++;
  } else if (ganador === "j2") {
    chicos2++;
  }

  actualizarChicos();

  if (chicos1 === 2 || chicos2 === 2) {
    const nombreGanador = chicos1 === 2 ? "¡Nosotros!" : "¡Ellos!";
    document.getElementById("mensaje-final").textContent = `${nombreGanador} ganaron el juego`;
    modal.showModal();
    start(); // animación
    resetJuego();
  }
}

function resetJuego() {
  chicos1 = 0;
  chicos2 = 0;
  actualizarChicos();
  j1.reset();
  j2.reset();
  resetDigital(); // si lo usás también
}

// Función para manejar el contador
function actualizarContador(contador, operacion) {
  const limiteInferior = 0;

  if (contador > limiteInferior) {
    contador--;
  }

  return contador;
}

// Event listeners para el primer contador
incrementar.addEventListener("click", () => {
  count++;
  if (count >= 30) {
    count = 30;
    onGanarChico("j1"); // <- ganaron "Nosotros"
    count = 0;
    count1 = 0;
    display.textContent = 0;
    display1.textContent = 0;
  } else {
    display.textContent = count;
  }
});

decrementar.addEventListener("click", () => {
  count = actualizarContador(count);
  display.textContent = `${count}`;
});

// Event listeners para el segundo contador
incrementar2.addEventListener("click", () => {
  count1++;
  if (count1 >= 30) {
    count1 = 30;
    onGanarChico("j2"); // <- ganaron "Ellos"
    count = 0;
    count1 = 0;
    display.textContent = 0;
    display1.textContent = 0;
  } else {
    display1.textContent = count1;
  }
});

decrementar2.addEventListener("click", () => {
  count1 = actualizarContador(count1);
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

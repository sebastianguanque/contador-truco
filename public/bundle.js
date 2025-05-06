'use strict';

class Contador {
  numero = 0;
  nombre;
  cuentaElement;
  containerElement;

  constructor(nombre, containerElement, cuentaInicial = 0) {
    this.nombre = nombre;
    this.numero = cuentaInicial;
    this.containerElement = containerElement;
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
    if (this.numero > 28) {
      modal$1.showModal();
      start$1();
    }
    this.numero += cantidad;

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
      grupoActuales.forEach((grupo) => this.cuentaElement.removeChild(grupo));
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

function start$1() {
  confetti.start();
}

function stop$1() {
  confetti.stop();
}

btnClose$1.addEventListener("click", () => {
  modal$1.close();
  stop$1();
});

const j1 = new Contador("Nosotros", document.getElementById("jugador1"));
const j2 = new Contador("Ellos", document.getElementById("jugador2"));

const reset = document.getElementById("reset");

reset.addEventListener("click", () => {
  j1.reset();
  j2.reset();
  resetDigital();
});

// TABS

const li = document.querySelectorAll(".li");
const bloque = document.querySelectorAll(".bloque");

li.forEach((cadaLi, i) => {
  li[i].addEventListener("click", () => {
    li.forEach((cadaLi, i) => {
      li[i].classList.remove("activo");
      bloque[i].classList.remove("activo");
    });

    li[i].classList.add("activo");
    bloque[i].classList.add("activo");
  });
});

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

"use strict";

// Clase Contador para el modo tradicional
class Contador {
  constructor(
    nombre,
    containerElement,
    cuentaInicial = 0,
    onGanarChicoCallback = null
  ) {
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
    this.actualizarCuenta();
  }

  agregar(cantidad = 1) {
    this.numero += cantidad;

    if (this.numero < 30) {
      this.actualizarCuenta();
      guardarEstado(); // Guardar el estado después de cada cambio de puntos
      return;
    }

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
    guardarEstado(); // Guardar el estado después de ganar un chico (los puntos se resetean)
  }

  restar(cantidad = 1) {
    this.numero = Math.max(0, this.numero - cantidad);
    this.actualizarCuenta();
    guardarEstado(); // Guardar el estado después de cada cambio de puntos
  }

  reset() {
    this.numero = 0;
    this.actualizarCuenta();
    // No se llama guardarEstado aquí, ya que resetPuntos lo hará o se llama en reiniciarTodo
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
      nuevoFosforo.src = "./img/fosforo.avif";
      nuevoFosforo.classList.add("fosforo-" + ((i % 5) + 1));

      grupoActual.appendChild(nuevoFosforo);
    }
  }
}

// Variables globales
let chicos1 = 0;
let chicos2 = 0;
let count = 0; // Puntos del contador digital para "Nosotros"
let count1 = 0; // Puntos del contador digital para "Ellos"

// Elementos DOM
const modal = document.querySelector(".dialog");
const btnClose = document.querySelector(".btn-close");
const resetButton = document.getElementById("reset");
const display = document.querySelector(".display");
const incrementar = document.querySelector(".incrementar");
const decrementar = document.querySelector(".decrementar");
const display1 = document.querySelector(".display1");
const incrementar2 = document.querySelector(".incrementar2");
const decrementar2 = document.querySelector(".decrementar2");
const li = document.querySelectorAll(".li");
const bloque = document.querySelectorAll(".bloque");

// Inicialización de contadores (se inicializan con 0, pero se cargarán con los datos de localStorage)
const j1 = new Contador(
  "Nosotros",
  document.getElementById("jugador1"),
  0,
  onGanarChico
);
const j2 = new Contador(
  "Ellos",
  document.getElementById("jugador2"),
  0,
  onGanarChico
);

// --- Funciones de LocalStorage ---

function guardarEstado() {
  const estado = {
    puntosJ1: j1.numero,
    puntosJ2: j2.numero,
    chicosJ1: chicos1,
    chicosJ2: chicos2,
    puntosDigitalJ1: count,
    puntosDigitalJ2: count1,
    tabActivo: tabActivo, // Guardar el tab activo
  };
  localStorage.setItem("estadoTruco", JSON.stringify(estado));
}

function cargarEstado() {
  const estadoGuardado = localStorage.getItem("estadoTruco");
  if (estadoGuardado) {
    const estado = JSON.parse(estadoGuardado);
    j1.numero = estado.puntosJ1 || 0;
    j2.numero = estado.puntosJ2 || 0;
    chicos1 = estado.chicosJ1 || 0;
    chicos2 = estado.chicosJ2 || 0;
    count = estado.puntosDigitalJ1 || 0;
    count1 = estado.puntosDigitalJ2 || 0;
    tabActivo = estado.tabActivo || 0; // Cargar el tab activo

    j1.actualizarCuenta();
    j2.actualizarCuenta();
    actualizarChicos();
    display.textContent = count;
    display1.textContent = count1;
    mostrarTab(tabActivo); // Asegurarse de mostrar el tab correcto al cargar
  } else {
    // Si no hay estado guardado, inicializar con valores predeterminados
    reiniciarTodo();
  }
}

// --- Fin de Funciones de LocalStorage ---

// Funciones para el contador de chicos
function actualizarChicos() {
  document.getElementById("chicos-j1").textContent = chicos1;
  document.getElementById("chicos-j2").textContent = chicos2;

  // Animación en los badges
  const badgeJ1 = document.querySelector(".chico-nosotros");
  const badgeJ2 = document.querySelector(".chico-ellos");

  badgeJ1.classList.remove("ganador");
  badgeJ2.classList.remove("ganador");

  setTimeout(() => {
    if (chicos1 > 0) badgeJ1.classList.add("ganador");
    if (chicos2 > 0) badgeJ2.classList.add("ganador");
  }, 100);

  guardarEstado(); // Guardar el estado después de actualizar los chicos
}

function mostrarIndicadorChico(ganador) {
  const indicador = document.getElementById("chico-ganado");
  const nombreGanador = document.getElementById("chico-ganador-nombre");

  const nombreEquipo = ganador === "j1" ? "Nosotros" : "Ellos";
  nombreGanador.textContent = `${nombreEquipo} ganaron este chico`;

  indicador.style.display = "block";

  setTimeout(() => {
    ocultarIndicadorChico();
  }, 3000);
}

function ocultarIndicadorChico() {
  const indicador = document.getElementById("chico-ganado");
  indicador.style.display = "none";
}

function onGanarChico(ganador) {
  if (ganador === "j1") {
    chicos1++;
  } else if (ganador === "j2") {
    chicos2++;
  }

  actualizarChicos();
  mostrarIndicadorChico(ganador);
  resetPuntos();

  if (chicos1 === 2 || chicos2 === 2) {
    const nombreGanador = chicos1 === 2 ? "¡Nosotros!" : "¡Ellos!";
    document.getElementById(
      "mensaje-final"
    ).textContent = `${nombreGanador} ganaron el juego`;

    setTimeout(() => {
      modal.showModal();
      if (typeof confetti !== "undefined" && confetti.start) {
        confetti.start();
      }
    }, 1000);
  }
  guardarEstado(); // Guardar el estado después de que se gana un chico
}

function reiniciarTodo() {
  resetPuntos();
  chicos1 = 0;
  chicos2 = 0;
  actualizarChicos();
  ocultarIndicadorChico();
  guardarEstado(); // Asegurarse de guardar el estado después de un reinicio completo
}

// Boton de reset
resetButton.addEventListener("click", () => {
  reiniciarTodo();
});

function resetPuntos() {
  j1.reset();
  j2.reset();
  count = 0;
  count1 = 0;
  display.textContent = "0";
  display1.textContent = "0";
  guardarEstado(); // Guardar el estado después de resetear los puntos
}

// Funciones para el contador digital
function actualizarContador(contador) {
  const limiteInferior = 0;
  if (contador > limiteInferior) {
    contador--;
  }
  return contador;
}

// Contador digital
incrementar.addEventListener("click", () => {
  count++;
  if (count >= 30) {
    count = 30;
    onGanarChico("j1");
    count = 0;
    count1 = 0;
    display.textContent = "0";
    display1.textContent = "0";
  } else {
    display.textContent = count;
  }
  guardarEstado(); // Guardar el estado después de cada cambio en el contador digital
});

decrementar.addEventListener("click", () => {
  count = actualizarContador(count);
  display.textContent = count;
  guardarEstado(); // Guardar el estado después de cada cambio en el contador digital
});

incrementar2.addEventListener("click", () => {
  count1++;
  if (count1 >= 30) {
    count1 = 30;
    onGanarChico("j2");
    count = 0;
    count1 = 0;
    display.textContent = "0";
    display1.textContent = "0";
  } else {
    display1.textContent = count1;
  }
  guardarEstado(); // Guardar el estado después de cada cambio en el contador digital
});

decrementar2.addEventListener("click", () => {
  count1 = actualizarContador(count1);
  display1.textContent = count1;
  guardarEstado(); // Guardar el estado después de cada cambio en el contador digital
});

// Tabs
li.forEach((cadaLi, i) => {
  cadaLi.addEventListener("click", () => {
    mostrarTab(i);
    guardarEstado(); // Guardar el tab activo
  });
});

// Función para el sistema de tabs
let tabActivo = 0;

function mostrarTab(indice) {
  if (indice < 0) {
    indice = li.length - 1;
  } else if (indice >= li.length) {
    indice = 0;
  }

  li.forEach((cadaLi) => cadaLi.classList.remove("activo"));

  bloque.forEach((cadaBloque, index) => {
    const esActivo = index === indice;

    cadaBloque.classList.remove("activo");
    cadaBloque.classList.remove("oculto");

    if (esActivo) {
      cadaBloque.classList.add("activo");
      cadaBloque.setAttribute("aria-hidden", "false");

      cadaBloque
        .querySelectorAll("button, a, input, select, [tabindex]")
        .forEach((el) => {
          if (el.dataset.originalTabindex !== undefined) {
            el.tabIndex = parseInt(el.dataset.originalTabindex);
            delete el.dataset.originalTabindex;
          } else {
            el.removeAttribute("tabindex"); // Remover tabindex si no fue modificado antes
          }
        });
    } else {
      cadaBloque.classList.add("oculto");
      cadaBloque.setAttribute("aria-hidden", "true");

      cadaBloque
        .querySelectorAll(
          'button, a, input, select, [tabindex]:not([tabindex="-1"])'
        )
        .forEach((el) => {
          if (el.tabIndex !== -1) {
            el.dataset.originalTabindex = el.tabIndex;
          }
          el.tabIndex = -1;
        });
    }
  });

  li[indice].classList.add("activo");

  tabActivo = indice;
}

// Función para detener confetti
function stopConfetti() {
  if (typeof confetti !== "undefined" && confetti.stop) {
    confetti.stop();
  }
}

// Modal
btnClose.addEventListener("click", () => {
  modal.close();
  stopConfetti();
  reiniciarTodo();
});

// Eventos de teclado
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    mostrarTab(tabActivo + 1);
    guardarEstado(); // Guardar el tab activo
  } else if (event.key === "ArrowLeft") {
    mostrarTab(tabActivo - 1);
    guardarEstado(); // Guardar el tab activo
  }
});

// Inicialización: Cargar el estado guardado al inicio
cargarEstado();

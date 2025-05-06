export class Contador {
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
      modal.showModal();
      start();
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
});

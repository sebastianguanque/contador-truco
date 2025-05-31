// Clase Contador para el modo tradicional
class Contador {
  constructor(nombre, containerElement, cuentaInicial = 0, onGanarChicoCallback = null) {
    this.nombre = nombre
    this.numero = cuentaInicial
    this.containerElement = containerElement
    this.onGanarChicoCallback = onGanarChicoCallback

    containerElement.querySelector("h2").innerText = nombre

    containerElement.querySelector(".agregar").addEventListener("click", () => this.agregar())

    containerElement.querySelector(".restar").addEventListener("click", () => this.restar())

    this.cuentaElement = containerElement.querySelector(".account")
    this.actualizarCuenta()
  }

  agregar(cantidad = 1) {
    this.numero += cantidad

    if (this.numero >= 30) {
      this.numero = 0
      this.actualizarCuenta()

      if (typeof this.onGanarChicoCallback === "function") {
        const nombreLower = this.nombre.toLowerCase()
        if (nombreLower.includes("nosotros")) {
          this.onGanarChicoCallback("j1")
        } else if (nombreLower.includes("ellos")) {
          this.onGanarChicoCallback("j2")
        }
      }

      return
    }

    this.actualizarCuenta()
  }

  restar(cantidad = 1) {
    this.numero = Math.max(0, this.numero - cantidad)
    this.actualizarCuenta()
  }

  reset() {
    this.numero = 0
    this.actualizarCuenta()
  }

  actualizarCuenta() {
    const grupoActuales = this.containerElement.querySelectorAll(".grupo")
    const separadoresActuales = this.containerElement.querySelectorAll(".separador")

    if (grupoActuales.length >= 1) {
      grupoActuales.forEach((grupo) => this.cuentaElement.removeChild(grupo))
      separadoresActuales.forEach((separador) => this.cuentaElement.removeChild(separador))
    }

    let grupoActual
    for (let i = 0; i < this.numero; i++) {
      if (i % 5 === 0 && i < 30) {
        grupoActual = document.createElement("div")
        grupoActual.classList.add("grupo")

        if (i % 15 === 0 && i !== 0) {
          const separador = document.createElement("div")
          separador.classList.add("separador")
          this.cuentaElement.appendChild(separador)
        }

        this.cuentaElement.appendChild(grupoActual)
      }

      const nuevoFosforo = document.createElement("img")
      nuevoFosforo.src = "public/img/fosforo.avif"
      nuevoFosforo.classList.add("fosforo-" + ((i % 5) + 1))

      grupoActual.appendChild(nuevoFosforo)
    }
  }
}

// Variables globales
let chicos1 = 0
let chicos2 = 0
let count = 0
let count1 = 0

// Elementos DOM
const modal = document.querySelector(".dialog")
const btnClose = document.querySelector(".btn-close")
const reset = document.getElementById("reset")
const display = document.querySelector(".display")
const incrementar = document.querySelector(".incrementar")
const decrementar = document.querySelector(".decrementar")
const display1 = document.querySelector(".display1")
const incrementar2 = document.querySelector(".incrementar2")
const decrementar2 = document.querySelector(".decrementar2")
const li = document.querySelectorAll(".li")
const bloque = document.querySelectorAll(".bloque")



// Inicialización de contadores
const j1 = new Contador("Nosotros", document.getElementById("jugador1"), 0, onGanarChico)
const j2 = new Contador("Ellos", document.getElementById("jugador2"), 0, onGanarChico)

// Funciones para el contador de chicos
function actualizarChicos() {
  document.getElementById("chicos-j1").textContent = chicos1
  document.getElementById("chicos-j2").textContent = chicos2

  // Animación en los badges
  const badgeJ1 = document.querySelector(".chico-nosotros")
  const badgeJ2 = document.querySelector(".chico-ellos")

  badgeJ1.classList.remove("ganador")
  badgeJ2.classList.remove("ganador")

  setTimeout(() => {
    if (chicos1 > 0) badgeJ1.classList.add("ganador")
    if (chicos2 > 0) badgeJ2.classList.add("ganador")
  }, 100)
}

function mostrarIndicadorChico(ganador) {
  const indicador = document.getElementById("chico-ganado")
  const nombreGanador = document.getElementById("chico-ganador-nombre")

  const nombreEquipo = ganador === "j1" ? "Nosotros" : "Ellos"
  nombreGanador.textContent = `${nombreEquipo} ganaron este chico`

  indicador.style.display = "block"

  // Ocultar después de 2 segundos
  setTimeout(() => {
    ocultarIndicadorChico()
  }, 2000)
}

function ocultarIndicadorChico() {
  const indicador = document.getElementById("chico-ganado")
  indicador.style.display = "none"
}

function onGanarChico(ganador) {
  if (ganador === "j1") {
    chicos1++
  } else if (ganador === "j2") {
    chicos2++
  }

  actualizarChicos()
  mostrarIndicadorChico(ganador)

  if (chicos1 === 2 || chicos2 === 2) {
    const nombreGanador = chicos1 === 2 ? "¡Nosotros!" : "¡Ellos!"
    document.getElementById("mensaje-final").textContent = `${nombreGanador} ganaron el juego`

    setTimeout(() => {
      modal.showModal()
      if (typeof confetti !== "undefined" && confetti.start) {
        confetti.start()
      }
      resetJuego()
    }, 1500)
  }
}

function resetJuego() {
  setTimeout(() => {
    chicos1 = 0
    chicos2 = 0
    actualizarChicos()
    j1.reset()
    j2.reset()
    resetDigital()
    ocultarIndicadorChico()
  }, 3000)
}

// Funciones para el contador digital
function actualizarContador(contador) {
  const limiteInferior = 0
  if (contador > limiteInferior) {
    contador--
  }
  return contador
}

function resetDigital() {
  count = 0
  count1 = 0
  display.textContent = "0"
  display1.textContent = "0"
}

// Función para el sistema de tabs
let tabActivo = 0

function mostrarTab(indice) {
  if (indice < 0) {
    indice = li.length - 1
  } else if (indice >= li.length) {
    indice = 0
  }

  li.forEach((cadaLi) => cadaLi.classList.remove("activo"))
  bloque.forEach((cadaBloque, index) => {
    cadaBloque.classList.remove("activo")
    cadaBloque.setAttribute("aria-hidden", index !== indice)
    cadaBloque.classList.add("oculto")
  })

  li[indice].classList.add("activo")
  bloque[indice].classList.add("activo")
  bloque[indice].classList.remove("oculto")

  tabActivo = indice
}

// Función para detener confetti
function stopConfetti() {
  if (typeof confetti !== "undefined" && confetti.stop) {
    confetti.stop()
  }
}

// Event Listeners

// Botones de reset
reset.addEventListener("click", () => {
  j1.reset()
  j2.reset()
  resetDigital()
  chicos1 = 0;
  chicos2 = 0;
  actualizarChicos();
  ocultarIndicadorChico()
})

// Modal
btnClose.addEventListener("click", () => {
  modal.close()
  stopConfetti()
  j1.reset()
  j2.reset()
  resetDigital()
})

// Contador digital
incrementar.addEventListener("click", () => {
  count++
  if (count >= 30) {
    count = 30
    onGanarChico("j1")
    count = 0
    count1 = 0
    display.textContent = "0"
    display1.textContent = "0"
  } else {
    display.textContent = count
  }
})

decrementar.addEventListener("click", () => {
  count = actualizarContador(count)
  display.textContent = count
})

incrementar2.addEventListener("click", () => {
  count1++
  if (count1 >= 30) {
    count1 = 30
    onGanarChico("j2")
    count = 0
    count1 = 0
    display.textContent = "0"
    display1.textContent = "0"
  } else {
    display1.textContent = count1
  }
})

decrementar2.addEventListener("click", () => {
  count1 = actualizarContador(count1)
  display1.textContent = count1
})

// Tabs
li.forEach((cadaLi, i) => {
  cadaLi.addEventListener("click", () => {
    mostrarTab(i)
  })
})

// Eventos de teclado
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    mostrarTab(tabActivo + 1)
  } else if (event.key === "ArrowLeft") {
    mostrarTab(tabActivo - 1)
  }
})

// Inicialización
mostrarTab(tabActivo)
actualizarChicos()

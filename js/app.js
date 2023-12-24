import { Contador } from "./contador.js"

const j1 = new Contador('Nosotros', document.getElementById('jugador1'))
const j2 = new Contador('Ellos', document.getElementById('jugador2'))


const reset = document.getElementById('reset')

reset.addEventListener('click', () => {
  j1.reset()
  j2.reset()
  resetDigital()
})


// TABS

const li = document.querySelectorAll('.li')
const bloque = document.querySelectorAll('.bloque')

li.forEach((cadaLi, i) => {

  li[i].addEventListener('click', () => {
    li.forEach((cadaLi, i) => {
      li[i].classList.remove('activo')
      bloque[i].classList.remove('activo')

    })

    li[i].classList.add('activo')
    bloque[i].classList.add('activo')

  })
})


// CONTADOR DIGITAL

const display = document.querySelector('.display')
const incrementar = document.querySelector('.incrementar')
const decrementar = document.querySelector('.decrementar')

const display1 = document.querySelector('.display1')
const incrementar2 = document.querySelector('.incrementar2')
const decrementar2 = document.querySelector('.decrementar2')

let count = 0;
let count1 = 0

incrementar.addEventListener('click', () => {
  if (count >= 0 && count < 30) {
    count++
    display.textContent = `${count}`
  }
})
decrementar.addEventListener('click', () => {
  if (count > 0 && count <= 30) {
    count--
    display.textContent = `${count}`
  }
})

incrementar2.addEventListener('click', () => {
  if (count1 >= 0 && count1 < 30) {
    count1++
    display1.textContent = `${count1}`
  }
})
decrementar2.addEventListener('click', () => {
  if (count1 > 0 && count1 <= 30) {
    count1--
    display1.textContent = `${count1}`
  }
})

function resetDigital() {
  display.textContent = 0
  count = 0
  display1.textContent = 0
  count1 = 0
}

import './style/style.scss'

function debounce(fn) {
  let timeout
  return function (...arg) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arg)
    }, 0)
  }
}

function changeClass(page, removed, added) {
  page.classList.remove(removed)
  page.classList.add(added)
}

function rollUp() {
  const prev = document.querySelector('.prev')
  const active = document.querySelector('.active')
  const next = document.querySelector('.next')

  next.classList.add('hidden')
  setTimeout(() => {
    next.classList.remove('hidden')
  }, 500)

  changeClass(prev, 'prev', 'active')
  changeClass(active, 'active', 'next')
  changeClass(next, 'next', 'prev')
}

function rollDown() {
  const prev = document.querySelector('.prev')
  const active = document.querySelector('.active')
  const next = document.querySelector('.next')

  prev.classList.add('hidden')
  setTimeout(() => {
    prev.classList.remove('hidden')
  }, 500)

  changeClass(next, 'next', 'active')
  changeClass(active, 'active', 'prev')
  changeClass(prev, 'prev', 'next')
}

const upBtns = document.querySelectorAll('.up-btn')
const downBtns = document.querySelectorAll('.down-btn')

upBtns.forEach((btn) => {
  btn.addEventListener('click', rollUp)
})
downBtns.forEach((btn) => {
  btn.addEventListener('click', rollDown)
})

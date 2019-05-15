import './style/style.scss'
import './style/font/iconfont.css'

// 防止输入框弹出改变页面大小
window.onload = function () {
  document.body.style.height = `${window.screen.availHeight}px`
}

// 页面滚动切换
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

// 搜索栏的弹出和隐藏
const drop = document.querySelector('#drop')
const dropIcon = drop.querySelector('span')
const searchWrap = document.querySelector('.search-wrap')
let isDroped = false

function dropSearch() {
  if (isDroped) {
    searchWrap.classList.remove('drop-out')
    dropIcon.classList.remove('icon-doubleleft')
    dropIcon.classList.add('icon-doubleright')
    isDroped = !isDroped
  } else {
    searchWrap.classList.add('drop-out')
    dropIcon.classList.remove('icon-doubleright')
    dropIcon.classList.add('icon-doubleleft')
    isDroped = !isDroped
  }
}

drop.addEventListener('click', dropSearch)

// 搜索框进行请求
function debounce(fn, wait) {
  let timeout
  return function (...arg) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arg)
    }, wait)
  }
}

function searching() {
  const keywords = this.value
  fetch(`/search?keywords=${keywords}`)
    .then(data => data.json())
    .then(res => console.log(res))
    .catch((e) => {
      console.log(e)
    })
}

const search = document.querySelector('#search')
search.addEventListener('input', debounce(searching, 500))

// 标题的影子效果
const firstPage = document.querySelector('#vanilla')
const tit = document.querySelector('#vanilla>.tit')
const WALK = 200

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = firstPage
  const { pageX: x, pageY: y } = e.targetTouches[0]

  const xWalk = Math.round((x / width * WALK) - (WALK / 2))
  const yWalk = Math.round((y / height * WALK) - (WALK / 2))

  tit.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(0, 255, 0, 0.7)`
}

firstPage.addEventListener('touchmove', shadow)
firstPage.addEventListener('touchend', () => {
  tit.style.textShadow = 'rgba(0, 255, 0, 0.7) -5px -5px 0'
})

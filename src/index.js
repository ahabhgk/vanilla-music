/* eslint-disable prefer-arrow-callback */
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

// 在歌单中删除音乐
function deleteMusic(e) {
  this.removeChild(e.target.parentElement.parentElement)
}

// 在歌单中播放音乐
async function playMusic(e) {
  const { id } = e.target.parentElement.parentElement.dataset
  const data = await fetch(`/song/url?id=${id}`).then(res => res.json())
  console.log(data)
}

// 从搜索结果中添加音乐
const listMain = document.querySelector('.list-main')

function addMusic(e) {
  const { id, name, singer } = e.target.parentElement.parentElement.dataset
  listMain.innerHTML += `
    <div class="song" data-id="${id}">
      <div>
        <span class="song-name">${name}</span>
        <span class="song-singer">${singer}</span>
      </div>
      <button class="song-btn play-btn"><span class="iconfont icon-right"></span></button>
      <button class="song-btn delete-btn"><span class="iconfont icon-minus"></span></button>
    </div>`
}

// 从搜索结果中添加并播放音乐
function addAndPlayMusic(e) {
  addMusic(e)
  playMusic(e)
}

// 搜索框进行搜索音乐
const search = document.querySelector('#search')
const searchMain = document.querySelector('.search-main')

function debounce(fn, wait) { // 防抖 util
  let timeout
  return function (...arg) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arg)
    }, wait)
  }
}

async function searching() {
  const keywords = this.value
  try {
    const data = await fetch(`/search?keywords=${keywords}`).then(res => res.json())
    const html = data.result.songs.map(song => `
      <div class="song" data-id="${song.id}" data-name="${song.name}" data-singer="${song.artists[0].name}">
        <div>
          <span class="song-name">${song.name}</span>
          <span class="song-singer">${song.artists[0].name}</span>
        </div>
        <button class="song-btn add-and-play-btn"><span class="iconfont icon-right"></span></button>
        <button class="song-btn add-btn"><span class="iconfont icon-plus"></span></button>
      </div>`)
    searchMain.innerHTML = html
  } catch (err) {
    if (!keywords) return

    searchMain.innerHTML = `
      <div class="search-failed">
        <span class="iconfont icon-disconnect"></span>
        <span>搜索失败，请尝试重新搜索...😥</span>
      </div>
    `
  }
}

search.addEventListener('input', debounce(searching, 300))

// 对搜索结果中添加音乐、添加并播放音乐进行事件委托
searchMain.addEventListener('touchstart', function (e) {
  if (e.target.parentElement.classList.contains('add-and-play-btn')) {
    addAndPlayMusic(e)
  } else if (e.target.parentElement.classList.contains('add-btn')) {
    addMusic(e)
  }
})

// 对歌单中的播放音乐、删除音乐进行事件委托
listMain.addEventListener('touchstart', function (e) {
  if (e.target.parentElement.classList.contains('play-btn')) {
    playMusic(e)
  } else if (e.target.parentElement.classList.contains('delete-btn')) {
    deleteMusic.call(this, e)
  }
})

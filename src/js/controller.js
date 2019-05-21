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

function restoreShadow() {
  tit.style.textShadow = 'rgba(0, 255, 0, 0.7) -5px -5px 0'
}


// 搜索框进行搜索音乐
const api = 'https://v1.itooi.cn/tencent'
const searchMain = document.querySelector('.search-main')

function debounce(fn, wait) { // 防抖
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
    const res = await fetch(`${api}/search?keyword=${keywords}&type=song`).then(res => res.json())
    const html = res.data.list.map(song => `
      <div class="song" data-id="${song.songmid}" data-name="${song.songname}" data-singer="${song.singer[0].name}">
        <div>
          <span class="song-name">${song.songname}</span>
          <span class="song-singer">${song.singer[0].name}</span>
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
      </div>`
  }
}


export default {
  rollUp,
  rollDown,
  dropSearch,
  shadow,
  restoreShadow,
  debouncedSearch: debounce(searching, 300),
}

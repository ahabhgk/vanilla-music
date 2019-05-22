// 开始时的准备（serviceWorker，高度适配，页面切换效果）
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js')
    } catch (err) {
      console.log(`SW registration failed: ${err}`)
    }
  }
}

function ready() {
  document.body.style.height = `${document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight}px`
  document.querySelectorAll('.page').forEach(page => page.style.transition = 'all 1s')
  registerSW()
}


// 页面切换模式
const container = document.querySelector('.container')

function toggleMode() {
  const isDayMode = container.classList.contains('day')

  this.classList.toggle('night-mode')

  if (isDayMode) {
    container.classList.remove('day')
    container.classList.add('night')
  } else {
    container.classList.remove('night')
    container.classList.add('day')
  }
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

  tit.style.textShadow = `${xWalk}px ${yWalk}px 0 #f19994`
}

function restoreShadow() {
  tit.style.textShadow = '#1296db -5px -5px 0'
}


// 搜索框进行搜索音乐
const api = 'https://music.niubishanshan.top/api/v2/music'
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
    const res = await fetch(`${api}/search/${keywords}/0/20`).then(res => res.json())
    const html = res.data.songList.map(song => `
        <div class="song" data-mid="${song.songMid}" data-name="${song.songName}" data-singer="${song.singer[0].singerName}" data-albummid="${song.albumMid}" data-singermid="${song.singer[0].singerMid}" data-songid="${song.songId}">
          <div>
            <span class="song-name">${song.songName}</span>
            <span class="song-singer">${song.singer[0].singerName}</span>
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


// 在歌单中删除音乐
const player = document.querySelector('h-audio')
const listMain = document.querySelector('.list-main')

function deleteMusic(e) {
  const removed = this.removeChild(e.target.parentElement.parentElement)

  player.musicList.deleteMusic(removed.dataset.id)
}

// 在歌单中播放音乐
function playMusic(e) {
  const { id } = e.target.parentElement.parentElement.dataset

  player.playMusic(id)
}

// 从搜索结果中添加音乐
async function addMusic(e) {
  const {
    mid, name, singer, albummid, singermid, songid,
  } = e.target.parentElement.parentElement.dataset

  try {
    const url = await fetch(`${api}/songUrllist/${mid}`).then(res => res.json()).then(json => json.data[0])
    const pic = await fetch(`${api}/albumImg/${albummid}/${singermid}`).then(res => res.json()).then(json => json.data.albumImgUrl)
    const lrc = await fetch(`${api}/lrc/${songid}`).then(res => res.json()).then(json => json.data.lyric)

    listMain.innerHTML += `
      <div class="song" data-id="${mid}">
        <div>
          <span class="song-name">${name}</span>
          <span class="song-singer">${singer}</span>
        </div>
        <button class="song-btn play-btn"><span class="iconfont icon-right"></span></button>
        <button class="song-btn delete-btn"><span class="iconfont icon-minus"></span></button>
      </div>`

    player.musicList.addMusic({
      mid, name, singer, url, pic, lrc,
    })
  } catch (err) {
    console.log(err)
  }
}

// 从搜索结果中添加并播放音乐
async function addAndPlayMusic(e) {
  await addMusic(e)
  playMusic(e)
}


export default {
  ready,
  toggleMode,
  rollUp,
  rollDown,
  dropSearch,
  shadow,
  restoreShadow,
  debouncedSearch: debounce(searching, 300),
  deleteMusic,
  addMusic,
  addAndPlayMusic,
  playMusic,
}

import './style/style.scss'
import './style/font/iconfont.css'
import MusicController from './musicList.js'
import AudioComponent from './audio.js'
import Util from './controller.js'

customElements.define('h-audio', AudioComponent)

// 防止输入框弹出改变页面大小
window.onload = function () {
  document.body.style.height = `${window.screen.availHeight}px`
}


// 页面滚动切换
const upBtns = document.querySelectorAll('.up-btn')
const downBtns = document.querySelectorAll('.down-btn')

upBtns.forEach((btn) => {
  btn.addEventListener('touchstart', Util.rollUp)
})
downBtns.forEach((btn) => {
  btn.addEventListener('touchstart', Util.rollDown)
})


// 搜索栏的弹出和隐藏
const drop = document.querySelector('#drop')

drop.addEventListener('touchstart', Util.dropSearch)

// 标题的影子效果
const firstPage = document.querySelector('#vanilla')

firstPage.addEventListener('touchmove', Util.shadow)
firstPage.addEventListener('touchend', Util.restoreShadow)


// 操作 MusicList
const player = document.querySelector('h-audio')
const search = document.querySelector('#search')
const searchMain = document.querySelector('.search-main')
const listMain = document.querySelector('.list-main')
const musicController = new MusicController(player)

search.addEventListener('input', Util.debouncedSearch)


// api
const api = 'https://v1.itooi.cn/netease'

// 在歌单中删除音乐
function deleteMusic(e) {
  const removed = this.removeChild(e.target.parentElement.parentElement)

  musicController.deleteMusic(removed.dataset.id)
}

// 在歌单中播放音乐
function playMusic(e) {
  const { id } = e.target.parentElement.parentElement.dataset

  musicController.playMusic(id)
}

// 从搜索结果中添加音乐
async function addMusic(e) {
  const { id, name, singer } = e.target.parentElement.parentElement.dataset

  const url = await fetch(`${api}/url?id=${id}&quality=flac&isRedirect=0`).then(res => res.json()).then(json => json.data)
  const pic = await fetch(`${api}/pic?id=${id}&isRedirect=0`).then(res => res.json()).then(json => json.data)
  const lyrics = await fetch(`${api}/lrc?id=${id}`).then(res => res.text())

  listMain.innerHTML += `
    <div class="song" data-id="${id}">
      <div>
        <span class="song-name">${name}</span>
        <span class="song-singer">${singer}</span>
      </div>
      <button class="song-btn play-btn"><span class="iconfont icon-right"></span></button>
      <button class="song-btn delete-btn"><span class="iconfont icon-minus"></span></button>
    </div>`

  musicController.addMusic({
    id, name, singer, url, pic, lyrics,
  })
}

// 从搜索结果中添加并播放音乐
async function addAndPlayMusic(e) {
  await addMusic(e)
  playMusic(e)
}


// 对搜索结果中添加音乐、添加并播放音乐进行事件委托
searchMain.addEventListener('touchstart', (e) => {
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

import AudioComponent from './audio.js'
import Util from './controller.js'

// 注册 audio 组件
customElements.define('h-audio', AudioComponent)


// 防止输入框弹出改变页面大小
window.addEventListener('load', Util.ready)


// 模式的切换
const toggle = document.querySelector('.toggle')

toggle.addEventListener('touchstart', Util.toggleMode)


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


// 操作 MusicList
const search = document.querySelector('#search')
const searchMain = document.querySelector('.search-main')
const listMain = document.querySelector('.list-main')

search.addEventListener('input', Util.debouncedSearch)

searchMain.addEventListener('touchmove', (e) => {
  e.stopPropagation()
})


// 对搜索结果中添加音乐、添加并播放音乐进行事件委托
searchMain.addEventListener('touchstart', (e) => {
  if (e.target.parentElement.classList.contains('add-and-play-btn')) {
    Util.addAndPlayMusic(e)
  } else if (e.target.parentElement.classList.contains('add-btn')) {
    Util.addMusic(e)
  }
})


// 对歌单中的播放音乐、删除音乐进行事件委托
listMain.addEventListener('touchstart', function (e) {
  if (e.target.parentElement.classList.contains('play-btn')) {
    console.log(e)
    Util.playMusic(e)
  } else if (e.target.parentElement.classList.contains('delete-btn')) {
    Util.deleteMusic.call(this, e)
  }
})

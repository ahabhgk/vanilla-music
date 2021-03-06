import MusicList from './musicList.js'

export default class AudioComponent extends HTMLElement {
  constructor() {
    super()

    // 播放列表
    this.musicList = new MusicList()
    this.index = 0

    this.audio = document.createElement('audio')
    this.songTit = document.createElement('div')
    this.songSinger = document.createElement('span')
    this.songBg = document.createElement('div')
    this.lyrics = document.createElement('div')
    this.lyrics.startX = 0
    this.lyrics.startY = 0
    this.progress = document.createElement('div')
    this.dot = document.createElement('div')
    this.dot.isDroping = false
  }

  // 更新进度条
  updateProgress() {
    const len = this.progress.offsetWidth
    const rate = this.audio.currentTime / this.audio.duration
    const offset = rate * len
    this.dot.style.transform = `translate(${offset - 19}px, 0)`
  }

  // 更新歌词
  updateLyric() {
    let activeLyric

    Array.from(this.lyrics.children).forEach((lrc) => {
      lrc.classList.remove('activeLyric')
      const isThisLrc = (Math.round(parseFloat(lrc.dataset.time, 10)) - Math.round(this.audio.currentTime)) <= 0.2
      if (isThisLrc) {
        activeLyric = lrc
      }
    })

    const offset = this.lyrics.parentElement.offsetHeight / 2 - activeLyric.offsetTop - activeLyric.offsetHeight / 2
    this.lyrics.style.transform = `translate(0, ${offset}px)`
    activeLyric.classList.add('activeLyric')
  }

  // 暂停播放
  changePlayingStatus() {
    if (this.audio.paused) {
      this.audio.play()
    } else {
      this.audio.pause()
    }
  }

  // 切歌
  handleSlide(e) {
    switch (e.type) {
    case 'touchstart':
      this.lyrics.startX = e.targetTouches[0].pageX
      this.lyrics.startY = e.targetTouches[0].pageY
      break
    case 'touchmove':
      e.stopPropagation()
      break
    case 'touchend':
      const spanX = e.changedTouches[0].pageX - this.lyrics.startX
      const spanY = e.changedTouches[0].pageY - this.lyrics.startY

      if (Math.abs(spanX) > Math.abs(spanY)) {
        if (spanX > 60) {
          this.playPrev()
        } else if (spanX < -60) {
          this.playNext()
        }
      }
      break
    }
  }

  // 更改组件属性，进行音乐播放
  play() {
    const {
      name, singer, url, pic, lrc,
    } = this.musicList[this.index]

    this.setAttribute('playing-name', name)
    this.setAttribute('playing-singer', singer)
    this.setAttribute('playing-url', url)
    this.setAttribute('playing-pic', pic)
    this.setAttribute('playing-lrc', lrc)
  }

  // 根据 id 播放音乐
  playMusic(mid) {
    this.index = this.musicList.findMusicIndexByMid(mid)
    this.play()
  }

  // 下一首
  playNext() {
    (++this.index >= this.musicList.length) && (this.index = 0)
    this.play()
  }

  // 上一首
  playPrev() {
    (--this.index < 0) && (this.index = this.musicList.length - 1)
    this.play()
  }

  // 渲染组件，用于 connectedCallback
  render() {
    const shadow = this.attachShadow({ mode: 'open' })

    this.songTit.innerText = this.getAttribute('playing-name')
    this.songTit.classList.add('song-tit')

    this.songSinger.innerText = this.getAttribute('playing-singer')
    this.songSinger.classList.add('song-singer')

    const lyricsWrap = document.createElement('div')
    lyricsWrap.classList.add('lyrics-wrap')
    this.songBg.innerText = 'VANILLA MUSIC'
    this.songBg.classList.add('song-bg')
    this.lyrics.classList.add('lyrics')
    lyricsWrap.appendChild(this.songBg)
    lyricsWrap.appendChild(this.lyrics)

    this.progress.classList.add('progress')
    this.dot.classList.add('dot')
    this.progress.appendChild(this.dot)

    const wraper = document.createElement('div')
    wraper.classList.add('player-main')
    wraper.appendChild(this.songTit)
    wraper.appendChild(this.songSinger)
    wraper.appendChild(lyricsWrap)
    wraper.appendChild(this.progress)

    const style = document.createElement('style')
    style.textContent = `
      .player-main {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
      .song-tit {
        display: inline-block;
        text-align: center;
        width: 90vw;
        font-size: 8vw;
        transform: translate(0, -6vw);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .song-singer {
        display: inline-block;
        text-align: center;
        width: 90vw;
        transform: translate(0, -7vw);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lyrics-wrap {
        width: 70vw;
        height: 80%;
        background: transparent;
        transform: translate(0, -5vw);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
        position: relative;
        overflow: hidden;
      }
      .song-bg {
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 15vw;
        filter: blur(4px);
        z-index: 1;
      }
      .lyrics {
        width: 100%;
        position: absolute;
        top: 0;
        transform: translate(0, 0);
        transition: all 1s;
      }
      .lyric {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        font-size: 16px;
        padding: 3vw 0;
        transition: all 1s;
      }
      .activeLyric {
        color: #d90000;
        font-weight: bold;
        transform: scale(1.3);
      }
      .progress {
        position: relative;
        width: 70vw;
        height: 4px;
        border-radius: 2px;
        background: #1296db;
        transform: translate(0, 5vw);
      }
      .dot {
        background-image: url(./src/img/dot-day.png);
        background-size: cover;
        width: 38px;
        height: 38px;
        position: absolute;
        top: -19px;
        transform: translate(-19px, 0);
        z-index: 1;
      }`

    shadow.appendChild(wraper)
    shadow.appendChild(style)
  }

  // 绑定事件
  bindEvent() {
    // 音乐播放
    this.audio.addEventListener('canplay', function () {
      this.play()
    })
    // 播放结束后播放下一首
    this.audio.addEventListener('ended', () => {
      this.playNext()
    })

    // 播放时首页标题动画切换
    this.audio.addEventListener('playing', () => {
      const tit = document.querySelector('.tit')

      tit.classList.add('tit-playing')
    })

    // 暂停时首页标题动画切换
    this.audio.addEventListener('pause', () => {
      const tit = document.querySelector('.tit')

      tit.classList.remove('tit-playing')
    })

    // 播放暂停
    const lyricsWrap = this.lyrics.parentElement
    lyricsWrap.addEventListener('touchstart', this.changePlayingStatus.bind(this))

    // 切歌
    lyricsWrap.addEventListener('touchstart', this.handleSlide.bind(this))
    lyricsWrap.addEventListener('touchmove', this.handleSlide.bind(this))
    lyricsWrap.addEventListener('touchend', this.handleSlide.bind(this))

    // 音乐播放时进度条和歌词的更新
    this.audio.addEventListener('timeupdate', this.updateProgress.bind(this))
    this.audio.addEventListener('timeupdate', this.updateLyric.bind(this))

    // 进度条拖动
    this.dot.addEventListener('touchstart', function () {
      this.isDroping = true
    })
    this.dot.addEventListener('touchmove', (e) => {
      e.stopPropagation()

      if (!this.dot.isDroping) return

      const len = this.progress.offsetWidth
      const left = e.targetTouches[0].pageX - this.progress.getBoundingClientRect().left + document.body.scrollLeft
      const rate = left / len
      if (rate <= 1 && rate >= 0) {
        const offset = rate * len
        const time = rate * this.audio.duration
        this.audio.currentTime = time
        this.dot.style.transform = `translate(${offset - 19}px, 0)`
      }
    })
    this.dot.addEventListener('touchend', function () {
      this.isDroping = false
    })
  }

  connectedCallback() {
    this.render()
    this.bindEvent()
  }

  static get observedAttributes() { return ['playing-name', 'playing-singer', 'playing-url', 'playing-pic', 'playing-lrc'] }

  // 属性改变时组件相应的改变
  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
    case 'playing-name':
      this.songTit.innerText = newVal
      break
    case 'playing-singer':
      this.songSinger.innerText = newVal
      break
    case 'playing-url':
      this.audio.src = newVal
      break
    case 'playing-pic':
      this.songBg.style.background = `url(${newVal}) center/cover no-repeat`
      this.songBg.innerText = ''
      break
    case 'playing-lrc':
      try {
        this.lyrics.innerHTML = newVal.split('[换行]')
          .filter(lyric => lyric.split(']')[1] !== '')
          .map(lyric => lyric.match(/\[(\d{2}):(\d{2}.\d{2})\](.+)/))
          .map(lrc => `<div class="lyric" data-time="${parseInt(lrc[1], 10) * 60 + parseFloat(lrc[2], 10)}">${lrc[3]}</div>`)
          .join('')
      } catch {
        this.lyrics.parentElement.innerText = 'VANILLA MUSIC'
      }
      break
    }
  }
}

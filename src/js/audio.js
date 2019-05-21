import MusicList from './musicList.js'

export default class AudioComponent extends HTMLElement {
  constructor() {
    super()

    this.musicList = new MusicList()
    this.index = 0

    this.audio = document.createElement('audio')
    this.songTit = document.createElement('div')
    this.songSinger = document.createElement('span')
    this.songBg = document.createElement('div')
    this.lyrics = document.createElement('div')
    this.progress = document.createElement('div')
    this.dot = document.createElement('div')
    this.dot.isDroping = false
  }

  updateProgress() {
    if (this.dot.isDroping) return

    const len = this.progress.offsetWidth
    const rate = this.audio.currentTime / this.audio.duration
    const offset = rate * len
    this.dot.style.transform = `translate(${offset - 19}px, 0)`
  }

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

  playMusic(id) {
    this.index = this.musicList.findMusicIndexById(id)
    this.play()
  }

  playNext() {
    (++this.index >= this.musicList.length) && (this.index = 0)
    this.play()
  }

  playPrev() {
    (--this.index < 0) && (this.index = this.musicList.length - 1)
    this.play()
  }

  render() {
    const shadow = this.attachShadow({ mode: 'open' })

    this.songTit.innerText = this.getAttribute('playing-name')
    this.songTit.classList.add('song-tit')

    this.songSinger.innerText = this.getAttribute('playing-singer')
    this.songSinger.classList.add('song-singer')

    const lyricsWrap = document.createElement('div')
    lyricsWrap.classList.add('lyrics-wrap')
    this.songBg.innerText = 'Vanilla Music'
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
        font-size: 8vw;
        transform: translate(0, -6vw);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .song-singer {
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
      }
      .song-bg {
        text-align: center;
        color: rgba(0, 103, 220, 0.7);
        text-shadow: rgba(0, 255, 0, 0.7) -5px -5px 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 20vw;
        filter: blur(4px);
        z-index: 1;
      }
      .lyrics {
        width: 100%;
        height: 500px;
        position: absolute;
        top: 0;
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
        background: url(./src/img/dot.png) no-repeat;
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

  bindEvent() {
    this.audio.addEventListener('canplay', function () {
      this.play()
    })
    this.audio.addEventListener('ended', () => {
      this.playNext()
    })
    this.audio.addEventListener('timeupdate', this.updateProgress.bind(this))
    this.dot.addEventListener('touchstart', function () {
      this.isDroping = true
    })
    this.dot.addEventListener('touchmove', (e) => {
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

  static get observedAttributes() { return ['playing-name', 'playing-singer', 'playing-url', 'playing-pic', 'playing-lyrics'] }

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
    case 'playing-name':
      this.songTit.innerText = newVal
      break
    case 'playing-singer':
      this.songSinger.innerText = newVal
      break
    case 'playing-url':
      try {
        this.audio.src = newVal
      } catch (err) {
        console.log(err)
      }
      break
    case 'playing-pic':
      try {
        this.songBg.style.background = `url(${newVal}) center/cover no-repeat`
        this.songBg.innerText = ''
      } catch (err) {
        console.log(err)
      }
      break
    case 'playing-lrc':
      console.log(newVal)
      this.lyrics.innerHTML = `${newVal}`
      break
    }
  }
}

import dot from './image/dot.png'

export default class AudioComponent extends HTMLElement {
  constructor() {
    super()

    this.playingUrl = this.getAttribute('playing-url')
    this.playingSong = this.getAttribute('playing-song')
    this.playingSinger = this.getAttribute('playing-singer')
    this.playingPic = this.getAttribute('playing-pic')
    this.playingLyrics = this.getAttribute('playing-lyrics')

    this.audio = document.createElement('audio')
    this.songTit = document.createElement('div')
    this.songSinger = document.createElement('span')
    this.songBg = document.createElement('div')
    this.lyrics = document.createElement('div')
    this.dot = document.createElement('div')
  }

  updateProgress() {

  }

  render() {
    const shadow = this.attachShadow({ mode: 'open' })

    this.songTit.innerText = this.playingSong
    this.songTit.classList.add('song-tit')

    this.songSinger.innerText = this.playingSinger
    this.songSinger.classList.add('song-singer')

    const lyricsWrap = document.createElement('div')
    lyricsWrap.classList.add('lyrics-wrap')
    this.songBg.innerText = 'Vanilla Music'
    this.songBg.classList.add('song-bg')
    this.lyrics.classList.add('lyrics')
    lyricsWrap.appendChild(this.songBg)
    lyricsWrap.appendChild(this.lyrics)

    const progress = document.createElement('div')
    progress.classList.add('progress')
    this.dot.classList.add('dot')
    progress.appendChild(this.dot)

    const wraper = document.createElement('div')
    wraper.classList.add('player-main')
    wraper.appendChild(this.songTit)
    wraper.appendChild(this.songSinger)
    wraper.appendChild(lyricsWrap)
    wraper.appendChild(progress)

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
      }
      .song-singer {
        transform: translate(0, -7vw);
      }
      .lyrics-wrap {
        width: 70vw;
        height: 85%;
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
        background: #1296db;
        transform: translate(0, 5vw);
      }

      .dot {
        background: url(${dot}) no-repeat;
        background-size: cover;
        width: 38px;
        height: 38px;
        position: absolute;
        top: -19px;
        left: 0%;
        transform: translate(-19px, 0);
        z-index: 1;
      }`

    shadow.appendChild(wraper)
    shadow.appendChild(style)
  }

  bindEvent() {

  }

  connectedCallback() {
    this.render()
    this.bindEvent()
  }
}

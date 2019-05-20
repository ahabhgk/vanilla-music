export default class MusicController extends Array {
  constructor() {
    super()
  }

  findMusicIndexById(musicId) {
    let index
    this.forEach((music, i) => {
      if (music.id === musicId) {
        index = i
      }
    })
    return index
  }

  async addMusic(musicData) {
    this.push(musicData)
  }

  deleteMusic(musicId) {
    const index = this.findMusicIndexById(musicId)
    this.splice(index, 1)
  }

  // play() {
  //   const {
  //     name, singer, url, pic, lyrics,
  //   } = this[this.index]
  //   this.player.setAttribute('playing-name', name)
  //   this.player.setAttribute('playing-singer', singer)
  //   this.player.setAttribute('playing-url', url)
  //   this.player.setAttribute('playing-pic', pic)
  //   this.player.setAttribute('playing-lyrics', lyrics)
  // }

  // playMusic(musicId) {
  //   this.index = this.findMusicIndexById(musicId)
  //   this.play()
  // }

  // playNext() {
  //   this.index += 1
  //   this.play()
  // }

  // playPrev() {
  //   this.index -= 1
  //   this.play()
  // }
}

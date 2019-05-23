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
}

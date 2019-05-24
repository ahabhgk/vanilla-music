export default class MusicList extends Array {
  constructor() {
    super()
  }

  findMusicIndexByMid(musicMid) {
    let index
    this.forEach((music, i) => {
      console.log(music)
      if (music.mid === musicMid) {
        index = i
      }
    })
    return index
  }

  async addMusic(musicData) {
    this.push(musicData)
    console.log(this)
  }

  deleteMusic(musicMid) {
    const index = this.findMusicIndexByMid(musicMid)
    this.splice(index, 1)
    console.log(this)
  }
}

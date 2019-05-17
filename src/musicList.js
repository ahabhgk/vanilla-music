export default class MusicList extends Map {
  constructor() {
    super()
  }

  async addMusic(musicId, musicData) {
    const urlData = await fetch(`/api/song/url?id=${musicId}`).then(res => res.json())
    const picData = await fetch(`/api/song/detail?ids=${musicId}`).then(res => res.json())
    const url = urlData.data[0]
    const pic = picData.songs[0].al.picUrl
    this.set(musicId, { ...musicData, url, pic })
  }

  deleteMusic(musicId) {
    this.delete(musicId)
  }

  playMusic(musicId) {
    return this.get(musicId)
  }
}

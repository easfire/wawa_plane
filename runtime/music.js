let instance

export default class Music
{
  constructor(){
    if(instance){
      return instance;
    }

    instance = this;

    this.bgmAudio = new Audio();
    this.bgmAudio.loop = true;
    this.bgmAudio.src = 'audio/xhlf.mp3';
    // this.bgmAudio.src = "https://m10.music.126.net/20180809180235/3cf13d3601481b01ed30443c6be32740/ymusic/20b6/9353/1b14/1dc83412677b7b8e0e01e04ef7935722.mp3";
    this.playBgm();
  }

  playBgm()
  {
    this.bgmAudio.play();
  }

}
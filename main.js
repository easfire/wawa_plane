import Player from 'player';
import DataBus from 'databus';
import BackGround from 'background';
import Music from 'runtime/music'

let context = canvas.getContext('2d');
let databus = new DataBus();

export default class Main
{
  constructor(){
    this.aniId = 0;

    this.start();
  }
  
  start(){
    databus.reset();
    canvas.removeEventListener(
      'touchstart', 
      this.touchHandler
    );

    this.player = new Player(context);
    this.bg = new BackGround(context);
    this.music = new Music();

    this.bindLoop = this.loop.bind(this);

    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
        this.bindLoop,
        canvas
    );

  }

  // 实现游戏帧循环
  loop(){
    databus.frame++;

    this.update();
    this.render();

    this.aniId = window.requestAnimationFrame(
      this.bindLoop, 
      canvas
    );
  }

  update(){
    if(databus.gameOver){
      return;
    }

    this.bg.update();

  }

  render(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.bg.render(context);

    this.player.drawToCanvas(context);
  }

  // start(){
  //   context.fillStyle = 'red';
  //   context.fillRect(100, 100, 300, 200);

  //   var image = wx.createImage();
  //   image.onload = function () {
  //     console.log(image.width, image.height);
  //     context.drawImage(image, 150, 150);
  //   }
  //   image.src = PLAYER_IMG_SRC;
  // }
  
}




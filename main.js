import Player from 'player';
import Enemy from 'enemy';
import DataBus from 'databus';
import BackGround from 'background';
import GameInfo from 'gameinfo';
import Music from 'runtime/music';

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
    this.gameinfo = new GameInfo();
    this.music = new Music();

    this.bindLoop = this.loop.bind(this);
    this.hasEventBind = false;

    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
        this.bindLoop,
        canvas
    );

  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
      if (databus.frame % 30 === 0) {
          let enemy = databus.pool.getItemByClass('enemy', Enemy);
          enemy.init(4);
          databus.enemys.push(enemy);
      }
  }

  // 全局碰撞检测
  collisionDetection() {
      let that = this

      databus.bullets.forEach((bullet) => {
          for (let i = 0, il = databus.enemys.length; i < il; i++) {
          let enemy = databus.enemys[i];

          if (!enemy.isPlaying && enemy.isCollideWith(bullet)) {
              enemy.playAnimation();
              that.music.playExplosion();

              bullet.visible = false;
              databus.score += 1;

              break
          }
      }
  });

      for (let i = 0, il = databus.enemys.length; i < il; i++) {
          let enemy = databus.enemys[i];

          if (this.player.isCollideWith(enemy)) {
              databus.gameOver = true;

              break
          }
      }
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
      e.preventDefault();

      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      let area = this.gameinfo.btnArea;

      if (x >= area.startX
          && x <= area.endX
          && y >= area.startY
          && y <= area.endY)
          this.start();
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

      databus.bullets
          .concat(databus.enemys)
          .forEach((item) => {
          item.update()
  });

      this.enemyGenerate();

      this.collisionDetection();

      if (databus.frame % 20 === 0) {
          this.player.shoot();
          this.music.playShoot();
      }

  }

  render(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.bg.render(context);

    this.player.drawToCanvas(context);

    databus.bullets.concat(databus.enemys).forEach(
        (item) => {
          item.drawToCanvas(context)
    });

    this.player.drawToCanvas(context);

    databus.animations.forEach((ani) => {
      if(ani.isPlaying){
        ani.aniRender(context);
      }
    });

      this.gameinfo.renderGameScore(context, databus.score);

      if(databus.gameOver){
        this.gameinfo.renderGameOver(context, databus.score);

        if(!this.hasEventBind){
          this.hasEventBind = true;
          this.touchHandler = this.touchEventHandler.bind(this);
          canvas.addEventListener('touchstart', this.touchHandler);
        }
      }

  }

  
}




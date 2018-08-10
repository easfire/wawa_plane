import Sprite from 'base/sprite';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const PLAYER_IMG_SRC = 'images/wawa_go_sim.png';
const PLAYER_WIDTH = 120;
const PLAYER_HEIGHT = 120;

export default class Player extends Sprite
{
  constructor(){
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT);

    this.x = screenWidth / 2 - this.width / 2;
    this.y = screenHeight / 2 - this.height / 2;

    this.touched = false;

    this.initEvent();
  }  

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if(this.checkIsFingerOnAir(x, y)){
        this.touched = true;

        this.setAirPosAcrossFingerPosZ(x, y)
      }

    }).bind(this));

    canvas.addEventListener('touchmove',((e) => {
      e.preventDefault();
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if(this.touched){
        this.setAirPosAcrossFingerPosZ(x, y);
      }
    }).bind(this));

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault();
      this.touched = false;
    }).bind(this));
  }

  // 当手指触摸屏幕的时候
  // 判断手指是否在飞机上
  checkIsFingerOnAir(x, y){
    const deviation = 30;
    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + this.width + deviation
      && y <= this.y + this.height + deviation 
    );
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y){
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if (disX < 0)
      disX = 0

    else if (disX > screenWidth - this.width)
      disX = screenWidth - this.width

    if (disY <= 0)
      disY = 0

    else if (disY > screenHeight - this.height)
      disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

}
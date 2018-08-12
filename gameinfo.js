/**
 * Created by zhangyi on 2018/8/12.
 */
const screenWidth  = window.innerWidth;
const screenHeight = window.innerHeight;

let atlas = new Image();
atlas.src = 'images/Common.png';

export default class GameInfo {
    renderGameScore(ctx, score) {
        ctx.fillStyle = "#ffffff";
        ctx.font      = "20px Arial";

        ctx.fillText(
            score,
            10,
            30
        )
    }

    renderGameOver(ctx, score) {
        ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300);

        ctx.fillStyle = "#ffffff";
        ctx.font    = "20px Arial";

        ctx.fillText(
            'GAME OVER !!',
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 50
        );

        if(score < 30){
            ctx.fillText(
                '😢😢😢😢  ' + score + '分',
                screenWidth / 2 - 40,
                screenHeight / 2 - 100 + 130
            );
        }else if(score > 30 && score < 60){
            ctx.fillText(
                'o(*￣︶￣*)o ' + score + '分咯',
                screenWidth / 2 - 40,
                screenHeight / 2 - 100 + 130
            );
        }else{
            ctx.fillText(
                '<(*￣▽￣*)/ ' + score + '分！',
                screenWidth / 2 - 40,
                screenHeight / 2 - 100 + 130
            );
        }

        ctx.drawImage(
            atlas,
            120, 6, 39, 24,
            screenWidth / 2 - 60,
            screenHeight / 2 - 100 + 180,
            120, 40
        );

        ctx.fillText(
            '重新开始',
            screenWidth / 2 - 40,
            screenHeight / 2 - 100 + 205
        );

        /**
         * 重新开始按钮区域
         * 方便简易判断按钮点击
         */
        this.btnArea = {
            startX: screenWidth / 2 - 40,
            startY: screenHeight / 2 - 100 + 180,
            endX  : screenWidth / 2  + 50,
            endY  : screenHeight / 2 - 100 + 255
        }
    }

}
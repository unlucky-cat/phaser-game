import LEVEL_CONFIG from './LEVEL_CONFIG';
import BootGame from './phaser/BootGame';
import PlayGame from './phaser/PlayGame';


var game;

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: LEVEL_CONFIG.LEVEL_WIDTH_PIXELS,
        height: LEVEL_CONFIG.LEVEL_HEIGHT_PIXELS,
        backgroundColor: 'rgb(255, 255, 255)',
        pixelArt: true,
        parent: '09ji2d0ijw',
        scene: [BootGame, PlayGame]
    };

    game = new Phaser.Game(config);
    window.focus();
    //resizeGame();
    window.addEventListener("resize", () => {

        var canvas = document.querySelector("canvas");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowRatio = windowWidth / windowHeight;
        var gameRatio = game.config.width / game.config.height;
        if(windowRatio < gameRatio){
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
        }
        else{
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    });
}








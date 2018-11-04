var config = {
    type: Phaser.AUTO,
    width: 256,
    height: 256,
    backgroundColor: 'rgb(255, 255, 255)',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('background', 'img/background.png');
}

function create ()
{
    this.add.image(128, 128, 'background');
}
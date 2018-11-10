var config = {
    type: Phaser.AUTO,
    width: 256,
    height: 256,
    backgroundColor: 'rgb(255, 255, 255)',
    pixelArt: true,
    parent: '09ji2d0ijw',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var map;
var layer;

function preload ()
{
    game.load.tilemap('default', 'tiled/default_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'img/grass_tileset_16x16.png');

    //this.load.image('background', 'img/background.png');
}

function create ()
{
    map = game.add.tilemap('default');
    map.addTilesetImage('grass', 'tileset');

    layer = map.createLayer('World1');
    layer.resizeWorld();

    //this.add.image(128, 128, 'background');
}

function update ()
{

}
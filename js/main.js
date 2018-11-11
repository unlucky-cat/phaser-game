var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 1024,
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

function preload ()
{
    preloadJSON.call(this);
}

function create ()
{

    createJSON.call(this);
}

function update ()
{

}

var preloadCSV = function() {
    this.load.image('tileset', 'img/grass_tileset_16x16.png');
    
    this.load.tilemapCSV('light', 'tiled/default_map_light.csv');
    this.load.tilemapCSV('normal', 'tiled/default_map_normal.csv');
}

var preloadJSON = function() {
    this.load.image('tileset', 'img/grass_tileset_16x16.png');
    
    this.load.tilemapTiledJSON('map', 'tiled/default_map_embedded_tileset.json');
}

var createCSV = function() {

    var map = this.make.tilemap({ key: 'light', tileWidth: 16, tileHeight: 16 });
    var map2 = this.make.tilemap({ key: 'normal', tileWidth: 16, tileHeight: 16 });

    var tileset = map.addTilesetImage('tileset', null, 16, 16);
    var tileset2 = map2.addTilesetImage('tileset', null, 16, 16);

    var layer = map.createDynamicLayer(0, tileset, 0, 0);
    var layer2 = map2.createDynamicLayer(0, tileset2, 0, 0);
}

var createJSON = function() {

    var map = this.make.tilemap({ key: 'map' });

    var tileset = map.addTilesetImage('grass', 'tileset');

    var layer1 = map.createDynamicLayer('light', tileset);
    var layer2 = map.createDynamicLayer('normal', tileset);
}
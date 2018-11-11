const LEVEL_SIZES = {
    LEVEL_WIDTH_TILES: 30,
    LEVEL_HEIGHT_TILES: 20,
    TILE_WIDTH_PIXELS: 16,
    TILE_HEIGHT_PIXELS: 16,
};

const LEVEL_CONFIG = {
    LEVEL_WIDTH_TILES: LEVEL_SIZES.LEVEL_WIDTH_TILES,
    LEVEL_HEIGHT_TILES: LEVEL_SIZES.LEVEL_HEIGHT_TILES,
    TILE_WIDTH_PIXELS: LEVEL_SIZES.TILE_WIDTH_PIXELS,
    TILE_HEIGHT_PIXELS: LEVEL_SIZES.TILE_HEIGHT_PIXELS,
    LEVEL_WIDTH_PIXELS: LEVEL_SIZES.TILE_WIDTH_PIXELS * LEVEL_SIZES.LEVEL_WIDTH_TILES,
    LEVEL_HEIGHT_PIXELS: LEVEL_SIZES.TILE_HEIGHT_PIXELS * LEVEL_SIZES.LEVEL_HEIGHT_TILES,
    TILES_MAPPING: {
        LIGHT_GRASS_LAYER: {
            NAME: "LightGrassLayer",
            LEFT_TILE: 19,
            RIGHT_TILE: 17,
            BOTTOM_TILE: 2,
            TOP_TILE: 34,
            MIDDLE_TILE: [
                { index: 0, weight: 6 },
                { index: 16, weight: 3 },
                { index: 32, weight: 1 },
            ]
        }
    }
};

var config = {
    type: Phaser.AUTO,
    width: LEVEL_CONFIG.LEVEL_WIDTH_PIXELS,
    height: LEVEL_CONFIG.LEVEL_HEIGHT_PIXELS,
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
    //preloadJSON.call(this);
    preloadBlank.call(this);
}

function create ()
{

    //createJSON.call(this);
    createBlank.call(this);

/*
    this.add.text(16, 16, 'Click a tile to replace all instances with a plant.', {
        fontSize: '18px',
        padding: { x: 10, y: 5 },
        backgroundColor: '#000000',
        fill: '#ffffff'
    }).setScrollFactor(0);
*/
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

var preloadBlank = function() {

    this.load.image('tileset', 'img/grass_tileset_16x16.png');
}

var createCSV = function() {

    var map = this.make.tilemap({ 
        key: 'light', 
        tileWidth: LEVEL_CONFIG.TILE_WIDTH_PIXELS, 
        tileHeight: LEVEL_CONFIG.TILE_HEIGHT_PIXELS });

    var map2 = this.make.tilemap({ 
        key: 'normal', 
        tileWidth: LEVEL_CONFIG.TILE_WIDTH_PIXELS, 
        tileHeight: LEVEL_CONFIG.TILE_HEIGHT_PIXELS });

    var tileset = map.addTilesetImage(
        'tileset', 
        null, 
        LEVEL_CONFIG.TILE_WIDTH_PIXELS, 
        LEVEL_CONFIG.TILE_HEIGHT_PIXELS);

    var tileset2 = map2.addTilesetImage(
        'tileset', 
        null, 
        LEVEL_CONFIG.TILE_WIDTH_PIXELS, 
        LEVEL_CONFIG.TILE_HEIGHT_PIXELS);

    var layer = map.createDynamicLayer(0, tileset, 0, 0);
    var layer2 = map2.createDynamicLayer(0, tileset2, 0, 0);
}

var createJSON = function() {

    var map = this.make.tilemap({ key: 'map' });

    var tileset = map.addTilesetImage('grass', 'tileset');

    var layer1 = map.createDynamicLayer('light', tileset);
    var layer2 = map.createDynamicLayer('normal', tileset);
}

var createBlank = function() {

    var map = this.make.tilemap({ 
        tileWidth: LEVEL_CONFIG.TILE_WIDTH_PIXELS, 
        tileHeight: LEVEL_CONFIG.TILE_HEIGHT_PIXELS, 
        width: LEVEL_CONFIG.LEVEL_WIDTH_PIXELS, 
        height: LEVEL_CONFIG.LEVEL_HEIGHT_PIXELS,
    });
    var tileset = map.addTilesetImage(
        'tileset', 
        null, 
        LEVEL_CONFIG.TILE_WIDTH_PIXELS, 
        LEVEL_CONFIG.TILE_HEIGHT_PIXELS
    );

    var layer = map.createBlankDynamicLayer(LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER.NAME, tileset);

    layer.fill(LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER.MIDDLE_TILE[0].index);
}
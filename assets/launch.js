const LEVEL_SIZES = {
    LEVEL_WIDTH_TILES: 20,
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
            TOP_LEFT_TILE: 4,
            TOP_RIGHT_TILE: 5,
            BOTTOM_LEFT_TILE: 20,
            BOTTOM_RIGHT_TILE: 21,
            MIDDLE_TILE: [
                { index: 0, weight: 80 },
                { index: 16, weight: 15 },
                { index: 32, weight: 5 },
            ]
        }
    }
};

var game;

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: LEVEL_CONFIG.LEVEL_WIDTH_PIXELS,
        height: LEVEL_CONFIG.LEVEL_HEIGHT_PIXELS,
        backgroundColor: 'rgb(255, 255, 255)',
        pixelArt: true,
        parent: '09ji2d0ijw',
        scene: [bootGame, playGame]
    };

    game = new Phaser.Game(config);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload(){

        //preloadJSON.call(this);
        preloadBlank.call(this);
    }
    create(){
        this.scene.start("PlayGame");
    }
}
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){

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
}

function resizeGame(){
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
}

var preloadCSV = function() {
    this.load.image('tileset', 'img/grass_tileset_16x16.png');
    
    this.load.tilemapCSV('light', '../apps/tiled/default_map_light.csv');
    this.load.tilemapCSV('normal', '../apps/tiled/default_map_normal.csv');
}

var preloadJSON = function() {
    this.load.image('tileset', 'img/grass_tileset_16x16.png');
    
    this.load.tilemapTiledJSON('map', '../apps/tiled/default_map_embedded_tileset.json');
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

    var layer = map.createBlankDynamicLayer(
        LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER.NAME, 
        tileset);

    createBorders(map, layer);

    map.weightedRandomize(
        1, 
        1, 
        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 2, 
        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 2, 
        LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER.MIDDLE_TILE, 
        layer);
}

var createBorders = function(map, layer) {

    var m = LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER;
    var bottom = LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 1;
    var right = LEVEL_CONFIG.LEVEL_WIDTH_TILES - 1;

    // corners
    map.putTileAt(m.TOP_LEFT_TILE, 0, 0, layer);
    map.putTileAt(m.TOP_RIGHT_TILE, right, 0, layer);
    map.putTileAt(m.BOTTOM_LEFT_TILE, 0, bottom, layer);
    map.putTileAt(m.BOTTOM_RIGHT_TILE, right, bottom, layer);

    // top border
    layer.fill(
        m.TOP_TILE,
        1, 
        0, 
        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 2, 
        1
    );

    // right border
    layer.fill(
        m.RIGHT_TILE,
        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 2, 
        1, 
        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 1, 
        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 2
    );

    // bottom border
    layer.fill(
        m.BOTTOM_TILE,
        1, 
        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 2, 
        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 2, 
        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 1
    );

    // left border
    layer.fill(
        m.LEFT_TILE,
        0, 
        1, 
        1, 
        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 2
    );
}
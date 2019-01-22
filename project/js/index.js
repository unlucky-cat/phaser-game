import weightedRandomSelector from './services/WeightedRandomSelector';

const LEVEL_SIZES = {
    LEVEL_WIDTH_TILES: 60,
    LEVEL_HEIGHT_TILES: 60,
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
    },
    SPRITESHEET: {
        NAME: "spritesheet",
        FILEPATH: "assets/img/grass_tileset_16x16.png"
    }
};

var game;

/*
var generateRandomInteger = function(min , max) {

    return Math.floor(Math.random() * (max-min) + min);
}

var weightedRandomNumber = function(weightedIndexes) {

    var sum = weightedIndexes.reduce((acc, val) => acc + val.weight, 0);
    const rnd = generateRandomInteger(0, sum);

    var accumulator = 0;
    var index = 0;

    do {
        
        accumulator += weightedIndexes[index++].weight;
    } 
    while (accumulator < rnd);

    return weightedIndexes[--index].index;
}
*/

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

class bootGame extends Phaser.Scene {
    constructor(){
        super("BootGame");
    }

    preload() {

        //preloadJSON.call(this);
        //preloadBlank.call(this);
        this.preloadSpriteSheet();
    }

    create() {
        this.scene.start("PlayGame");
    }

    preloadSpriteSheet() {
    /*
        this.load.spritesheet('spritesheet'
        , 'assets/img/grass_tileset_16x16.png'
        , LEVEL_CONFIG.TILE_WIDTH_PIXELS
        , LEVEL_CONFIG.TILE_HEIGHT_PIXELS);
    */

    
        this.load.spritesheet(
            LEVEL_CONFIG.SPRITESHEET.NAME, 
            LEVEL_CONFIG.SPRITESHEET.FILEPATH,
            { 
                frameWidth: LEVEL_CONFIG.TILE_WIDTH_PIXELS, 
                frameHeight: LEVEL_CONFIG.TILE_HEIGHT_PIXELS 
            }
        );
    }
}

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    create(){

        //createJSON.call(this);
        //createBlank.call(this);
        createSpriteSheet.call(this);

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

function getTilePosition(row, col) {

    const x = LEVEL_CONFIG.TILE_WIDTH_PIXELS * (col + 0.5);
    const y = LEVEL_CONFIG.TILE_HEIGHT_PIXELS * (row + 0.5);

    return new Phaser.Geom.Point(x, y);
}

var preloadCSV = function() {
    this.load.image('tileset', 'assets/img/grass_tileset_16x16.png');
    
    this.load.tilemapCSV('light', 'assets/apps/tiled/default_map_light.csv');
    this.load.tilemapCSV('normal', 'assets/apps/tiled/default_map_normal.csv');
}

var preloadJSON = function() {
    this.load.image('tileset', 'assets/img/grass_tileset_16x16.png');
    
    this.load.tilemapTiledJSON('map', 'assets/apps/tiled/default_map_embedded_tileset.json');
}

var preloadBlank = function() {

    this.load.image('tileset', 'assets/img/grass_tileset_16x16.png');
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

var createSpriteSheet = function() {

    //console.log('createSpriteSheet');

    var m = LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER;
    var bottom = LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 1;
    var right = LEVEL_CONFIG.LEVEL_WIDTH_TILES - 1;

    const selector = new weightedRandomSelector(m.MIDDLE_TILE);

    for (let row = 0; row < LEVEL_CONFIG.LEVEL_WIDTH_TILES; row++) {
        for (let col = 0; col < LEVEL_CONFIG.LEVEL_HEIGHT_TILES; col++) {
            
            const point = getTilePosition(row, col);

            // corners
            if (row === 0 && col === 0)
                this.add.sprite(point.x, point.y, "spritesheet", m.TOP_LEFT_TILE);
            else if (row === 0 && col === bottom)
                this.add.sprite(point.x, point.y, "spritesheet", m.TOP_RIGHT_TILE);
            else if (row === 0)
                this.add.sprite(point.x, point.y, "spritesheet", m.TOP_TILE);
            else if (row === right && col === 0)
                this.add.sprite(point.x, point.y, "spritesheet", m.BOTTOM_LEFT_TILE);
            else if (row === right && col === bottom)
                this.add.sprite(point.x, point.y, "spritesheet", m.BOTTOM_RIGHT_TILE);
            else if (row === right)
                this.add.sprite(point.x, point.y, "spritesheet", m.BOTTOM_TILE);
            else if (col === 0)
                this.add.sprite(point.x, point.y, "spritesheet", m.LEFT_TILE);
            else if (col === bottom)
                this.add.sprite(point.x, point.y, "spritesheet", m.RIGHT_TILE);
            else
                this.add.sprite(point.x, point.y, "spritesheet", selector.getNext());
                //this.add.sprite(point.x, point.y, "spritesheet", weightedRandomNumber(m.MIDDLE_TILE));
        }
    }
}
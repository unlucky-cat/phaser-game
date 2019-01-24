import LEVEL_CONFIG from '../LEVEL_CONFIG';

export default class BootGame extends Phaser.Scene {

    constructor() {
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

    preloadCSV() {

        this.load.image(LEVEL_CONFIG.TILESET.NAME, LEVEL_CONFIG.TILESET.FILEPATH);
        
        this.load.tilemapCSV('light', 'assets/apps/tiled/default_map_light.csv');
        this.load.tilemapCSV('normal', 'assets/apps/tiled/default_map_normal.csv');
    }

    preloadJSON() {

        this.load.image(LEVEL_CONFIG.TILESET.NAME, LEVEL_CONFIG.TILESET.FILEPATH);       
        this.load.tilemapTiledJSON('map', 'assets/apps/tiled/default_map_embedded_tileset.json');
    }

    preloadBlank() {

        this.load.image(LEVEL_CONFIG.TILESET.NAME, LEVEL_CONFIG.TILESET.FILEPATH); 
    }
}
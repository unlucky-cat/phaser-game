import LEVEL_CONFIG from '../LEVEL_CONFIG';
import weightedRandomSelector from '../services/WeightedRandomSelector';

export default  class PlayGame extends Phaser.Scene {

    constructor() {

        super("PlayGame");
    }

    create() {

        //createJSON.call(this);
        //createBlank.call(this);
        this.createSpriteSheet();

        /*
            this.add.text(16, 16, 'Click a tile to replace all instances with a plant.', {
                fontSize: '18px',
                padding: { x: 10, y: 5 },
                backgroundColor: '#000000',
                fill: '#ffffff'
            }).setScrollFactor(0);
        */
    }

    createBorders(map, layer) {

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

    createSpriteSheet() {

        //console.log('createSpriteSheet');
    
        const grass = LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER;
        const bottom = LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 1;
        const right = LEVEL_CONFIG.LEVEL_WIDTH_TILES - 1;
        const topLeft = 0;
    
        const rndTileSelector = new weightedRandomSelector(grass.MIDDLE_TILE);
    
        for (let row = topLeft; row <= right; row++) {
            for (let col = topLeft; col <= bottom; col++) {
                
                const pos = this.getTilePosition(row, col);
                var tile = 0
    
                // corners
                if (row === topLeft && col === topLeft)
                    tile = grass.TOP_LEFT_TILE;
                else if (row === topLeft && col === bottom)
                    tile = grass.TOP_RIGHT_TILE;
                else if (row === topLeft)
                    tile = grass.TOP_TILE;
                else if (row === right && col === topLeft)
                    tile = grass.BOTTOM_LEFT_TILE;
                else if (row === right && col === bottom)
                    tile = grass.BOTTOM_RIGHT_TILE;
                else if (row === right)
                    tile = grass.BOTTOM_TILE;
                else if (col === topLeft)
                    tile = grass.LEFT_TILE;
                else if (col === bottom)
                    tile = grass.RIGHT_TILE;
                else tile = rndTileSelector.getNext();
                    //this.add.sprite(pos.x, pos.y, "spritesheet", weightedRandomNumber(grass.MIDDLE_TILE));
    
                this.add.sprite(pos.x, pos.y, LEVEL_CONFIG.SPRITESHEET.NAME, tile);
            }
        }
    }

    createBlank() {

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

    createJSON() {

        var map = this.make.tilemap({ key: 'map' });
    
        var tileset = map.addTilesetImage('grass', 'tileset');
    
        var layer1 = map.createDynamicLayer('light', tileset);
        var layer2 = map.createDynamicLayer('normal', tileset);
    }

    createCSV() {

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

    getTilePosition(row, col) {

        const x = LEVEL_CONFIG.TILE_WIDTH_PIXELS * (col + 0.5);
        const y = LEVEL_CONFIG.TILE_HEIGHT_PIXELS * (row + 0.5);
    
        return new Phaser.Geom.Point(x, y);
    }
}
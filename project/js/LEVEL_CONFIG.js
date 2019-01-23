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
    },
    TILESET: {
        NAME: "tileset",
        FILEPATH: "assets/img/grass_tileset_16x16.png"
    }
};

export default LEVEL_CONFIG;
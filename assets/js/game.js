/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./project/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./project/index.js":
/*!**************************!*\
  !*** ./project/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const LEVEL_SIZES = {\r\n    LEVEL_WIDTH_TILES: 50,\r\n    LEVEL_HEIGHT_TILES: 50,\r\n    TILE_WIDTH_PIXELS: 16,\r\n    TILE_HEIGHT_PIXELS: 16,\r\n};\r\n\r\nconst LEVEL_CONFIG = {\r\n    LEVEL_WIDTH_TILES: LEVEL_SIZES.LEVEL_WIDTH_TILES,\r\n    LEVEL_HEIGHT_TILES: LEVEL_SIZES.LEVEL_HEIGHT_TILES,\r\n    TILE_WIDTH_PIXELS: LEVEL_SIZES.TILE_WIDTH_PIXELS,\r\n    TILE_HEIGHT_PIXELS: LEVEL_SIZES.TILE_HEIGHT_PIXELS,\r\n    LEVEL_WIDTH_PIXELS: LEVEL_SIZES.TILE_WIDTH_PIXELS * LEVEL_SIZES.LEVEL_WIDTH_TILES,\r\n    LEVEL_HEIGHT_PIXELS: LEVEL_SIZES.TILE_HEIGHT_PIXELS * LEVEL_SIZES.LEVEL_HEIGHT_TILES,\r\n    TILES_MAPPING: {\r\n        LIGHT_GRASS_LAYER: {\r\n            NAME: \"LightGrassLayer\",\r\n            LEFT_TILE: 19,\r\n            RIGHT_TILE: 17,\r\n            BOTTOM_TILE: 2,\r\n            TOP_TILE: 34,\r\n            TOP_LEFT_TILE: 4,\r\n            TOP_RIGHT_TILE: 5,\r\n            BOTTOM_LEFT_TILE: 20,\r\n            BOTTOM_RIGHT_TILE: 21,\r\n            MIDDLE_TILE: [\r\n                { index: 0, weight: 80 },\r\n                { index: 16, weight: 15 },\r\n                { index: 32, weight: 5 },\r\n            ]\r\n        }\r\n    }\r\n};\r\n\r\nvar game;\r\n\r\nvar generateRandomInteger = function(min , max) {\r\n\r\n    return Math.floor(Math.random() * (max-min) + min);\r\n}\r\n\r\nvar weightedRandomNumber = function(weightedIndexes) {\r\n\r\n    var sum = weightedIndexes.reduce((acc, val) => acc + val.weight, 0);\r\n    const rnd = generateRandomInteger(0, sum);\r\n\r\n    var accumulator = 0;\r\n    var index = 0;\r\n\r\n    do {\r\n        \r\n        accumulator += weightedIndexes[index++].weight;\r\n    } \r\n    while (accumulator < rnd);\r\n\r\n    return weightedIndexes[--index].index;\r\n}\r\n\r\nwindow.onload = function() {\r\n\r\n    var config = {\r\n        type: Phaser.AUTO,\r\n        width: LEVEL_CONFIG.LEVEL_WIDTH_PIXELS,\r\n        height: LEVEL_CONFIG.LEVEL_HEIGHT_PIXELS,\r\n        backgroundColor: 'rgb(255, 255, 255)',\r\n        pixelArt: true,\r\n        parent: '09ji2d0ijw',\r\n        scene: [bootGame, playGame]\r\n    };\r\n\r\n    game = new Phaser.Game(config);\r\n    window.focus();\r\n    resizeGame();\r\n    window.addEventListener(\"resize\", resizeGame);\r\n}\r\n\r\nclass bootGame extends Phaser.Scene{\r\n    constructor(){\r\n        super(\"BootGame\");\r\n    }\r\n    preload(){\r\n\r\n        //preloadJSON.call(this);\r\n        //preloadBlank.call(this);\r\n        preloadSpriteSheet.call(this);\r\n    }\r\n    create(){\r\n        this.scene.start(\"PlayGame\");\r\n    }\r\n}\r\nclass playGame extends Phaser.Scene{\r\n    constructor(){\r\n        super(\"PlayGame\");\r\n    }\r\n    create(){\r\n\r\n        //createJSON.call(this);\r\n        //createBlank.call(this);\r\n        createSpriteSheet.call(this);\r\n\r\n        /*\r\n            this.add.text(16, 16, 'Click a tile to replace all instances with a plant.', {\r\n                fontSize: '18px',\r\n                padding: { x: 10, y: 5 },\r\n                backgroundColor: '#000000',\r\n                fill: '#ffffff'\r\n            }).setScrollFactor(0);\r\n        */\r\n    }\r\n}\r\n\r\nfunction resizeGame(){\r\n    var canvas = document.querySelector(\"canvas\");\r\n    var windowWidth = window.innerWidth;\r\n    var windowHeight = window.innerHeight;\r\n    var windowRatio = windowWidth / windowHeight;\r\n    var gameRatio = game.config.width / game.config.height;\r\n    if(windowRatio < gameRatio){\r\n        canvas.style.width = windowWidth + \"px\";\r\n        canvas.style.height = (windowWidth / gameRatio) + \"px\";\r\n    }\r\n    else{\r\n        canvas.style.width = (windowHeight * gameRatio) + \"px\";\r\n        canvas.style.height = windowHeight + \"px\";\r\n    }\r\n}\r\n\r\nfunction getTilePosition(row, col) {\r\n\r\n    const x = LEVEL_CONFIG.TILE_WIDTH_PIXELS * (col + 0.5);\r\n    const y = LEVEL_CONFIG.TILE_HEIGHT_PIXELS * (row + 0.5);\r\n\r\n    return new Phaser.Geom.Point(x, y);\r\n}\r\n\r\nvar preloadCSV = function() {\r\n    this.load.image('tileset', 'assets/img/grass_tileset_16x16.png');\r\n    \r\n    this.load.tilemapCSV('light', 'assets/apps/tiled/default_map_light.csv');\r\n    this.load.tilemapCSV('normal', 'assets/apps/tiled/default_map_normal.csv');\r\n}\r\n\r\nvar preloadJSON = function() {\r\n    this.load.image('tileset', 'assets/img/grass_tileset_16x16.png');\r\n    \r\n    this.load.tilemapTiledJSON('map', 'assets/apps/tiled/default_map_embedded_tileset.json');\r\n}\r\n\r\nvar preloadSpriteSheet = function() {\r\n/*\r\n    this.load.spritesheet('spritesheet'\r\n    , 'assets/img/grass_tileset_16x16.png'\r\n    , LEVEL_CONFIG.TILE_WIDTH_PIXELS\r\n    , LEVEL_CONFIG.TILE_HEIGHT_PIXELS);\r\n*/\r\n\r\n    //console.log('preloadSpriteSheet');\r\n\r\n    this.load.spritesheet('spritesheet', \r\n        'assets/img/grass_tileset_16x16.png',\r\n        { frameWidth: 16, frameHeight: 16 }\r\n    );\r\n}\r\n\r\nvar preloadBlank = function() {\r\n\r\n    this.load.image('tileset', 'assets/img/grass_tileset_16x16.png');\r\n}\r\n\r\nvar createCSV = function() {\r\n\r\n    var map = this.make.tilemap({ \r\n        key: 'light', \r\n        tileWidth: LEVEL_CONFIG.TILE_WIDTH_PIXELS, \r\n        tileHeight: LEVEL_CONFIG.TILE_HEIGHT_PIXELS });\r\n\r\n    var map2 = this.make.tilemap({ \r\n        key: 'normal', \r\n        tileWidth: LEVEL_CONFIG.TILE_WIDTH_PIXELS, \r\n        tileHeight: LEVEL_CONFIG.TILE_HEIGHT_PIXELS });\r\n\r\n    var tileset = map.addTilesetImage(\r\n        'tileset', \r\n        null, \r\n        LEVEL_CONFIG.TILE_WIDTH_PIXELS, \r\n        LEVEL_CONFIG.TILE_HEIGHT_PIXELS);\r\n\r\n    var tileset2 = map2.addTilesetImage(\r\n        'tileset', \r\n        null, \r\n        LEVEL_CONFIG.TILE_WIDTH_PIXELS, \r\n        LEVEL_CONFIG.TILE_HEIGHT_PIXELS);\r\n\r\n    var layer = map.createDynamicLayer(0, tileset, 0, 0);\r\n    var layer2 = map2.createDynamicLayer(0, tileset2, 0, 0);\r\n}\r\n\r\nvar createJSON = function() {\r\n\r\n    var map = this.make.tilemap({ key: 'map' });\r\n\r\n    var tileset = map.addTilesetImage('grass', 'tileset');\r\n\r\n    var layer1 = map.createDynamicLayer('light', tileset);\r\n    var layer2 = map.createDynamicLayer('normal', tileset);\r\n}\r\n\r\nvar createBlank = function() {\r\n\r\n    var map = this.make.tilemap({ \r\n        tileWidth: LEVEL_CONFIG.TILE_WIDTH_PIXELS, \r\n        tileHeight: LEVEL_CONFIG.TILE_HEIGHT_PIXELS, \r\n        width: LEVEL_CONFIG.LEVEL_WIDTH_PIXELS, \r\n        height: LEVEL_CONFIG.LEVEL_HEIGHT_PIXELS,\r\n    });\r\n    var tileset = map.addTilesetImage(\r\n        'tileset', \r\n        null, \r\n        LEVEL_CONFIG.TILE_WIDTH_PIXELS, \r\n        LEVEL_CONFIG.TILE_HEIGHT_PIXELS\r\n    );\r\n\r\n    var layer = map.createBlankDynamicLayer(\r\n        LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER.NAME, \r\n        tileset);\r\n\r\n    createBorders(map, layer);\r\n\r\n    map.weightedRandomize(\r\n        1, \r\n        1, \r\n        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 2, \r\n        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 2, \r\n        LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER.MIDDLE_TILE, \r\n        layer);\r\n}\r\n\r\nvar createBorders = function(map, layer) {\r\n\r\n    var m = LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER;\r\n    var bottom = LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 1;\r\n    var right = LEVEL_CONFIG.LEVEL_WIDTH_TILES - 1;\r\n\r\n    // corners\r\n    map.putTileAt(m.TOP_LEFT_TILE, 0, 0, layer);\r\n    map.putTileAt(m.TOP_RIGHT_TILE, right, 0, layer);\r\n    map.putTileAt(m.BOTTOM_LEFT_TILE, 0, bottom, layer);\r\n    map.putTileAt(m.BOTTOM_RIGHT_TILE, right, bottom, layer);\r\n\r\n    // top border\r\n    layer.fill(\r\n        m.TOP_TILE,\r\n        1, \r\n        0, \r\n        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 2, \r\n        1\r\n    );\r\n\r\n    // right border\r\n    layer.fill(\r\n        m.RIGHT_TILE,\r\n        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 2, \r\n        1, \r\n        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 1, \r\n        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 2\r\n    );\r\n\r\n    // bottom border\r\n    layer.fill(\r\n        m.BOTTOM_TILE,\r\n        1, \r\n        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 2, \r\n        LEVEL_CONFIG.LEVEL_WIDTH_TILES - 2, \r\n        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 1\r\n    );\r\n\r\n    // left border\r\n    layer.fill(\r\n        m.LEFT_TILE,\r\n        0, \r\n        1, \r\n        1, \r\n        LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 2\r\n    );\r\n}\r\n\r\nvar createSpriteSheet = function() {\r\n\r\n    //console.log('createSpriteSheet');\r\n\r\n    var m = LEVEL_CONFIG.TILES_MAPPING.LIGHT_GRASS_LAYER;\r\n    var bottom = LEVEL_CONFIG.LEVEL_HEIGHT_TILES - 1;\r\n    var right = LEVEL_CONFIG.LEVEL_WIDTH_TILES - 1;\r\n\r\n    for (let row = 0; row < LEVEL_CONFIG.LEVEL_WIDTH_TILES; row++) {\r\n        for (let col = 0; col < LEVEL_CONFIG.LEVEL_HEIGHT_TILES; col++) {\r\n            \r\n            const point = getTilePosition(row, col);\r\n\r\n            // corners\r\n            if (row === 0 && col === 0)\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", m.TOP_LEFT_TILE);\r\n            else if (row === 0 && col === bottom)\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", m.TOP_RIGHT_TILE);\r\n            else if (row === 0)\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", m.TOP_TILE);\r\n            else if (row === right && col === 0)\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", m.BOTTOM_LEFT_TILE);\r\n            else if (row === right && col === bottom)\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", m.BOTTOM_RIGHT_TILE);\r\n            else if (row === right)\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", m.BOTTOM_TILE);\r\n            else if (col === 0)\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", m.LEFT_TILE);\r\n            else if (col === bottom)\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", m.RIGHT_TILE);\r\n            else\r\n                this.add.sprite(point.x, point.y, \"spritesheet\", weightedRandomNumber(m.MIDDLE_TILE));\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./project/index.js?");

/***/ })

/******/ });
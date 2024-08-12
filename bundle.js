/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/logic/Block.ts":
/*!****************************!*\
  !*** ./src/logic/Block.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Block: () => (/* binding */ Block)
/* harmony export */ });
/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes */ "./src/logic/shapes.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/logic/config.ts");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colors */ "./src/logic/colors.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/logic/utils.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controller */ "./src/logic/Controller.ts");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Model */ "./src/logic/Model.ts");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./View */ "./src/logic/View.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};







var Block = /** @class */ (function () {
    function Block(shape, color) {
        this.shape = shape;
        this.color = color;
        this.orientation = 0;
        this.isFixed = false;
        this.canMoveLeft = true;
        this.canMoveRight = true;
        this.canRotate = true;
        this.x = this.calculateStartXPosition();
        this.y = 0;
    }
    Block.generate = function () {
        var shape = _shapes__WEBPACK_IMPORTED_MODULE_0__.shapes[(0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRandomIntInclusive)(0, _shapes__WEBPACK_IMPORTED_MODULE_0__.shapes.length - 1)];
        var color = _colors__WEBPACK_IMPORTED_MODULE_2__.colors[(0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRandomIntInclusive)(0, _colors__WEBPACK_IMPORTED_MODULE_2__.colors.length - 1)];
        return new Block(shape, color);
    };
    Block.prototype.rotate = function () {
        var newShape = [];
        this.orientation = this.orientation === 0 ? 1 : 0;
        console.log(this.orientation);
        // this.x = this.calculateXPosition();
        // this.y = this.calculateYPosition();
        for (var i = this.shape.length - 1; i >= 0; i--) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (i === this.shape.length - 1)
                    newShape.push([]);
                newShape[j].push(this.shape[i][j]);
            }
        }
        var length = this.orientation === 0 ? this.shape.length : this.shape[0].length;
        // this.x = this.calculateXPosition(length);
        // this.y = this.calculateYPosition(length);
        this.checkMargin(newShape);
        this.checkHorizontalAxisDuringRotation(newShape);
        if (this.canRotate)
            this.shape = __spreadArray([], newShape, true);
    };
    Block.prototype.moveLeft = function (grid) {
        if (this.checkHorizontalAxis(grid) || this.isFixed)
            return;
        this.checkMargin(this.shape);
        if (this.canMoveLeft)
            this.x -= 1;
    };
    Block.prototype.moveRight = function (grid) {
        if (this.checkHorizontalAxis(grid) || this.isFixed)
            return;
        this.checkMargin(this.shape);
        if (this.canMoveRight)
            this.x += 1;
    };
    Block.prototype.drop = function (grid) {
        this.detectCollision(grid);
        if (!this.isFixed)
            this.y++;
    };
    Block.prototype.checkMargin = function (shape) {
        this.canMoveLeft = true;
        this.canMoveRight = true;
        this.canRotate = true;
        var blockLength = shape[0].length;
        if (this.x <= 0) {
            this.canMoveLeft = false;
        }
        if (this.x + blockLength >= _config__WEBPACK_IMPORTED_MODULE_1__.columns) {
            this.canMoveRight = false;
        }
        if (this.x + blockLength - 1 >= _config__WEBPACK_IMPORTED_MODULE_1__.columns) {
            this.canRotate = false;
        }
    };
    Block.prototype.detectCollision = function (grid) {
        // checks vertical axis only
        var blockHeight = this.shape.length;
        if (this.y + blockHeight >= _config__WEBPACK_IMPORTED_MODULE_1__.rows || this.checkVerticalAxis(grid)) {
            this.isFixed = true;
            this.setFixed();
            _Model__WEBPACK_IMPORTED_MODULE_5__.Model.updateGrid("interval fixed");
            _View__WEBPACK_IMPORTED_MODULE_6__.View.render(_Model__WEBPACK_IMPORTED_MODULE_5__.Model.grid);
            _Model__WEBPACK_IMPORTED_MODULE_5__.Model.createBlock();
            _Model__WEBPACK_IMPORTED_MODULE_5__.Model.activeBlock.isFixed = false;
            _Controller__WEBPACK_IMPORTED_MODULE_4__.Controller.setCanDrop(false);
            // related to Controller class only, nothing to worry about
            //
            _Model__WEBPACK_IMPORTED_MODULE_5__.Model.canUpdate = false;
        }
    };
    Block.prototype.checkVerticalAxis = function (grid) {
        var hasCollision = false;
        var yPosition = this.y + 1;
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (grid[yPosition + i][this.x + j] === 2 && this.shape[i][j] > 0) {
                    hasCollision = true;
                    return hasCollision;
                }
            }
        }
        return hasCollision;
    };
    Block.prototype.checkHorizontalAxis = function (grid) {
        var hasCollision = false;
        var xPosition = this.y + 1;
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if ((grid[this.y + i][this.x - 1 + j] === 2 && this.shape[i][j] > 0) ||
                    (grid[this.y + i][this.x + 1 + j] === 2 && this.shape[i][j] > 0)) {
                    hasCollision = true;
                    return hasCollision;
                }
            }
        }
        return hasCollision;
    };
    Block.prototype.checkHorizontalAxisDuringRotation = function (shape) {
        var hasCollision = false;
        for (var i = 0; i < shape.length; i++) {
            for (var j = 0; j < shape[i].length; j++) {
                if ((_Model__WEBPACK_IMPORTED_MODULE_5__.Model.grid[this.y + i][this.x - 1 + j] === 2 && shape[i][j] > 0) ||
                    (_Model__WEBPACK_IMPORTED_MODULE_5__.Model.grid[this.y + i][this.x + 1 + j] === 2 && shape[i][j] > 0)) {
                    hasCollision = true;
                    this.canRotate = false;
                    return;
                }
            }
        }
    };
    Block.prototype.setFixed = function () {
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    this.shape[i][j] = 2;
                    // console.log("something went wrong", this);
                }
            }
        }
    };
    Block.prototype.fixOverlap = function () {
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 2) {
                    this.shape[i][j] = 1;
                }
            }
        }
    };
    Block.prototype.calculateStartXPosition = function () {
        return _config__WEBPACK_IMPORTED_MODULE_1__.columns / 2 - Math.round(this.shape[0].length / 2);
    };
    Block.prototype.calculateXPosition = function (length) {
        if (this.orientation === 0)
            return this.x - Math.floor(length / 2);
        else
            return this.x + Math.floor(length / 2);
    };
    Block.prototype.calculateYPosition = function (length) {
        if (this.orientation === 0)
            return this.y + Math.floor(length / 2);
        else
            return this.y - Math.floor(length / 2);
    };
    return Block;
}());



/***/ }),

/***/ "./src/logic/Controller.ts":
/*!*********************************!*\
  !*** ./src/logic/Controller.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controller: () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model */ "./src/logic/Model.ts");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "./src/logic/View.ts");


var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.setCanDrop = function (value) {
        if (value && !Controller.downPressed) {
            Controller.canDrop = true;
            return;
        }
        if (!value)
            Controller.canDrop = false;
    };
    Controller.init = function () {
        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowLeft") {
                _Model__WEBPACK_IMPORTED_MODULE_0__.Model.activeBlock.moveLeft(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.grid);
                _Model__WEBPACK_IMPORTED_MODULE_0__.Model.updateGrid("ArrowRight");
                _View__WEBPACK_IMPORTED_MODULE_1__.View.render(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.grid);
            }
            else if (event.key === "ArrowRight") {
                _Model__WEBPACK_IMPORTED_MODULE_0__.Model.activeBlock.moveRight(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.grid);
                _Model__WEBPACK_IMPORTED_MODULE_0__.Model.updateGrid("ArrowRight");
                _View__WEBPACK_IMPORTED_MODULE_1__.View.render(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.grid);
            }
            else if (event.key === "ArrowDown") {
                Controller.downPressed = true;
                if (Controller.canDrop) {
                    _Model__WEBPACK_IMPORTED_MODULE_0__.Model.activeBlock.drop(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.grid);
                    _Model__WEBPACK_IMPORTED_MODULE_0__.Model.updateGrid("ArrowDown");
                    _View__WEBPACK_IMPORTED_MODULE_1__.View.render(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.grid);
                }
            }
            else if (event.code === "Space") {
                console.log("space");
                _Model__WEBPACK_IMPORTED_MODULE_0__.Model.activeBlock.rotate();
                _Model__WEBPACK_IMPORTED_MODULE_0__.Model.updateGrid("space");
                _View__WEBPACK_IMPORTED_MODULE_1__.View.render(_Model__WEBPACK_IMPORTED_MODULE_0__.Model.grid);
            }
            else if (event.key === "Enter") {
                _Model__WEBPACK_IMPORTED_MODULE_0__.Model.canUpdate = true;
                // Model.clearAll();
                // Model.updateBlockPosition();
            }
        });
        document.addEventListener("keyup", function (event) {
            Controller.canDrop = true;
            Controller.downPressed = false;
            if (event.key === "ArrowDown") {
                Controller.canDrop = true;
                Controller.downPressed = false;
                console.log("keyup");
            }
        });
    };
    Controller.canDrop = true;
    Controller.downPressed = false;
    return Controller;
}());



/***/ }),

/***/ "./src/logic/GameSession.ts":
/*!**********************************!*\
  !*** ./src/logic/GameSession.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameSession: () => (/* binding */ GameSession)
/* harmony export */ });
var GameSession = /** @class */ (function () {
    function GameSession() {
    }
    GameSession.increaseScore = function () {
        GameSession.score += 100;
    };
    GameSession.prototype.init = function () { };
    GameSession.prototype.pauseSession = function () { };
    GameSession.score = 0;
    GameSession.timer = "00:00";
    GameSession.paused = false;
    GameSession.level = 1;
    return GameSession;
}());



/***/ }),

/***/ "./src/logic/Model.ts":
/*!****************************!*\
  !*** ./src/logic/Model.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Model: () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Block */ "./src/logic/Block.ts");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "./src/logic/View.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/logic/config.ts");
/* harmony import */ var _GameSession__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameSession */ "./src/logic/GameSession.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Controller */ "./src/logic/Controller.ts");





var Model = /** @class */ (function () {
    function Model() {
    }
    Model.init = function () {
        document.body.addEventListener("click", Model.stopSession);
        Model.fillGrid();
        Model.createBlock();
        Model.updateGrid("init");
        _View__WEBPACK_IMPORTED_MODULE_1__.View.render(Model.grid);
        Model.timerId = setInterval(function () {
            if (Model.isPaused)
                return;
            // console.log(Model.grid);
            if (false) {}
            else {
                if (Model.canUpdate) {
                    Model.updateGrid("interval");
                    _View__WEBPACK_IMPORTED_MODULE_1__.View.render(Model.grid);
                    Model.activeBlock.drop(Model.grid);
                }
                Model.canUpdate = true;
            }
        }, 400);
    };
    Model.fillGrid = function () {
        for (var i = 0; i < _config__WEBPACK_IMPORTED_MODULE_2__.rows; i++) {
            Model.grid.push([]);
            Model.colors.push([]);
            for (var j = 0; j < _config__WEBPACK_IMPORTED_MODULE_2__.columns; j++) {
                Model.grid[i].push(0);
                Model.colors[i].push("transparent");
            }
        }
    };
    Model.loop = function () { };
    Model.createBlock = function () {
        Model.activeBlock = _Block__WEBPACK_IMPORTED_MODULE_0__.Block.generate();
        _Controller__WEBPACK_IMPORTED_MODULE_4__.Controller.setCanDrop(true);
    };
    Model.clearGrid = function () {
        for (var i = 0; i < Model.grid.length; i++) {
            for (var j = 0; j < Model.grid[i].length; j++) {
                if (Model.grid[i][j] !== 2)
                    Model.grid[i][j] = 0;
            }
        }
    };
    Model.clearAll = function () {
        for (var i = 0; i < Model.grid.length; i++) {
            for (var j = 0; j < Model.grid[i].length; j++) {
                Model.grid[i][j] = 0;
            }
        }
    };
    Model.updateBlockPosition = function (host) {
        // if (Model.canUpdate === false) {
        //     Model.canUpdate = true;
        //     return;
        // }
        var block = Model.activeBlock;
        if (block.y === 0 && block.shape[0].includes(2)) {
            block.fixOverlap();
            block.isFixed = false;
        }
        for (var i = 0; i < block.shape.length; i++) {
            for (var j = 0; j < block.shape[i].length; j++) {
                if (Model.grid[block.y + i][block.x + j] !== 2) {
                    Model.grid[block.y + i][block.x + j] = block.shape[i][j];
                    Model.colors[block.y + i][block.x + j] = block.color;
                }
            }
        }
        Model.firstChangeAfterShift++;
        // console.log(Model.firstChangeAfterShift, JSON.parse(JSON.stringify(Model.grid)), host);
    };
    Model.checkFullLine = function () {
        Model.hasFullLine = false;
        for (var i = 0; i < Model.grid.length; i++) {
            var fullLine = true;
            for (var j = 0; j < Model.grid[i].length; j++) {
                if (Model.grid[i][j] !== 2)
                    fullLine = false;
            }
            if (fullLine) {
                Model.hasFullLine = true;
                var before = JSON.parse(JSON.stringify(Model.grid));
                console.log("Full line! Before", before);
                _GameSession__WEBPACK_IMPORTED_MODULE_3__.GameSession.increaseScore();
                Model.canUpdate = false;
                Model.shiftLine(i);
                Model.firstChangeAfterShift = 0;
                var after = JSON.parse(JSON.stringify(Model.grid));
                _View__WEBPACK_IMPORTED_MODULE_1__.View.render(Model.grid);
                console.log("Full line! after", after);
                return;
            }
        }
    };
    Model.checkOverflow = function () {
        var gridLastIdx = Model.grid.length - 1;
        Model.grid[0].includes(1);
        Model.stopSession();
    };
    Model.updateGrid = function (host) {
        Model.checkFullLine();
        Model.clearGrid();
        Model.updateBlockPosition(host);
    };
    Model.shiftLine = function (idx) {
        var gridLastIdx = Model.grid.length - 1;
        for (var i = idx; i > 0; i--) {
            if (i === 0)
                continue;
            for (var j = 0; j < Model.grid[i].length; j++) {
                if (i <= idx) {
                    Model.grid[i][j] = Model.grid[i - 1][j];
                    Model.colors[i][j] = Model.colors[i - 1][j];
                }
            }
        }
    };
    Model.stopSession = function () {
        Model.isPaused = !Model.isPaused;
    };
    Model.prototype.applyChanges = function () { };
    Model.bugLogger = function () {
        for (var i = 0; i < Model.grid.length; i++) {
            for (var j = 0; j < Model.grid[i].length; j++) {
                if (Model.grid[i][j] === 2 &&
                    Model.activeBlock.y + Model.activeBlock.shape[0].length < i) {
                    console.log(JSON.parse(JSON.stringify(Model.grid)));
                    return;
                }
            }
        }
    };
    Model.grid = [];
    Model.colors = [];
    Model.isPaused = false;
    Model.overFlow = false;
    Model.canUpdate = true;
    Model.skipNextDrop = false;
    Model.hasFullLine = false;
    Model.firstChangeAfterShift = 0;
    return Model;
}());



/***/ }),

/***/ "./src/logic/View.ts":
/*!***************************!*\
  !*** ./src/logic/View.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/logic/config.ts");
/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Model */ "./src/logic/Model.ts");
/* harmony import */ var _GameSession__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameSession */ "./src/logic/GameSession.ts");



var View = /** @class */ (function () {
    function View() {
    }
    View.render = function (grid) {
        var flatGrid = grid.flat();
        View.cells.forEach(function (element, idx) {
            element.style.backgroundColor =
                flatGrid[idx] >= 1 ? _Model__WEBPACK_IMPORTED_MODULE_1__.Model.colors.flat()[idx] : "#ffd2558a";
            // if (flatGrid[idx] === 2) console.log(flatGrid[idx]);
        });
        // grey #212529
        View.updateScore();
    };
    View.init = function () {
        View.gameBoardElement = document.querySelector(".game-board");
        View.createGameBoard();
        View.cells = Array.from(document.querySelectorAll(".cell"));
        View.scoreElement = document.querySelector(".game-info .score");
    };
    View.createGameBoard = function () {
        View.gameBoardElement.style.width = _config__WEBPACK_IMPORTED_MODULE_0__.columns * _config__WEBPACK_IMPORTED_MODULE_0__.cellSize + "px";
        View.gameBoardElement.style.height = _config__WEBPACK_IMPORTED_MODULE_0__.rows * _config__WEBPACK_IMPORTED_MODULE_0__.cellSize + "px";
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < _config__WEBPACK_IMPORTED_MODULE_0__.rows; i++) {
            for (var j = 0; j < _config__WEBPACK_IMPORTED_MODULE_0__.columns; j++) {
                var cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                cellElement.style.width = _config__WEBPACK_IMPORTED_MODULE_0__.cellSize + "px";
                cellElement.style.height = _config__WEBPACK_IMPORTED_MODULE_0__.cellSize + "px";
                cellElement.style.left = j * _config__WEBPACK_IMPORTED_MODULE_0__.cellSize + "px";
                cellElement.style.top = i * _config__WEBPACK_IMPORTED_MODULE_0__.cellSize + "px";
                fragment.appendChild(cellElement);
            }
        }
        this.gameBoardElement.appendChild(fragment);
    };
    View.updateScore = function () {
        if (View.score < _GameSession__WEBPACK_IMPORTED_MODULE_2__.GameSession.score) {
            View.scoreElement.innerText = "Score:\n" + _GameSession__WEBPACK_IMPORTED_MODULE_2__.GameSession.score.toString();
            View.score = _GameSession__WEBPACK_IMPORTED_MODULE_2__.GameSession.score;
        }
    };
    View.score = 0;
    return View;
}());



/***/ }),

/***/ "./src/logic/colors.ts":
/*!*****************************!*\
  !*** ./src/logic/colors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colors: () => (/* binding */ colors)
/* harmony export */ });
var colors = ["#2681dbc9", "#007456", "pink", "orange", "brown", "grey"];


/***/ }),

/***/ "./src/logic/config.ts":
/*!*****************************!*\
  !*** ./src/logic/config.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cellSize: () => (/* binding */ cellSize),
/* harmony export */   columns: () => (/* binding */ columns),
/* harmony export */   rows: () => (/* binding */ rows)
/* harmony export */ });
var columns = 10;
var rows = 20;
var cellSize = 43;


/***/ }),

/***/ "./src/logic/shapes.ts":
/*!*****************************!*\
  !*** ./src/logic/shapes.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shapes: () => (/* binding */ shapes)
/* harmony export */ });
var shapes = [
    [[1, 1, 1, 1]],
    [
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
    ],
    [
        [1, 1],
        [1, 1],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
    ],
];
var newShapes = [
    [
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
    ],
];
var oldShapes = [
    [
        [0, 1],
        [1, 1],
        [1, 0],
    ],
    [
        [1, 0],
        [1, 0],
        [1, 1],
    ],
];


/***/ }),

/***/ "./src/logic/utils.ts":
/*!****************************!*\
  !*** ./src/logic/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomIntInclusive: () => (/* binding */ getRandomIntInclusive)
/* harmony export */ });
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic_Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic/Controller */ "./src/logic/Controller.ts");
/* harmony import */ var _logic_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/Model */ "./src/logic/Model.ts");
/* harmony import */ var _logic_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logic/View */ "./src/logic/View.ts");



_logic_View__WEBPACK_IMPORTED_MODULE_2__.View.init();
_logic_Controller__WEBPACK_IMPORTED_MODULE_0__.Controller.init();
_logic_Model__WEBPACK_IMPORTED_MODULE_1__.Model.init();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qyw2Q0FBUTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIscURBQVc7QUFDcEMsdURBQXVELHFEQUFXO0FBQ2xFLHlCQUF5QixxREFBVztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDZTs7Ozs7Ozs7Ozs7Ozs7O0FDaERUOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1Q087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ0pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0Q7QUFDVjtBQUNGO0FBQ3BDLDZDQUFJO0FBQ0oseURBQVU7QUFDViwrQ0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2xvZ2ljL0Jsb2NrLnRzIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2xvZ2ljL0NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvR2FtZVNlc3Npb24udHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvVmlldy50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC8uL3NyYy9sb2dpYy9jb2xvcnMudHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvY29uZmlnLnRzIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2xvZ2ljL3NoYXBlcy50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC8uL3NyYy9sb2dpYy91dGlscy50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbmltcG9ydCB7IHNoYXBlcyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgY29sdW1ucywgcm93cyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSBcIi4vY29sb3JzXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21JbnRJbmNsdXNpdmUgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG52YXIgQmxvY2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmxvY2soc2hhcGUsIGNvbG9yKSB7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5pc0ZpeGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuTW92ZUxlZnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhbk1vdmVSaWdodCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FuUm90YXRlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5jYWxjdWxhdGVTdGFydFhQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgIH1cbiAgICBCbG9jay5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNoYXBlID0gc2hhcGVzW2dldFJhbmRvbUludEluY2x1c2l2ZSgwLCBzaGFwZXMubGVuZ3RoIC0gMSldO1xuICAgICAgICB2YXIgY29sb3IgPSBjb2xvcnNbZ2V0UmFuZG9tSW50SW5jbHVzaXZlKDAsIGNvbG9ycy5sZW5ndGggLSAxKV07XG4gICAgICAgIHJldHVybiBuZXcgQmxvY2soc2hhcGUsIGNvbG9yKTtcbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdTaGFwZSA9IFtdO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gMCA/IDEgOiAwO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9yaWVudGF0aW9uKTtcbiAgICAgICAgLy8gdGhpcy54ID0gdGhpcy5jYWxjdWxhdGVYUG9zaXRpb24oKTtcbiAgICAgICAgLy8gdGhpcy55ID0gdGhpcy5jYWxjdWxhdGVZUG9zaXRpb24oKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuc2hhcGUubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zaGFwZVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnNoYXBlLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgICAgIG5ld1NoYXBlLnB1c2goW10pO1xuICAgICAgICAgICAgICAgIG5ld1NoYXBlW2pdLnB1c2godGhpcy5zaGFwZVtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMub3JpZW50YXRpb24gPT09IDAgPyB0aGlzLnNoYXBlLmxlbmd0aCA6IHRoaXMuc2hhcGVbMF0ubGVuZ3RoO1xuICAgICAgICAvLyB0aGlzLnggPSB0aGlzLmNhbGN1bGF0ZVhQb3NpdGlvbihsZW5ndGgpO1xuICAgICAgICAvLyB0aGlzLnkgPSB0aGlzLmNhbGN1bGF0ZVlQb3NpdGlvbihsZW5ndGgpO1xuICAgICAgICB0aGlzLmNoZWNrTWFyZ2luKG5ld1NoYXBlKTtcbiAgICAgICAgdGhpcy5jaGVja0hvcml6b250YWxBeGlzRHVyaW5nUm90YXRpb24obmV3U2hhcGUpO1xuICAgICAgICBpZiAodGhpcy5jYW5Sb3RhdGUpXG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gX19zcHJlYWRBcnJheShbXSwgbmV3U2hhcGUsIHRydWUpO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLm1vdmVMZWZ0ID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tIb3Jpem9udGFsQXhpcyhncmlkKSB8fCB0aGlzLmlzRml4ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuY2hlY2tNYXJnaW4odGhpcy5zaGFwZSk7XG4gICAgICAgIGlmICh0aGlzLmNhbk1vdmVMZWZ0KVxuICAgICAgICAgICAgdGhpcy54IC09IDE7XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUubW92ZVJpZ2h0ID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tIb3Jpem9udGFsQXhpcyhncmlkKSB8fCB0aGlzLmlzRml4ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuY2hlY2tNYXJnaW4odGhpcy5zaGFwZSk7XG4gICAgICAgIGlmICh0aGlzLmNhbk1vdmVSaWdodClcbiAgICAgICAgICAgIHRoaXMueCArPSAxO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmRyb3AgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICB0aGlzLmRldGVjdENvbGxpc2lvbihncmlkKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzRml4ZWQpXG4gICAgICAgICAgICB0aGlzLnkrKztcbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5jaGVja01hcmdpbiA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB0aGlzLmNhbk1vdmVMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYW5Nb3ZlUmlnaHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhblJvdGF0ZSA9IHRydWU7XG4gICAgICAgIHZhciBibG9ja0xlbmd0aCA9IHNoYXBlWzBdLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMueCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhbk1vdmVMZWZ0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCArIGJsb2NrTGVuZ3RoID49IGNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCArIGJsb2NrTGVuZ3RoIC0gMSA+PSBjb2x1bW5zKSB7XG4gICAgICAgICAgICB0aGlzLmNhblJvdGF0ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUuZGV0ZWN0Q29sbGlzaW9uID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgLy8gY2hlY2tzIHZlcnRpY2FsIGF4aXMgb25seVxuICAgICAgICB2YXIgYmxvY2tIZWlnaHQgPSB0aGlzLnNoYXBlLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMueSArIGJsb2NrSGVpZ2h0ID49IHJvd3MgfHwgdGhpcy5jaGVja1ZlcnRpY2FsQXhpcyhncmlkKSkge1xuICAgICAgICAgICAgdGhpcy5pc0ZpeGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Rml4ZWQoKTtcbiAgICAgICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJpbnRlcnZhbCBmaXhlZFwiKTtcbiAgICAgICAgICAgIFZpZXcucmVuZGVyKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgTW9kZWwuY3JlYXRlQmxvY2soKTtcbiAgICAgICAgICAgIE1vZGVsLmFjdGl2ZUJsb2NrLmlzRml4ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIENvbnRyb2xsZXIuc2V0Q2FuRHJvcChmYWxzZSk7XG4gICAgICAgICAgICAvLyByZWxhdGVkIHRvIENvbnRyb2xsZXIgY2xhc3Mgb25seSwgbm90aGluZyB0byB3b3JyeSBhYm91dFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIE1vZGVsLmNhblVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUuY2hlY2tWZXJ0aWNhbEF4aXMgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICB2YXIgaGFzQ29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgIHZhciB5UG9zaXRpb24gPSB0aGlzLnkgKyAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zaGFwZVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChncmlkW3lQb3NpdGlvbiArIGldW3RoaXMueCArIGpdID09PSAyICYmIHRoaXMuc2hhcGVbaV1bal0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0NvbGxpc2lvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNDb2xsaXNpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNDb2xsaXNpb247XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUuY2hlY2tIb3Jpem9udGFsQXhpcyA9IGZ1bmN0aW9uIChncmlkKSB7XG4gICAgICAgIHZhciBoYXNDb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgdmFyIHhQb3NpdGlvbiA9IHRoaXMueSArIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaGFwZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNoYXBlW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKChncmlkW3RoaXMueSArIGldW3RoaXMueCAtIDEgKyBqXSA9PT0gMiAmJiB0aGlzLnNoYXBlW2ldW2pdID4gMCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGdyaWRbdGhpcy55ICsgaV1bdGhpcy54ICsgMSArIGpdID09PSAyICYmIHRoaXMuc2hhcGVbaV1bal0gPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICBoYXNDb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzQ29sbGlzaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzQ29sbGlzaW9uO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmNoZWNrSG9yaXpvbnRhbEF4aXNEdXJpbmdSb3RhdGlvbiA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB2YXIgaGFzQ29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2hhcGVbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKE1vZGVsLmdyaWRbdGhpcy55ICsgaV1bdGhpcy54IC0gMSArIGpdID09PSAyICYmIHNoYXBlW2ldW2pdID4gMCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKE1vZGVsLmdyaWRbdGhpcy55ICsgaV1bdGhpcy54ICsgMSArIGpdID09PSAyICYmIHNoYXBlW2ldW2pdID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzQ29sbGlzaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5Sb3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLnNldEZpeGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zaGFwZVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlW2ldW2pdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbaV1bal0gPSAyO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNvbWV0aGluZyB3ZW50IHdyb25nXCIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmZpeE92ZXJsYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaGFwZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNoYXBlW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGVbaV1bal0gPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZVtpXVtqXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUuY2FsY3VsYXRlU3RhcnRYUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjb2x1bW5zIC8gMiAtIE1hdGgucm91bmQodGhpcy5zaGFwZVswXS5sZW5ndGggLyAyKTtcbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5jYWxjdWxhdGVYUG9zaXRpb24gPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMueCAtIE1hdGguZmxvb3IobGVuZ3RoIC8gMik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnggKyBNYXRoLmZsb29yKGxlbmd0aCAvIDIpO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmNhbGN1bGF0ZVlQb3NpdGlvbiA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdGhpcy55ICsgTWF0aC5mbG9vcihsZW5ndGggLyAyKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMueSAtIE1hdGguZmxvb3IobGVuZ3RoIC8gMik7XG4gICAgfTtcbiAgICByZXR1cm4gQmxvY2s7XG59KCkpO1xuZXhwb3J0IHsgQmxvY2sgfTtcbiIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG52YXIgQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250cm9sbGVyKCkge1xuICAgIH1cbiAgICBDb250cm9sbGVyLnNldENhbkRyb3AgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmICFDb250cm9sbGVyLmRvd25QcmVzc2VkKSB7XG4gICAgICAgICAgICBDb250cm9sbGVyLmNhbkRyb3AgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsdWUpXG4gICAgICAgICAgICBDb250cm9sbGVyLmNhbkRyb3AgPSBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRyb2xsZXIuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgICAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2subW92ZUxlZnQoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICAgICAgTW9kZWwudXBkYXRlR3JpZChcIkFycm93UmlnaHRcIik7XG4gICAgICAgICAgICAgICAgVmlldy5yZW5kZXIoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgICAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2subW92ZVJpZ2h0KE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJBcnJvd1JpZ2h0XCIpO1xuICAgICAgICAgICAgICAgIFZpZXcucmVuZGVyKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICAgICAgICAgICAgQ29udHJvbGxlci5kb3duUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKENvbnRyb2xsZXIuY2FuRHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC5hY3RpdmVCbG9jay5kcm9wKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC51cGRhdGVHcmlkKFwiQXJyb3dEb3duXCIpO1xuICAgICAgICAgICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5jb2RlID09PSBcIlNwYWNlXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNwYWNlXCIpO1xuICAgICAgICAgICAgICAgIE1vZGVsLmFjdGl2ZUJsb2NrLnJvdGF0ZSgpO1xuICAgICAgICAgICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJzcGFjZVwiKTtcbiAgICAgICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgTW9kZWwuY2FuVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBNb2RlbC5jbGVhckFsbCgpO1xuICAgICAgICAgICAgICAgIC8vIE1vZGVsLnVwZGF0ZUJsb2NrUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIENvbnRyb2xsZXIuY2FuRHJvcCA9IHRydWU7XG4gICAgICAgICAgICBDb250cm9sbGVyLmRvd25QcmVzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICAgICAgICAgICAgQ29udHJvbGxlci5jYW5Ecm9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBDb250cm9sbGVyLmRvd25QcmVzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJrZXl1cFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb250cm9sbGVyLmNhbkRyb3AgPSB0cnVlO1xuICAgIENvbnRyb2xsZXIuZG93blByZXNzZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKSk7XG5leHBvcnQgeyBDb250cm9sbGVyIH07XG4iLCJ2YXIgR2FtZVNlc3Npb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR2FtZVNlc3Npb24oKSB7XG4gICAgfVxuICAgIEdhbWVTZXNzaW9uLmluY3JlYXNlU2NvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIEdhbWVTZXNzaW9uLnNjb3JlICs9IDEwMDtcbiAgICB9O1xuICAgIEdhbWVTZXNzaW9uLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIEdhbWVTZXNzaW9uLnByb3RvdHlwZS5wYXVzZVNlc3Npb24gPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgR2FtZVNlc3Npb24uc2NvcmUgPSAwO1xuICAgIEdhbWVTZXNzaW9uLnRpbWVyID0gXCIwMDowMFwiO1xuICAgIEdhbWVTZXNzaW9uLnBhdXNlZCA9IGZhbHNlO1xuICAgIEdhbWVTZXNzaW9uLmxldmVsID0gMTtcbiAgICByZXR1cm4gR2FtZVNlc3Npb247XG59KCkpO1xuZXhwb3J0IHsgR2FtZVNlc3Npb24gfTtcbiIsImltcG9ydCB7IEJsb2NrIH0gZnJvbSBcIi4vQmxvY2tcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG5pbXBvcnQgeyBjb2x1bW5zLCByb3dzIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBHYW1lU2Vzc2lvbiB9IGZyb20gXCIuL0dhbWVTZXNzaW9uXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4vQ29udHJvbGxlclwiO1xudmFyIE1vZGVsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vZGVsKCkge1xuICAgIH1cbiAgICBNb2RlbC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBNb2RlbC5zdG9wU2Vzc2lvbik7XG4gICAgICAgIE1vZGVsLmZpbGxHcmlkKCk7XG4gICAgICAgIE1vZGVsLmNyZWF0ZUJsb2NrKCk7XG4gICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJpbml0XCIpO1xuICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgTW9kZWwudGltZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChNb2RlbC5pc1BhdXNlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgIGlmIChmYWxzZSkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZGVsLmNhblVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC51cGRhdGVHcmlkKFwiaW50ZXJ2YWxcIik7XG4gICAgICAgICAgICAgICAgICAgIFZpZXcucmVuZGVyKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC5hY3RpdmVCbG9jay5kcm9wKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBNb2RlbC5jYW5VcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA0MDApO1xuICAgIH07XG4gICAgTW9kZWwuZmlsbEdyaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgICBNb2RlbC5ncmlkLnB1c2goW10pO1xuICAgICAgICAgICAgTW9kZWwuY29sb3JzLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICBNb2RlbC5ncmlkW2ldLnB1c2goMCk7XG4gICAgICAgICAgICAgICAgTW9kZWwuY29sb3JzW2ldLnB1c2goXCJ0cmFuc3BhcmVudFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kZWwubG9vcCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBNb2RlbC5jcmVhdGVCbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2sgPSBCbG9jay5nZW5lcmF0ZSgpO1xuICAgICAgICBDb250cm9sbGVyLnNldENhbkRyb3AodHJ1ZSk7XG4gICAgfTtcbiAgICBNb2RlbC5jbGVhckdyaWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTW9kZWwuZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBNb2RlbC5ncmlkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZGVsLmdyaWRbaV1bal0gIT09IDIpXG4gICAgICAgICAgICAgICAgICAgIE1vZGVsLmdyaWRbaV1bal0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RlbC5jbGVhckFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBNb2RlbC5ncmlkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IE1vZGVsLmdyaWRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBNb2RlbC5ncmlkW2ldW2pdID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kZWwudXBkYXRlQmxvY2tQb3NpdGlvbiA9IGZ1bmN0aW9uIChob3N0KSB7XG4gICAgICAgIC8vIGlmIChNb2RlbC5jYW5VcGRhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vICAgICBNb2RlbC5jYW5VcGRhdGUgPSB0cnVlO1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgICAgIHZhciBibG9jayA9IE1vZGVsLmFjdGl2ZUJsb2NrO1xuICAgICAgICBpZiAoYmxvY2sueSA9PT0gMCAmJiBibG9jay5zaGFwZVswXS5pbmNsdWRlcygyKSkge1xuICAgICAgICAgICAgYmxvY2suZml4T3ZlcmxhcCgpO1xuICAgICAgICAgICAgYmxvY2suaXNGaXhlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2suc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYmxvY2suc2hhcGVbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoTW9kZWwuZ3JpZFtibG9jay55ICsgaV1bYmxvY2sueCArIGpdICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZGVsLmdyaWRbYmxvY2sueSArIGldW2Jsb2NrLnggKyBqXSA9IGJsb2NrLnNoYXBlW2ldW2pdO1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC5jb2xvcnNbYmxvY2sueSArIGldW2Jsb2NrLnggKyBqXSA9IGJsb2NrLmNvbG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBNb2RlbC5maXJzdENoYW5nZUFmdGVyU2hpZnQrKztcbiAgICAgICAgLy8gY29uc29sZS5sb2coTW9kZWwuZmlyc3RDaGFuZ2VBZnRlclNoaWZ0LCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KE1vZGVsLmdyaWQpKSwgaG9zdCk7XG4gICAgfTtcbiAgICBNb2RlbC5jaGVja0Z1bGxMaW5lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RlbC5oYXNGdWxsTGluZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1vZGVsLmdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBmdWxsTGluZSA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IE1vZGVsLmdyaWRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoTW9kZWwuZ3JpZFtpXVtqXSAhPT0gMilcbiAgICAgICAgICAgICAgICAgICAgZnVsbExpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmdWxsTGluZSkge1xuICAgICAgICAgICAgICAgIE1vZGVsLmhhc0Z1bGxMaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgYmVmb3JlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShNb2RlbC5ncmlkKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGdWxsIGxpbmUhIEJlZm9yZVwiLCBiZWZvcmUpO1xuICAgICAgICAgICAgICAgIEdhbWVTZXNzaW9uLmluY3JlYXNlU2NvcmUoKTtcbiAgICAgICAgICAgICAgICBNb2RlbC5jYW5VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBNb2RlbC5zaGlmdExpbmUoaSk7XG4gICAgICAgICAgICAgICAgTW9kZWwuZmlyc3RDaGFuZ2VBZnRlclNoaWZ0ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgYWZ0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KE1vZGVsLmdyaWQpKTtcbiAgICAgICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZ1bGwgbGluZSEgYWZ0ZXJcIiwgYWZ0ZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kZWwuY2hlY2tPdmVyZmxvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdyaWRMYXN0SWR4ID0gTW9kZWwuZ3JpZC5sZW5ndGggLSAxO1xuICAgICAgICBNb2RlbC5ncmlkWzBdLmluY2x1ZGVzKDEpO1xuICAgICAgICBNb2RlbC5zdG9wU2Vzc2lvbigpO1xuICAgIH07XG4gICAgTW9kZWwudXBkYXRlR3JpZCA9IGZ1bmN0aW9uIChob3N0KSB7XG4gICAgICAgIE1vZGVsLmNoZWNrRnVsbExpbmUoKTtcbiAgICAgICAgTW9kZWwuY2xlYXJHcmlkKCk7XG4gICAgICAgIE1vZGVsLnVwZGF0ZUJsb2NrUG9zaXRpb24oaG9zdCk7XG4gICAgfTtcbiAgICBNb2RlbC5zaGlmdExpbmUgPSBmdW5jdGlvbiAoaWR4KSB7XG4gICAgICAgIHZhciBncmlkTGFzdElkeCA9IE1vZGVsLmdyaWQubGVuZ3RoIC0gMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IGlkeDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IE1vZGVsLmdyaWRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8PSBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuZ3JpZFtpXVtqXSA9IE1vZGVsLmdyaWRbaSAtIDFdW2pdO1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC5jb2xvcnNbaV1bal0gPSBNb2RlbC5jb2xvcnNbaSAtIDFdW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kZWwuc3RvcFNlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZGVsLmlzUGF1c2VkID0gIU1vZGVsLmlzUGF1c2VkO1xuICAgIH07XG4gICAgTW9kZWwucHJvdG90eXBlLmFwcGx5Q2hhbmdlcyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBNb2RlbC5idWdMb2dnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTW9kZWwuZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBNb2RlbC5ncmlkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZGVsLmdyaWRbaV1bal0gPT09IDIgJiZcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2sueSArIE1vZGVsLmFjdGl2ZUJsb2NrLnNoYXBlWzBdLmxlbmd0aCA8IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShNb2RlbC5ncmlkKSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RlbC5ncmlkID0gW107XG4gICAgTW9kZWwuY29sb3JzID0gW107XG4gICAgTW9kZWwuaXNQYXVzZWQgPSBmYWxzZTtcbiAgICBNb2RlbC5vdmVyRmxvdyA9IGZhbHNlO1xuICAgIE1vZGVsLmNhblVwZGF0ZSA9IHRydWU7XG4gICAgTW9kZWwuc2tpcE5leHREcm9wID0gZmFsc2U7XG4gICAgTW9kZWwuaGFzRnVsbExpbmUgPSBmYWxzZTtcbiAgICBNb2RlbC5maXJzdENoYW5nZUFmdGVyU2hpZnQgPSAwO1xuICAgIHJldHVybiBNb2RlbDtcbn0oKSk7XG5leHBvcnQgeyBNb2RlbCB9O1xuIiwiaW1wb3J0IHsgY29sdW1ucywgcm93cywgY2VsbFNpemUgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcbmltcG9ydCB7IEdhbWVTZXNzaW9uIH0gZnJvbSBcIi4vR2FtZVNlc3Npb25cIjtcbnZhciBWaWV3ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFZpZXcoKSB7XG4gICAgfVxuICAgIFZpZXcucmVuZGVyID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgdmFyIGZsYXRHcmlkID0gZ3JpZC5mbGF0KCk7XG4gICAgICAgIFZpZXcuY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCwgaWR4KSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgICAgZmxhdEdyaWRbaWR4XSA+PSAxID8gTW9kZWwuY29sb3JzLmZsYXQoKVtpZHhdIDogXCIjZmZkMjU1OGFcIjtcbiAgICAgICAgICAgIC8vIGlmIChmbGF0R3JpZFtpZHhdID09PSAyKSBjb25zb2xlLmxvZyhmbGF0R3JpZFtpZHhdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGdyZXkgIzIxMjUyOVxuICAgICAgICBWaWV3LnVwZGF0ZVNjb3JlKCk7XG4gICAgfTtcbiAgICBWaWV3LmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFZpZXcuZ2FtZUJvYXJkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1ib2FyZFwiKTtcbiAgICAgICAgVmlldy5jcmVhdGVHYW1lQm9hcmQoKTtcbiAgICAgICAgVmlldy5jZWxscyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpKTtcbiAgICAgICAgVmlldy5zY29yZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtaW5mbyAuc2NvcmVcIik7XG4gICAgfTtcbiAgICBWaWV3LmNyZWF0ZUdhbWVCb2FyZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgVmlldy5nYW1lQm9hcmRFbGVtZW50LnN0eWxlLndpZHRoID0gY29sdW1ucyAqIGNlbGxTaXplICsgXCJweFwiO1xuICAgICAgICBWaWV3LmdhbWVCb2FyZEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcm93cyAqIGNlbGxTaXplICsgXCJweFwiO1xuICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUud2lkdGggPSBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS5sZWZ0ID0gaiAqIGNlbGxTaXplICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50LnN0eWxlLnRvcCA9IGkgKiBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lQm9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICB9O1xuICAgIFZpZXcudXBkYXRlU2NvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChWaWV3LnNjb3JlIDwgR2FtZVNlc3Npb24uc2NvcmUpIHtcbiAgICAgICAgICAgIFZpZXcuc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IFwiU2NvcmU6XFxuXCIgKyBHYW1lU2Vzc2lvbi5zY29yZS50b1N0cmluZygpO1xuICAgICAgICAgICAgVmlldy5zY29yZSA9IEdhbWVTZXNzaW9uLnNjb3JlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBWaWV3LnNjb3JlID0gMDtcbiAgICByZXR1cm4gVmlldztcbn0oKSk7XG5leHBvcnQgeyBWaWV3IH07XG4iLCJleHBvcnQgdmFyIGNvbG9ycyA9IFtcIiMyNjgxZGJjOVwiLCBcIiMwMDc0NTZcIiwgXCJwaW5rXCIsIFwib3JhbmdlXCIsIFwiYnJvd25cIiwgXCJncmV5XCJdO1xuIiwiZXhwb3J0IHZhciBjb2x1bW5zID0gMTA7XG5leHBvcnQgdmFyIHJvd3MgPSAyMDtcbmV4cG9ydCB2YXIgY2VsbFNpemUgPSA0MztcbiIsImV4cG9ydCB2YXIgc2hhcGVzID0gW1xuICAgIFtbMSwgMSwgMSwgMV1dLFxuICAgIFtcbiAgICAgICAgWzEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMV0sXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDFdLFxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMV0sXG4gICAgICAgIFsxLCAxXSxcbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMV0sXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxXSxcbiAgICAgICAgWzEsIDEsIDFdLFxuICAgIF0sXG5dO1xudmFyIG5ld1NoYXBlcyA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDFdLFxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMV0sXG4gICAgICAgIFsxLCAxLCAxXSxcbiAgICBdLFxuXTtcbnZhciBvbGRTaGFwZXMgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMV0sXG4gICAgICAgIFsxLCAxXSxcbiAgICAgICAgWzEsIDBdLFxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMF0sXG4gICAgICAgIFsxLCAwXSxcbiAgICAgICAgWzEsIDFdLFxuICAgIF0sXG5dO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbUludEluY2x1c2l2ZShtaW4sIG1heCkge1xuICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuL2xvZ2ljL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vbG9naWMvTW9kZWxcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9sb2dpYy9WaWV3XCI7XG5WaWV3LmluaXQoKTtcbkNvbnRyb2xsZXIuaW5pdCgpO1xuTW9kZWwuaW5pdCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9

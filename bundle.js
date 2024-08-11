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
        this.isFixed = false;
        this.canMoveLeft = true;
        this.canMoveRight = true;
        this.canRotate = true;
        this.x = 4;
        this.y = 0;
    }
    Block.generate = function () {
        var shape = _shapes__WEBPACK_IMPORTED_MODULE_0__.shapes[(0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRandomIntInclusive)(0, _shapes__WEBPACK_IMPORTED_MODULE_0__.shapes.length - 1)];
        var color = _colors__WEBPACK_IMPORTED_MODULE_2__.colors[(0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRandomIntInclusive)(0, _colors__WEBPACK_IMPORTED_MODULE_2__.colors.length - 1)];
        return new Block(shape, color);
    };
    Block.prototype.rotate = function () {
        var newShape = [];
        for (var i = this.shape.length - 1; i >= 0; i--) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (i === this.shape.length - 1)
                    newShape.push([]);
                newShape[j].push(this.shape[i][j]);
            }
        }
        this.checkMargin(newShape);
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
        }, 300);
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
        if (block.y === 0 && block.shape[0].includes(2))
            block.fixOverlap();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hCTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05nRDtBQUNWO0FBQ0Y7QUFDcEMsNkNBQUk7QUFDSix5REFBVTtBQUNWLCtDQUFLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvQmxvY2sudHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC8uL3NyYy9sb2dpYy9HYW1lU2Vzc2lvbi50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC8uL3NyYy9sb2dpYy9Nb2RlbC50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC8uL3NyYy9sb2dpYy9WaWV3LnRzIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2xvZ2ljL2NvbG9ycy50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC8uL3NyYy9sb2dpYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvc2hhcGVzLnRzIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2xvZ2ljL3V0aWxzLnRzIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59O1xuaW1wb3J0IHsgc2hhcGVzIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG5pbXBvcnQgeyBjb2x1bW5zLCByb3dzIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBjb2xvcnMgfSBmcm9tIFwiLi9jb2xvcnNcIjtcbmltcG9ydCB7IGdldFJhbmRvbUludEluY2x1c2l2ZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4vQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9Nb2RlbFwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIjtcbnZhciBCbG9jayA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCbG9jayhzaGFwZSwgY29sb3IpIHtcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuaXNGaXhlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbk1vdmVMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYW5Nb3ZlUmlnaHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhblJvdGF0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMueCA9IDQ7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgfVxuICAgIEJsb2NrLmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2hhcGUgPSBzaGFwZXNbZ2V0UmFuZG9tSW50SW5jbHVzaXZlKDAsIHNoYXBlcy5sZW5ndGggLSAxKV07XG4gICAgICAgIHZhciBjb2xvciA9IGNvbG9yc1tnZXRSYW5kb21JbnRJbmNsdXNpdmUoMCwgY29sb3JzLmxlbmd0aCAtIDEpXTtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9jayhzaGFwZSwgY29sb3IpO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5ld1NoYXBlID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnNoYXBlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuc2hhcGVbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5zaGFwZS5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgICAgICBuZXdTaGFwZS5wdXNoKFtdKTtcbiAgICAgICAgICAgICAgICBuZXdTaGFwZVtqXS5wdXNoKHRoaXMuc2hhcGVbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tNYXJnaW4obmV3U2hhcGUpO1xuICAgICAgICBpZiAodGhpcy5jYW5Sb3RhdGUpXG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gX19zcHJlYWRBcnJheShbXSwgbmV3U2hhcGUsIHRydWUpO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLm1vdmVMZWZ0ID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tIb3Jpem9udGFsQXhpcyhncmlkKSB8fCB0aGlzLmlzRml4ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuY2hlY2tNYXJnaW4odGhpcy5zaGFwZSk7XG4gICAgICAgIGlmICh0aGlzLmNhbk1vdmVMZWZ0KVxuICAgICAgICAgICAgdGhpcy54IC09IDE7XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUubW92ZVJpZ2h0ID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tIb3Jpem9udGFsQXhpcyhncmlkKSB8fCB0aGlzLmlzRml4ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuY2hlY2tNYXJnaW4odGhpcy5zaGFwZSk7XG4gICAgICAgIGlmICh0aGlzLmNhbk1vdmVSaWdodClcbiAgICAgICAgICAgIHRoaXMueCArPSAxO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmRyb3AgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICB0aGlzLmRldGVjdENvbGxpc2lvbihncmlkKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzRml4ZWQpXG4gICAgICAgICAgICB0aGlzLnkrKztcbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5jaGVja01hcmdpbiA9IGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICB0aGlzLmNhbk1vdmVMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYW5Nb3ZlUmlnaHQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhblJvdGF0ZSA9IHRydWU7XG4gICAgICAgIHZhciBibG9ja0xlbmd0aCA9IHNoYXBlWzBdLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMueCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhbk1vdmVMZWZ0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCArIGJsb2NrTGVuZ3RoID49IGNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCArIGJsb2NrTGVuZ3RoIC0gMSA+PSBjb2x1bW5zKSB7XG4gICAgICAgICAgICB0aGlzLmNhblJvdGF0ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUuZGV0ZWN0Q29sbGlzaW9uID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgLy8gY2hlY2tzIHZlcnRpY2FsIGF4aXMgb25seVxuICAgICAgICB2YXIgYmxvY2tIZWlnaHQgPSB0aGlzLnNoYXBlLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMueSArIGJsb2NrSGVpZ2h0ID49IHJvd3MgfHwgdGhpcy5jaGVja1ZlcnRpY2FsQXhpcyhncmlkKSkge1xuICAgICAgICAgICAgdGhpcy5pc0ZpeGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Rml4ZWQoKTtcbiAgICAgICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJpbnRlcnZhbCBmaXhlZFwiKTtcbiAgICAgICAgICAgIFZpZXcucmVuZGVyKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgTW9kZWwuY3JlYXRlQmxvY2soKTtcbiAgICAgICAgICAgIENvbnRyb2xsZXIuc2V0Q2FuRHJvcChmYWxzZSk7XG4gICAgICAgICAgICAvLyByZWxhdGVkIHRvIENvbnRyb2xsZXIgY2xhc3Mgb25seSwgbm90aGluZyB0byB3b3JyeSBhYm91dFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIE1vZGVsLmNhblVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUuY2hlY2tWZXJ0aWNhbEF4aXMgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICB2YXIgaGFzQ29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgIHZhciB5UG9zaXRpb24gPSB0aGlzLnkgKyAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zaGFwZVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChncmlkW3lQb3NpdGlvbiArIGldW3RoaXMueCArIGpdID09PSAyICYmIHRoaXMuc2hhcGVbaV1bal0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0NvbGxpc2lvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNDb2xsaXNpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNDb2xsaXNpb247XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUuY2hlY2tIb3Jpem9udGFsQXhpcyA9IGZ1bmN0aW9uIChncmlkKSB7XG4gICAgICAgIHZhciBoYXNDb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgdmFyIHhQb3NpdGlvbiA9IHRoaXMueSArIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaGFwZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNoYXBlW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKChncmlkW3RoaXMueSArIGldW3RoaXMueCAtIDEgKyBqXSA9PT0gMiAmJiB0aGlzLnNoYXBlW2ldW2pdID4gMCkgfHxcbiAgICAgICAgICAgICAgICAgICAgKGdyaWRbdGhpcy55ICsgaV1bdGhpcy54ICsgMSArIGpdID09PSAyICYmIHRoaXMuc2hhcGVbaV1bal0gPiAwKSkge1xuICAgICAgICAgICAgICAgICAgICBoYXNDb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzQ29sbGlzaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzQ29sbGlzaW9uO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLnNldEZpeGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zaGFwZVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlW2ldW2pdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbaV1bal0gPSAyO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNvbWV0aGluZyB3ZW50IHdyb25nXCIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmZpeE92ZXJsYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaGFwZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNoYXBlW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGVbaV1bal0gPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZVtpXVtqXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQmxvY2s7XG59KCkpO1xuZXhwb3J0IHsgQmxvY2sgfTtcbiIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG52YXIgQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb250cm9sbGVyKCkge1xuICAgIH1cbiAgICBDb250cm9sbGVyLnNldENhbkRyb3AgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmICFDb250cm9sbGVyLmRvd25QcmVzc2VkKSB7XG4gICAgICAgICAgICBDb250cm9sbGVyLmNhbkRyb3AgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsdWUpXG4gICAgICAgICAgICBDb250cm9sbGVyLmNhbkRyb3AgPSBmYWxzZTtcbiAgICB9O1xuICAgIENvbnRyb2xsZXIuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgICAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2subW92ZUxlZnQoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICAgICAgTW9kZWwudXBkYXRlR3JpZChcIkFycm93UmlnaHRcIik7XG4gICAgICAgICAgICAgICAgVmlldy5yZW5kZXIoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgICAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2subW92ZVJpZ2h0KE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJBcnJvd1JpZ2h0XCIpO1xuICAgICAgICAgICAgICAgIFZpZXcucmVuZGVyKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICAgICAgICAgICAgQ29udHJvbGxlci5kb3duUHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKENvbnRyb2xsZXIuY2FuRHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC5hY3RpdmVCbG9jay5kcm9wKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC51cGRhdGVHcmlkKFwiQXJyb3dEb3duXCIpO1xuICAgICAgICAgICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5jb2RlID09PSBcIlNwYWNlXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNwYWNlXCIpO1xuICAgICAgICAgICAgICAgIE1vZGVsLmFjdGl2ZUJsb2NrLnJvdGF0ZSgpO1xuICAgICAgICAgICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJzcGFjZVwiKTtcbiAgICAgICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgTW9kZWwuY2FuVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBNb2RlbC5jbGVhckFsbCgpO1xuICAgICAgICAgICAgICAgIC8vIE1vZGVsLnVwZGF0ZUJsb2NrUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIpIHtcbiAgICAgICAgICAgICAgICBDb250cm9sbGVyLmNhbkRyb3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgIENvbnRyb2xsZXIuZG93blByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImtleXVwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbnRyb2xsZXIuY2FuRHJvcCA9IHRydWU7XG4gICAgQ29udHJvbGxlci5kb3duUHJlc3NlZCA9IGZhbHNlO1xuICAgIHJldHVybiBDb250cm9sbGVyO1xufSgpKTtcbmV4cG9ydCB7IENvbnRyb2xsZXIgfTtcbiIsInZhciBHYW1lU2Vzc2lvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHYW1lU2Vzc2lvbigpIHtcbiAgICB9XG4gICAgR2FtZVNlc3Npb24uaW5jcmVhc2VTY29yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgR2FtZVNlc3Npb24uc2NvcmUgKz0gMTAwO1xuICAgIH07XG4gICAgR2FtZVNlc3Npb24ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgR2FtZVNlc3Npb24ucHJvdG90eXBlLnBhdXNlU2Vzc2lvbiA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBHYW1lU2Vzc2lvbi5zY29yZSA9IDA7XG4gICAgR2FtZVNlc3Npb24udGltZXIgPSBcIjAwOjAwXCI7XG4gICAgR2FtZVNlc3Npb24ucGF1c2VkID0gZmFsc2U7XG4gICAgR2FtZVNlc3Npb24ubGV2ZWwgPSAxO1xuICAgIHJldHVybiBHYW1lU2Vzc2lvbjtcbn0oKSk7XG5leHBvcnQgeyBHYW1lU2Vzc2lvbiB9O1xuIiwiaW1wb3J0IHsgQmxvY2sgfSBmcm9tIFwiLi9CbG9ja1wiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL1ZpZXdcIjtcbmltcG9ydCB7IGNvbHVtbnMsIHJvd3MgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IEdhbWVTZXNzaW9uIH0gZnJvbSBcIi4vR2FtZVNlc3Npb25cIjtcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tIFwiLi9Db250cm9sbGVyXCI7XG52YXIgTW9kZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9kZWwoKSB7XG4gICAgfVxuICAgIE1vZGVsLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIE1vZGVsLnN0b3BTZXNzaW9uKTtcbiAgICAgICAgTW9kZWwuZmlsbEdyaWQoKTtcbiAgICAgICAgTW9kZWwuY3JlYXRlQmxvY2soKTtcbiAgICAgICAgTW9kZWwudXBkYXRlR3JpZChcImluaXRcIik7XG4gICAgICAgIFZpZXcucmVuZGVyKE1vZGVsLmdyaWQpO1xuICAgICAgICBNb2RlbC50aW1lcklkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKE1vZGVsLmlzUGF1c2VkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgaWYgKGZhbHNlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoTW9kZWwuY2FuVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJpbnRlcnZhbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgVmlldy5yZW5kZXIoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICAgICAgICAgIE1vZGVsLmFjdGl2ZUJsb2NrLmRyb3AoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIE1vZGVsLmNhblVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfTtcbiAgICBNb2RlbC5maWxsR3JpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgICAgICAgIE1vZGVsLmdyaWQucHVzaChbXSk7XG4gICAgICAgICAgICBNb2RlbC5jb2xvcnMucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIE1vZGVsLmdyaWRbaV0ucHVzaCgwKTtcbiAgICAgICAgICAgICAgICBNb2RlbC5jb2xvcnNbaV0ucHVzaChcInRyYW5zcGFyZW50XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RlbC5sb29wID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIE1vZGVsLmNyZWF0ZUJsb2NrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RlbC5hY3RpdmVCbG9jayA9IEJsb2NrLmdlbmVyYXRlKCk7XG4gICAgICAgIENvbnRyb2xsZXIuc2V0Q2FuRHJvcCh0cnVlKTtcbiAgICB9O1xuICAgIE1vZGVsLmNsZWFyR3JpZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBNb2RlbC5ncmlkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IE1vZGVsLmdyaWRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoTW9kZWwuZ3JpZFtpXVtqXSAhPT0gMilcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuZ3JpZFtpXVtqXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGVsLmNsZWFyQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1vZGVsLmdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgTW9kZWwuZ3JpZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIE1vZGVsLmdyaWRbaV1bal0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RlbC51cGRhdGVCbG9ja1Bvc2l0aW9uID0gZnVuY3Rpb24gKGhvc3QpIHtcbiAgICAgICAgLy8gaWYgKE1vZGVsLmNhblVwZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gICAgIE1vZGVsLmNhblVwZGF0ZSA9IHRydWU7XG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cbiAgICAgICAgdmFyIGJsb2NrID0gTW9kZWwuYWN0aXZlQmxvY2s7XG4gICAgICAgIGlmIChibG9jay55ID09PSAwICYmIGJsb2NrLnNoYXBlWzBdLmluY2x1ZGVzKDIpKVxuICAgICAgICAgICAgYmxvY2suZml4T3ZlcmxhcCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrLnNoYXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJsb2NrLnNoYXBlW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZGVsLmdyaWRbYmxvY2sueSArIGldW2Jsb2NrLnggKyBqXSAhPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC5ncmlkW2Jsb2NrLnkgKyBpXVtibG9jay54ICsgal0gPSBibG9jay5zaGFwZVtpXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuY29sb3JzW2Jsb2NrLnkgKyBpXVtibG9jay54ICsgal0gPSBibG9jay5jb2xvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgTW9kZWwuZmlyc3RDaGFuZ2VBZnRlclNoaWZ0Kys7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKE1vZGVsLmZpcnN0Q2hhbmdlQWZ0ZXJTaGlmdCwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShNb2RlbC5ncmlkKSksIGhvc3QpO1xuICAgIH07XG4gICAgTW9kZWwuY2hlY2tGdWxsTGluZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgTW9kZWwuaGFzRnVsbExpbmUgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBNb2RlbC5ncmlkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZnVsbExpbmUgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBNb2RlbC5ncmlkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZGVsLmdyaWRbaV1bal0gIT09IDIpXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxMaW5lID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnVsbExpbmUpIHtcbiAgICAgICAgICAgICAgICBNb2RlbC5oYXNGdWxsTGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIGJlZm9yZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoTW9kZWwuZ3JpZCkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRnVsbCBsaW5lISBCZWZvcmVcIiwgYmVmb3JlKTtcbiAgICAgICAgICAgICAgICBHYW1lU2Vzc2lvbi5pbmNyZWFzZVNjb3JlKCk7XG4gICAgICAgICAgICAgICAgTW9kZWwuY2FuVXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgTW9kZWwuc2hpZnRMaW5lKGkpO1xuICAgICAgICAgICAgICAgIE1vZGVsLmZpcnN0Q2hhbmdlQWZ0ZXJTaGlmdCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGFmdGVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShNb2RlbC5ncmlkKSk7XG4gICAgICAgICAgICAgICAgVmlldy5yZW5kZXIoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGdWxsIGxpbmUhIGFmdGVyXCIsIGFmdGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGVsLmNoZWNrT3ZlcmZsb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBncmlkTGFzdElkeCA9IE1vZGVsLmdyaWQubGVuZ3RoIC0gMTtcbiAgICAgICAgTW9kZWwuZ3JpZFswXS5pbmNsdWRlcygxKTtcbiAgICAgICAgTW9kZWwuc3RvcFNlc3Npb24oKTtcbiAgICB9O1xuICAgIE1vZGVsLnVwZGF0ZUdyaWQgPSBmdW5jdGlvbiAoaG9zdCkge1xuICAgICAgICBNb2RlbC5jaGVja0Z1bGxMaW5lKCk7XG4gICAgICAgIE1vZGVsLmNsZWFyR3JpZCgpO1xuICAgICAgICBNb2RlbC51cGRhdGVCbG9ja1Bvc2l0aW9uKGhvc3QpO1xuICAgIH07XG4gICAgTW9kZWwuc2hpZnRMaW5lID0gZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICB2YXIgZ3JpZExhc3RJZHggPSBNb2RlbC5ncmlkLmxlbmd0aCAtIDE7XG4gICAgICAgIGZvciAodmFyIGkgPSBpZHg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmIChpID09PSAwKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBNb2RlbC5ncmlkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPD0gaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZGVsLmdyaWRbaV1bal0gPSBNb2RlbC5ncmlkW2kgLSAxXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuY29sb3JzW2ldW2pdID0gTW9kZWwuY29sb3JzW2kgLSAxXVtqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGVsLnN0b3BTZXNzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RlbC5pc1BhdXNlZCA9ICFNb2RlbC5pc1BhdXNlZDtcbiAgICB9O1xuICAgIE1vZGVsLnByb3RvdHlwZS5hcHBseUNoYW5nZXMgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgTW9kZWwuYnVnTG9nZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1vZGVsLmdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgTW9kZWwuZ3JpZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChNb2RlbC5ncmlkW2ldW2pdID09PSAyICYmXG4gICAgICAgICAgICAgICAgICAgIE1vZGVsLmFjdGl2ZUJsb2NrLnkgKyBNb2RlbC5hY3RpdmVCbG9jay5zaGFwZVswXS5sZW5ndGggPCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoTW9kZWwuZ3JpZCkpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kZWwuZ3JpZCA9IFtdO1xuICAgIE1vZGVsLmNvbG9ycyA9IFtdO1xuICAgIE1vZGVsLmlzUGF1c2VkID0gZmFsc2U7XG4gICAgTW9kZWwub3ZlckZsb3cgPSBmYWxzZTtcbiAgICBNb2RlbC5jYW5VcGRhdGUgPSB0cnVlO1xuICAgIE1vZGVsLmhhc0Z1bGxMaW5lID0gZmFsc2U7XG4gICAgTW9kZWwuZmlyc3RDaGFuZ2VBZnRlclNoaWZ0ID0gMDtcbiAgICByZXR1cm4gTW9kZWw7XG59KCkpO1xuZXhwb3J0IHsgTW9kZWwgfTtcbiIsImltcG9ydCB7IGNvbHVtbnMsIHJvd3MsIGNlbGxTaXplIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XG5pbXBvcnQgeyBHYW1lU2Vzc2lvbiB9IGZyb20gXCIuL0dhbWVTZXNzaW9uXCI7XG52YXIgVmlldyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWaWV3KCkge1xuICAgIH1cbiAgICBWaWV3LnJlbmRlciA9IGZ1bmN0aW9uIChncmlkKSB7XG4gICAgICAgIHZhciBmbGF0R3JpZCA9IGdyaWQuZmxhdCgpO1xuICAgICAgICBWaWV3LmNlbGxzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQsIGlkeCkge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICAgICAgICAgIGZsYXRHcmlkW2lkeF0gPj0gMSA/IE1vZGVsLmNvbG9ycy5mbGF0KClbaWR4XSA6IFwiI2ZmZDI1NThhXCI7XG4gICAgICAgICAgICAvLyBpZiAoZmxhdEdyaWRbaWR4XSA9PT0gMikgY29uc29sZS5sb2coZmxhdEdyaWRbaWR4XSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBncmV5ICMyMTI1MjlcbiAgICAgICAgVmlldy51cGRhdGVTY29yZSgpO1xuICAgIH07XG4gICAgVmlldy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBWaWV3LmdhbWVCb2FyZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtYm9hcmRcIik7XG4gICAgICAgIFZpZXcuY3JlYXRlR2FtZUJvYXJkKCk7XG4gICAgICAgIFZpZXcuY2VsbHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbFwiKSk7XG4gICAgICAgIFZpZXcuc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWluZm8gLnNjb3JlXCIpO1xuICAgIH07XG4gICAgVmlldy5jcmVhdGVHYW1lQm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFZpZXcuZ2FtZUJvYXJkRWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbHVtbnMgKiBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgVmlldy5nYW1lQm9hcmRFbGVtZW50LnN0eWxlLmhlaWdodCA9IHJvd3MgKiBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2VsbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50LnN0eWxlLndpZHRoID0gY2VsbFNpemUgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gY2VsbFNpemUgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUubGVmdCA9IGogKiBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS50b3AgPSBpICogY2VsbFNpemUgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2VsbEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZUJvYXJkRWxlbWVudC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgfTtcbiAgICBWaWV3LnVwZGF0ZVNjb3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoVmlldy5zY29yZSA8IEdhbWVTZXNzaW9uLnNjb3JlKSB7XG4gICAgICAgICAgICBWaWV3LnNjb3JlRWxlbWVudC5pbm5lclRleHQgPSBcIlNjb3JlOlxcblwiICsgR2FtZVNlc3Npb24uc2NvcmUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIFZpZXcuc2NvcmUgPSBHYW1lU2Vzc2lvbi5zY29yZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVmlldy5zY29yZSA9IDA7XG4gICAgcmV0dXJuIFZpZXc7XG59KCkpO1xuZXhwb3J0IHsgVmlldyB9O1xuIiwiZXhwb3J0IHZhciBjb2xvcnMgPSBbXCIjMjY4MWRiYzlcIiwgXCIjMDA3NDU2XCIsIFwicGlua1wiLCBcIm9yYW5nZVwiLCBcImJyb3duXCIsIFwiZ3JleVwiXTtcbiIsImV4cG9ydCB2YXIgY29sdW1ucyA9IDEwO1xuZXhwb3J0IHZhciByb3dzID0gMjA7XG5leHBvcnQgdmFyIGNlbGxTaXplID0gNDM7XG4iLCJleHBvcnQgdmFyIHNoYXBlcyA9IFtcbiAgICBbWzEsIDEsIDEsIDFdXSxcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDFdLFxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxXSxcbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDFdLFxuICAgICAgICBbMSwgMV0sXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxXSxcbiAgICAgICAgWzEsIDFdLFxuICAgICAgICBbMSwgMF0sXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFsxLCAwXSxcbiAgICAgICAgWzEsIDBdLFxuICAgICAgICBbMSwgMV0sXG4gICAgXSxcbl07XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tSW50SW5jbHVzaXZlKG1pbiwgbWF4KSB7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSBcIi4vbG9naWMvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9sb2dpYy9Nb2RlbFwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL2xvZ2ljL1ZpZXdcIjtcblZpZXcuaW5pdCgpO1xuQ29udHJvbGxlci5pbml0KCk7XG5Nb2RlbC5pbml0KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=

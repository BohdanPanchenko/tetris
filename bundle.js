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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4Qk87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ0pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOZ0Q7QUFDVjtBQUNGO0FBQ3BDLDZDQUFJO0FBQ0oseURBQVU7QUFDViwrQ0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2xvZ2ljL0Jsb2NrLnRzIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2xvZ2ljL0NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvR2FtZVNlc3Npb24udHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvVmlldy50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC8uL3NyYy9sb2dpYy9jb2xvcnMudHMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3QvLi9zcmMvbG9naWMvY29uZmlnLnRzIiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2xvZ2ljL3NoYXBlcy50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC8uL3NyYy9sb2dpYy91dGlscy50cyIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYnJpY2tzLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9icmlja3MtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JyaWNrcy1wcm9qZWN0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbmltcG9ydCB7IHNoYXBlcyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuaW1wb3J0IHsgY29sdW1ucywgcm93cyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgY29sb3JzIH0gZnJvbSBcIi4vY29sb3JzXCI7XG5pbXBvcnQgeyBnZXRSYW5kb21JbnRJbmNsdXNpdmUgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi9WaWV3XCI7XG52YXIgQmxvY2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmxvY2soc2hhcGUsIGNvbG9yKSB7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmlzRml4ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW5Nb3ZlTGVmdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FuTW92ZVJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYW5Sb3RhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnggPSA0O1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgIH1cbiAgICBCbG9jay5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNoYXBlID0gc2hhcGVzW2dldFJhbmRvbUludEluY2x1c2l2ZSgwLCBzaGFwZXMubGVuZ3RoIC0gMSldO1xuICAgICAgICB2YXIgY29sb3IgPSBjb2xvcnNbZ2V0UmFuZG9tSW50SW5jbHVzaXZlKDAsIGNvbG9ycy5sZW5ndGggLSAxKV07XG4gICAgICAgIHJldHVybiBuZXcgQmxvY2soc2hhcGUsIGNvbG9yKTtcbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdTaGFwZSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5zaGFwZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNoYXBlW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMuc2hhcGUubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICAgICAgbmV3U2hhcGUucHVzaChbXSk7XG4gICAgICAgICAgICAgICAgbmV3U2hhcGVbal0ucHVzaCh0aGlzLnNoYXBlW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrTWFyZ2luKG5ld1NoYXBlKTtcbiAgICAgICAgaWYgKHRoaXMuY2FuUm90YXRlKVxuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IF9fc3ByZWFkQXJyYXkoW10sIG5ld1NoYXBlLCB0cnVlKTtcbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5tb3ZlTGVmdCA9IGZ1bmN0aW9uIChncmlkKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrSG9yaXpvbnRhbEF4aXMoZ3JpZCkgfHwgdGhpcy5pc0ZpeGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoZWNrTWFyZ2luKHRoaXMuc2hhcGUpO1xuICAgICAgICBpZiAodGhpcy5jYW5Nb3ZlTGVmdClcbiAgICAgICAgICAgIHRoaXMueCAtPSAxO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLm1vdmVSaWdodCA9IGZ1bmN0aW9uIChncmlkKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrSG9yaXpvbnRhbEF4aXMoZ3JpZCkgfHwgdGhpcy5pc0ZpeGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoZWNrTWFyZ2luKHRoaXMuc2hhcGUpO1xuICAgICAgICBpZiAodGhpcy5jYW5Nb3ZlUmlnaHQpXG4gICAgICAgICAgICB0aGlzLnggKz0gMTtcbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5kcm9wID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgdGhpcy5kZXRlY3RDb2xsaXNpb24oZ3JpZCk7XG4gICAgICAgIGlmICghdGhpcy5pc0ZpeGVkKVxuICAgICAgICAgICAgdGhpcy55Kys7XG4gICAgfTtcbiAgICBCbG9jay5wcm90b3R5cGUuY2hlY2tNYXJnaW4gPSBmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICAgICAgdGhpcy5jYW5Nb3ZlTGVmdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FuTW92ZVJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYW5Sb3RhdGUgPSB0cnVlO1xuICAgICAgICB2YXIgYmxvY2tMZW5ndGggPSBzaGFwZVswXS5sZW5ndGg7XG4gICAgICAgIGlmICh0aGlzLnggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jYW5Nb3ZlTGVmdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnggKyBibG9ja0xlbmd0aCA+PSBjb2x1bW5zKSB7XG4gICAgICAgICAgICB0aGlzLmNhbk1vdmVSaWdodCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnggKyBibG9ja0xlbmd0aCAtIDEgPj0gY29sdW1ucykge1xuICAgICAgICAgICAgdGhpcy5jYW5Sb3RhdGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmRldGVjdENvbGxpc2lvbiA9IGZ1bmN0aW9uIChncmlkKSB7XG4gICAgICAgIC8vIGNoZWNrcyB2ZXJ0aWNhbCBheGlzIG9ubHlcbiAgICAgICAgdmFyIGJsb2NrSGVpZ2h0ID0gdGhpcy5zaGFwZS5sZW5ndGg7XG4gICAgICAgIGlmICh0aGlzLnkgKyBibG9ja0hlaWdodCA+PSByb3dzIHx8IHRoaXMuY2hlY2tWZXJ0aWNhbEF4aXMoZ3JpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNGaXhlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldEZpeGVkKCk7XG4gICAgICAgICAgICBNb2RlbC51cGRhdGVHcmlkKFwiaW50ZXJ2YWwgZml4ZWRcIik7XG4gICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgIE1vZGVsLmNyZWF0ZUJsb2NrKCk7XG4gICAgICAgICAgICBDb250cm9sbGVyLnNldENhbkRyb3AoZmFsc2UpO1xuICAgICAgICAgICAgLy8gcmVsYXRlZCB0byBDb250cm9sbGVyIGNsYXNzIG9ubHksIG5vdGhpbmcgdG8gd29ycnkgYWJvdXRcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBNb2RlbC5jYW5VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmNoZWNrVmVydGljYWxBeGlzID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgdmFyIGhhc0NvbGxpc2lvbiA9IGZhbHNlO1xuICAgICAgICB2YXIgeVBvc2l0aW9uID0gdGhpcy55ICsgMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNoYXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuc2hhcGVbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZFt5UG9zaXRpb24gKyBpXVt0aGlzLnggKyBqXSA9PT0gMiAmJiB0aGlzLnNoYXBlW2ldW2pdID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBoYXNDb2xsaXNpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzQ29sbGlzaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzQ29sbGlzaW9uO1xuICAgIH07XG4gICAgQmxvY2sucHJvdG90eXBlLmNoZWNrSG9yaXpvbnRhbEF4aXMgPSBmdW5jdGlvbiAoZ3JpZCkge1xuICAgICAgICB2YXIgaGFzQ29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgIHZhciB4UG9zaXRpb24gPSB0aGlzLnkgKyAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zaGFwZVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICgoZ3JpZFt0aGlzLnkgKyBpXVt0aGlzLnggLSAxICsgal0gPT09IDIgJiYgdGhpcy5zaGFwZVtpXVtqXSA+IDApIHx8XG4gICAgICAgICAgICAgICAgICAgIChncmlkW3RoaXMueSArIGldW3RoaXMueCArIDEgKyBqXSA9PT0gMiAmJiB0aGlzLnNoYXBlW2ldW2pdID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzQ29sbGlzaW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc0NvbGxpc2lvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc0NvbGxpc2lvbjtcbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5zZXRGaXhlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNoYXBlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuc2hhcGVbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZVtpXVtqXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXBlW2ldW2pdID0gMjtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzb21ldGhpbmcgd2VudCB3cm9uZ1wiLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJsb2NrLnByb3RvdHlwZS5maXhPdmVybGFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zaGFwZVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlW2ldW2pdID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbaV1bal0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEJsb2NrO1xufSgpKTtcbmV4cG9ydCB7IEJsb2NrIH07XG4iLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiO1xudmFyIENvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29udHJvbGxlcigpIHtcbiAgICB9XG4gICAgQ29udHJvbGxlci5zZXRDYW5Ecm9wID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiAhQ29udHJvbGxlci5kb3duUHJlc3NlZCkge1xuICAgICAgICAgICAgQ29udHJvbGxlci5jYW5Ecm9wID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZhbHVlKVxuICAgICAgICAgICAgQ29udHJvbGxlci5jYW5Ecm9wID0gZmFsc2U7XG4gICAgfTtcbiAgICBDb250cm9sbGVyLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgICAgICAgICAgIE1vZGVsLmFjdGl2ZUJsb2NrLm1vdmVMZWZ0KE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgICAgIE1vZGVsLnVwZGF0ZUdyaWQoXCJBcnJvd1JpZ2h0XCIpO1xuICAgICAgICAgICAgICAgIFZpZXcucmVuZGVyKE1vZGVsLmdyaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICAgICAgICAgIE1vZGVsLmFjdGl2ZUJsb2NrLm1vdmVSaWdodChNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgICAgICBNb2RlbC51cGRhdGVHcmlkKFwiQXJyb3dSaWdodFwiKTtcbiAgICAgICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgICAgICAgICAgIENvbnRyb2xsZXIuZG93blByZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChDb250cm9sbGVyLmNhbkRyb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2suZHJvcChNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwudXBkYXRlR3JpZChcIkFycm93RG93blwiKTtcbiAgICAgICAgICAgICAgICAgICAgVmlldy5yZW5kZXIoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gXCJTcGFjZVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzcGFjZVwiKTtcbiAgICAgICAgICAgICAgICBNb2RlbC5hY3RpdmVCbG9jay5yb3RhdGUoKTtcbiAgICAgICAgICAgICAgICBNb2RlbC51cGRhdGVHcmlkKFwic3BhY2VcIik7XG4gICAgICAgICAgICAgICAgVmlldy5yZW5kZXIoTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIE1vZGVsLmNhblVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gTW9kZWwuY2xlYXJBbGwoKTtcbiAgICAgICAgICAgICAgICAvLyBNb2RlbC51cGRhdGVCbG9ja1Bvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBDb250cm9sbGVyLmNhbkRyb3AgPSB0cnVlO1xuICAgICAgICAgICAgQ29udHJvbGxlci5kb3duUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgICAgICAgICAgIENvbnRyb2xsZXIuY2FuRHJvcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgQ29udHJvbGxlci5kb3duUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwia2V5dXBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29udHJvbGxlci5jYW5Ecm9wID0gdHJ1ZTtcbiAgICBDb250cm9sbGVyLmRvd25QcmVzc2VkID0gZmFsc2U7XG4gICAgcmV0dXJuIENvbnRyb2xsZXI7XG59KCkpO1xuZXhwb3J0IHsgQ29udHJvbGxlciB9O1xuIiwidmFyIEdhbWVTZXNzaW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdhbWVTZXNzaW9uKCkge1xuICAgIH1cbiAgICBHYW1lU2Vzc2lvbi5pbmNyZWFzZVNjb3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBHYW1lU2Vzc2lvbi5zY29yZSArPSAxMDA7XG4gICAgfTtcbiAgICBHYW1lU2Vzc2lvbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBHYW1lU2Vzc2lvbi5wcm90b3R5cGUucGF1c2VTZXNzaW9uID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIEdhbWVTZXNzaW9uLnNjb3JlID0gMDtcbiAgICBHYW1lU2Vzc2lvbi50aW1lciA9IFwiMDA6MDBcIjtcbiAgICBHYW1lU2Vzc2lvbi5wYXVzZWQgPSBmYWxzZTtcbiAgICBHYW1lU2Vzc2lvbi5sZXZlbCA9IDE7XG4gICAgcmV0dXJuIEdhbWVTZXNzaW9uO1xufSgpKTtcbmV4cG9ydCB7IEdhbWVTZXNzaW9uIH07XG4iLCJpbXBvcnQgeyBCbG9jayB9IGZyb20gXCIuL0Jsb2NrXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vVmlld1wiO1xuaW1wb3J0IHsgY29sdW1ucywgcm93cyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgR2FtZVNlc3Npb24gfSBmcm9tIFwiLi9HYW1lU2Vzc2lvblwiO1xuaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gXCIuL0NvbnRyb2xsZXJcIjtcbnZhciBNb2RlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNb2RlbCgpIHtcbiAgICB9XG4gICAgTW9kZWwuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgTW9kZWwuc3RvcFNlc3Npb24pO1xuICAgICAgICBNb2RlbC5maWxsR3JpZCgpO1xuICAgICAgICBNb2RlbC5jcmVhdGVCbG9jaygpO1xuICAgICAgICBNb2RlbC51cGRhdGVHcmlkKFwiaW5pdFwiKTtcbiAgICAgICAgVmlldy5yZW5kZXIoTW9kZWwuZ3JpZCk7XG4gICAgICAgIE1vZGVsLnRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoTW9kZWwuaXNQYXVzZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coTW9kZWwuZ3JpZCk7XG4gICAgICAgICAgICBpZiAoZmFsc2UpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChNb2RlbC5jYW5VcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwudXBkYXRlR3JpZChcImludGVydmFsXCIpO1xuICAgICAgICAgICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2suZHJvcChNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTW9kZWwuY2FuVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwKTtcbiAgICB9O1xuICAgIE1vZGVsLmZpbGxHcmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICAgICAgTW9kZWwuZ3JpZC5wdXNoKFtdKTtcbiAgICAgICAgICAgIE1vZGVsLmNvbG9ycy5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICAgICAgTW9kZWwuZ3JpZFtpXS5wdXNoKDApO1xuICAgICAgICAgICAgICAgIE1vZGVsLmNvbG9yc1tpXS5wdXNoKFwidHJhbnNwYXJlbnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGVsLmxvb3AgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgTW9kZWwuY3JlYXRlQmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZGVsLmFjdGl2ZUJsb2NrID0gQmxvY2suZ2VuZXJhdGUoKTtcbiAgICAgICAgQ29udHJvbGxlci5zZXRDYW5Ecm9wKHRydWUpO1xuICAgIH07XG4gICAgTW9kZWwuY2xlYXJHcmlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1vZGVsLmdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgTW9kZWwuZ3JpZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChNb2RlbC5ncmlkW2ldW2pdICE9PSAyKVxuICAgICAgICAgICAgICAgICAgICBNb2RlbC5ncmlkW2ldW2pdID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kZWwuY2xlYXJBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTW9kZWwuZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBNb2RlbC5ncmlkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgTW9kZWwuZ3JpZFtpXVtqXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1vZGVsLnVwZGF0ZUJsb2NrUG9zaXRpb24gPSBmdW5jdGlvbiAoaG9zdCkge1xuICAgICAgICAvLyBpZiAoTW9kZWwuY2FuVXBkYXRlID09PSBmYWxzZSkge1xuICAgICAgICAvLyAgICAgTW9kZWwuY2FuVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuICAgICAgICB2YXIgYmxvY2sgPSBNb2RlbC5hY3RpdmVCbG9jaztcbiAgICAgICAgaWYgKGJsb2NrLnkgPT09IDAgJiYgYmxvY2suc2hhcGVbMF0uaW5jbHVkZXMoMikpXG4gICAgICAgICAgICBibG9jay5maXhPdmVybGFwKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2suc2hhcGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYmxvY2suc2hhcGVbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoTW9kZWwuZ3JpZFtibG9jay55ICsgaV1bYmxvY2sueCArIGpdICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZGVsLmdyaWRbYmxvY2sueSArIGldW2Jsb2NrLnggKyBqXSA9IGJsb2NrLnNoYXBlW2ldW2pdO1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC5jb2xvcnNbYmxvY2sueSArIGldW2Jsb2NrLnggKyBqXSA9IGJsb2NrLmNvbG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBNb2RlbC5maXJzdENoYW5nZUFmdGVyU2hpZnQrKztcbiAgICAgICAgLy8gY29uc29sZS5sb2coTW9kZWwuZmlyc3RDaGFuZ2VBZnRlclNoaWZ0LCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KE1vZGVsLmdyaWQpKSwgaG9zdCk7XG4gICAgfTtcbiAgICBNb2RlbC5jaGVja0Z1bGxMaW5lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBNb2RlbC5oYXNGdWxsTGluZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1vZGVsLmdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBmdWxsTGluZSA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IE1vZGVsLmdyaWRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoTW9kZWwuZ3JpZFtpXVtqXSAhPT0gMilcbiAgICAgICAgICAgICAgICAgICAgZnVsbExpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmdWxsTGluZSkge1xuICAgICAgICAgICAgICAgIE1vZGVsLmhhc0Z1bGxMaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgYmVmb3JlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShNb2RlbC5ncmlkKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGdWxsIGxpbmUhIEJlZm9yZVwiLCBiZWZvcmUpO1xuICAgICAgICAgICAgICAgIEdhbWVTZXNzaW9uLmluY3JlYXNlU2NvcmUoKTtcbiAgICAgICAgICAgICAgICBNb2RlbC5jYW5VcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBNb2RlbC5zaGlmdExpbmUoaSk7XG4gICAgICAgICAgICAgICAgTW9kZWwuZmlyc3RDaGFuZ2VBZnRlclNoaWZ0ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgYWZ0ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KE1vZGVsLmdyaWQpKTtcbiAgICAgICAgICAgICAgICBWaWV3LnJlbmRlcihNb2RlbC5ncmlkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZ1bGwgbGluZSEgYWZ0ZXJcIiwgYWZ0ZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kZWwuY2hlY2tPdmVyZmxvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdyaWRMYXN0SWR4ID0gTW9kZWwuZ3JpZC5sZW5ndGggLSAxO1xuICAgICAgICBNb2RlbC5ncmlkWzBdLmluY2x1ZGVzKDEpO1xuICAgICAgICBNb2RlbC5zdG9wU2Vzc2lvbigpO1xuICAgIH07XG4gICAgTW9kZWwudXBkYXRlR3JpZCA9IGZ1bmN0aW9uIChob3N0KSB7XG4gICAgICAgIE1vZGVsLmNoZWNrRnVsbExpbmUoKTtcbiAgICAgICAgTW9kZWwuY2xlYXJHcmlkKCk7XG4gICAgICAgIE1vZGVsLnVwZGF0ZUJsb2NrUG9zaXRpb24oaG9zdCk7XG4gICAgfTtcbiAgICBNb2RlbC5zaGlmdExpbmUgPSBmdW5jdGlvbiAoaWR4KSB7XG4gICAgICAgIHZhciBncmlkTGFzdElkeCA9IE1vZGVsLmdyaWQubGVuZ3RoIC0gMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IGlkeDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IE1vZGVsLmdyaWRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8PSBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuZ3JpZFtpXVtqXSA9IE1vZGVsLmdyaWRbaSAtIDFdW2pdO1xuICAgICAgICAgICAgICAgICAgICBNb2RlbC5jb2xvcnNbaV1bal0gPSBNb2RlbC5jb2xvcnNbaSAtIDFdW2pdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTW9kZWwuc3RvcFNlc3Npb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE1vZGVsLmlzUGF1c2VkID0gIU1vZGVsLmlzUGF1c2VkO1xuICAgIH07XG4gICAgTW9kZWwucHJvdG90eXBlLmFwcGx5Q2hhbmdlcyA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBNb2RlbC5idWdMb2dnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgTW9kZWwuZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBNb2RlbC5ncmlkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1vZGVsLmdyaWRbaV1bal0gPT09IDIgJiZcbiAgICAgICAgICAgICAgICAgICAgTW9kZWwuYWN0aXZlQmxvY2sueSArIE1vZGVsLmFjdGl2ZUJsb2NrLnNoYXBlWzBdLmxlbmd0aCA8IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShNb2RlbC5ncmlkKSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNb2RlbC5ncmlkID0gW107XG4gICAgTW9kZWwuY29sb3JzID0gW107XG4gICAgTW9kZWwuaXNQYXVzZWQgPSBmYWxzZTtcbiAgICBNb2RlbC5vdmVyRmxvdyA9IGZhbHNlO1xuICAgIE1vZGVsLmNhblVwZGF0ZSA9IHRydWU7XG4gICAgTW9kZWwuaGFzRnVsbExpbmUgPSBmYWxzZTtcbiAgICBNb2RlbC5maXJzdENoYW5nZUFmdGVyU2hpZnQgPSAwO1xuICAgIHJldHVybiBNb2RlbDtcbn0oKSk7XG5leHBvcnQgeyBNb2RlbCB9O1xuIiwiaW1wb3J0IHsgY29sdW1ucywgcm93cywgY2VsbFNpemUgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcbmltcG9ydCB7IEdhbWVTZXNzaW9uIH0gZnJvbSBcIi4vR2FtZVNlc3Npb25cIjtcbnZhciBWaWV3ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFZpZXcoKSB7XG4gICAgfVxuICAgIFZpZXcucmVuZGVyID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgICAgdmFyIGZsYXRHcmlkID0gZ3JpZC5mbGF0KCk7XG4gICAgICAgIFZpZXcuY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCwgaWR4KSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICAgICAgICAgICAgZmxhdEdyaWRbaWR4XSA+PSAxID8gTW9kZWwuY29sb3JzLmZsYXQoKVtpZHhdIDogXCIjZmZkMjU1OGFcIjtcbiAgICAgICAgICAgIC8vIGlmIChmbGF0R3JpZFtpZHhdID09PSAyKSBjb25zb2xlLmxvZyhmbGF0R3JpZFtpZHhdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGdyZXkgIzIxMjUyOVxuICAgICAgICBWaWV3LnVwZGF0ZVNjb3JlKCk7XG4gICAgfTtcbiAgICBWaWV3LmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFZpZXcuZ2FtZUJvYXJkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1ib2FyZFwiKTtcbiAgICAgICAgVmlldy5jcmVhdGVHYW1lQm9hcmQoKTtcbiAgICAgICAgVmlldy5jZWxscyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpKTtcbiAgICAgICAgVmlldy5zY29yZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtaW5mbyAuc2NvcmVcIik7XG4gICAgfTtcbiAgICBWaWV3LmNyZWF0ZUdhbWVCb2FyZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgVmlldy5nYW1lQm9hcmRFbGVtZW50LnN0eWxlLndpZHRoID0gY29sdW1ucyAqIGNlbGxTaXplICsgXCJweFwiO1xuICAgICAgICBWaWV3LmdhbWVCb2FyZEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcm93cyAqIGNlbGxTaXplICsgXCJweFwiO1xuICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuc3R5bGUud2lkdGggPSBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5zdHlsZS5sZWZ0ID0gaiAqIGNlbGxTaXplICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50LnN0eWxlLnRvcCA9IGkgKiBjZWxsU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjZWxsRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lQm9hcmRFbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICB9O1xuICAgIFZpZXcudXBkYXRlU2NvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChWaWV3LnNjb3JlIDwgR2FtZVNlc3Npb24uc2NvcmUpIHtcbiAgICAgICAgICAgIFZpZXcuc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IFwiU2NvcmU6XFxuXCIgKyBHYW1lU2Vzc2lvbi5zY29yZS50b1N0cmluZygpO1xuICAgICAgICAgICAgVmlldy5zY29yZSA9IEdhbWVTZXNzaW9uLnNjb3JlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBWaWV3LnNjb3JlID0gMDtcbiAgICByZXR1cm4gVmlldztcbn0oKSk7XG5leHBvcnQgeyBWaWV3IH07XG4iLCJleHBvcnQgdmFyIGNvbG9ycyA9IFtcIiMyNjgxZGJjOVwiLCBcIiMwMDc0NTZcIiwgXCJwaW5rXCIsIFwib3JhbmdlXCIsIFwiYnJvd25cIiwgXCJncmV5XCJdO1xuIiwiZXhwb3J0IHZhciBjb2x1bW5zID0gMTA7XG5leHBvcnQgdmFyIHJvd3MgPSAyMDtcbmV4cG9ydCB2YXIgY2VsbFNpemUgPSA0MztcbiIsImV4cG9ydCB2YXIgc2hhcGVzID0gW1xuICAgIFtbMSwgMSwgMSwgMV1dLFxuICAgIFtcbiAgICAgICAgWzEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMV0sXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDFdLFxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMV0sXG4gICAgICAgIFsxLCAxXSxcbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDFdLFxuICAgICAgICBbMSwgMV0sXG4gICAgICAgIFsxLCAwXSxcbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDBdLFxuICAgICAgICBbMSwgMF0sXG4gICAgICAgIFsxLCAxXSxcbiAgICBdLFxuXTtcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kb21JbnRJbmNsdXNpdmUobWluLCBtYXgpIHtcbiAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tIFwiLi9sb2dpYy9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL2xvZ2ljL01vZGVsXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vbG9naWMvVmlld1wiO1xuVmlldy5pbml0KCk7XG5Db250cm9sbGVyLmluaXQoKTtcbk1vZGVsLmluaXQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==

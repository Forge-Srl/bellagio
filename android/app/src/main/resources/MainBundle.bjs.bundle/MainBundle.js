/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Board.js":
/*!******************!*\
  !*** ./Board.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 190:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {Segment} = __webpack_require__(/*! ./Segment */ \"./Segment.js\")\nconst {Size} = __webpack_require__(/*! ./Size */ \"./Size.js\")\nconst {ConqueredSquare} = __webpack_require__(/*! ./ConqueredSquare */ \"./ConqueredSquare.js\")\n\nclass Board {\n\n    constructor(height = 10, width = 10) {\n        this.size = new Size(width, height)\n        this.segments = []\n        this.conqueredSquares = []\n    }\n\n    // @bionic get size Size\n    // @bionic get segments Array<Segment>\n    // @bionic get conqueredSquares Array<ConqueredSquare>\n\n    get isGameOver() {\n        const totalArea = (this.size.height - 1) * (this.size.width - 1)\n        const conqueredArea = this.conqueredSquares.reduce((points, currentSquare) => {\n            const width = currentSquare.right - currentSquare.left\n            const height = currentSquare.bottom - currentSquare.top\n            return points + width * height\n        }, 0)\n\n        return totalArea === conqueredArea\n    }\n\n    getPoints(player) {\n        return this.conqueredSquares\n            .filter(square => square.player === player)\n            .reduce((points, currentSquare) => {\n                const width = currentSquare.right - currentSquare.left\n                const height = currentSquare.bottom - currentSquare.top\n                const area = width * height\n                return points + area\n            }, 0)\n    }\n\n    /**\n     * @param segment {Segment}\n     * */\n    canAddSegment(segment) {\n        const point = segment.startPoint\n        return segment.isValid(this.size.width, this.size.height) &&\n            !this.segments.find(otherSegment => otherSegment.startPoint.x === point.x &&\n                otherSegment.startPoint.y === point.y && otherSegment.direction === segment.direction) &&\n            !this.conqueredSquares.find(square => point.x >= square.left && point.x < square.right &&\n                point.y >= square.top && point.y < square.bottom)\n    }\n\n    /**\n     * @param segment {Segment}\n     * */\n    addSegment(segment) {\n        if (!this.canAddSegment(segment)) {\n            throw Error('Invalid segment')\n        }\n\n        this.segments.push(segment)\n        this.conqueredSquares.push(...this._computeSquares()\n            .map(square => new ConqueredSquare(segment.player, square.left, square.top, square.right, square.bottom)))\n    }\n\n    _computeSquares() {\n        const lastSegment = this.segments[this.segments.length - 1]\n\n        return this._getConqueredSquaredPaths(\n            this._getSquaredPaths([], lastSegment.startPoint, [lastSegment.isHorizontal ? 'W' : 'N']))\n    }\n\n    _getConqueredSquaredPaths(squaredPaths) {\n        return squaredPaths\n            .map(square => {\n                const xs = square.path.map(point => point.x)\n                const ys = square.path.map(point => point.y)\n                return {left: Math.min(...xs), right: Math.max(...xs), top: Math.min(...ys), bottom: Math.max(...ys)}\n            })\n            .filter(square => { // filter out squares containing segments\n                for (const segment of this.segments) {\n                    if (segment.isHorizontal) {\n                        if (segment.startPoint.x >= square.left && segment.startPoint.x < square.right &&\n                            segment.startPoint.y > square.top && segment.startPoint.y < square.bottom) {\n                            return false\n                        }\n                    } else if (segment.startPoint.x > square.left && segment.startPoint.x < square.right &&\n                        segment.startPoint.y >= square.top && segment.startPoint.y < square.bottom) {\n                        return false\n                    }\n                }\n                return true\n            })\n            .filter(square => { // filter out squares already conquered\n                for (const conqueredSquare of this.conqueredSquares) {\n                    if (conqueredSquare.left === square.left && conqueredSquare.right === square.right &&\n                        conqueredSquare.top === square.top && conqueredSquare.bottom === square.bottom) {\n                        return false\n                    }\n                }\n                return true\n            })\n    }\n\n    _getAdjacentPoints(point) {\n        const adjacentList = this.segments.filter(segment => (segment.startPoint.x === point.x && segment.startPoint.y === point.y) ||\n            (segment.startPoint.x === point.x - 1 && segment.startPoint.y === point.y && segment.isHorizontal) ||\n            (segment.startPoint.x === point.x && segment.startPoint.y === point.y - 1 && segment.isVertical))\n\n        const maybeTop = adjacentList.find(adjacentSegment => adjacentSegment.startPoint.y < point.y)\n        const maybeBottom = adjacentList.find(adjacentSegment => adjacentSegment.startPoint.y === point.y && adjacentSegment.isVertical)\n        const maybeLeft = adjacentList.find(adjacentSegment => adjacentSegment.startPoint.x < point.x)\n        const maybeRight = adjacentList.find(adjacentSegment => adjacentSegment.startPoint.x === point.x && adjacentSegment.isHorizontal)\n\n        return {\n            top: maybeTop ? maybeTop.startPoint : undefined,\n            bottom: maybeBottom ? maybeBottom.segmentPoints[1] : undefined,\n            left: maybeLeft ? maybeLeft.startPoint : undefined,\n            right: maybeRight ? maybeRight.segmentPoints[1] : undefined,\n        }\n    }\n\n    _getSquaredPaths(previousPoints, currentPoint, directionStack) {\n        if (previousPoints.length && previousPoints[0].x === currentPoint.x && previousPoints[0].y === currentPoint.y) {\n            return [{path: previousPoints}]\n        }\n\n        const nextMoves = this._getAdjacentPoints(currentPoint)\n        const paths = []\n\n        const currentDirection = directionStack[0]\n        const currentPoints = [...previousPoints, currentPoint]\n        let turnsCount = 0\n        if (currentDirection === 'E') {\n            if (nextMoves.top && !this._isDirectionAlreadyTaken(directionStack, 'N')) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.top, ['N', ...directionStack]))\n                turnsCount++\n            }\n            if (nextMoves.bottom && !this._isDirectionAlreadyTaken(directionStack, 'S')) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.bottom, ['S', ...directionStack]))\n                turnsCount++\n            }\n            if (turnsCount < 2 && nextMoves.right) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.right, directionStack))\n            }\n        } else if (currentDirection === 'W') {\n            if (nextMoves.top && !this._isDirectionAlreadyTaken(directionStack, 'N')) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.top, ['N', ...directionStack]))\n                turnsCount++\n            }\n            if (nextMoves.bottom && !this._isDirectionAlreadyTaken(directionStack, 'S')) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.bottom, ['S', ...directionStack]))\n                turnsCount++\n            }\n            if (turnsCount < 2 && nextMoves.left) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.left, directionStack))\n            }\n        } else if (currentDirection === 'N') {\n            if (nextMoves.left && !this._isDirectionAlreadyTaken(directionStack, 'W')) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.left, ['W', ...directionStack]))\n                turnsCount++\n            }\n            if (nextMoves.right && !this._isDirectionAlreadyTaken(directionStack, 'E')) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.right, ['E', ...directionStack]))\n                turnsCount++\n            }\n            if (turnsCount < 2 && nextMoves.top) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.top, directionStack))\n            }\n        } else if (currentDirection === 'S') {\n            if (nextMoves.left && !this._isDirectionAlreadyTaken(directionStack, 'W')) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.left, ['W', ...directionStack]))\n                turnsCount++\n            }\n            if (nextMoves.right && !this._isDirectionAlreadyTaken(directionStack, 'E')) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.right, ['E', ...directionStack]))\n                turnsCount++\n            }\n            if (turnsCount < 2 && nextMoves.bottom) {\n                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.bottom, directionStack))\n            }\n        }\n        return paths\n    }\n\n    _isDirectionAlreadyTaken(array, value) {\n        // Last element can be duplicated\n        return array.slice(0, -1).includes(value)\n    }\n}\n\nmodule.exports = {Board}\n\n//# sourceURL=webpack://bellagio/./Board.js?");

/***/ }),

/***/ "./ConqueredSquare.js":
/*!****************************!*\
  !*** ./ConqueredSquare.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 20:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ./Player */ \"./Player.js\")\n\nclass ConqueredSquare {\n\n    constructor(player, left, top, right, bottom) {\n        this.left = left\n        this.top = top\n        this.right = right\n        this.bottom = bottom\n        this.player = player\n    }\n\n    // @bionic get left Int\n    // @bionic get top Int\n    // @bionic get right Int\n    // @bionic get bottom Int\n    // @bionic get player Player\n}\n\nmodule.exports = {ConqueredSquare}\n\n//# sourceURL=webpack://bellagio/./ConqueredSquare.js?");

/***/ }),

/***/ "./Game.js":
/*!*****************!*\
  !*** ./Game.js ***!
  \*****************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 65:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {Board} = __webpack_require__(/*! ./Board */ \"./Board.js\")\nconst {Point} = __webpack_require__(/*! ./Point */ \"./Point.js\")\nconst {Segment} = __webpack_require__(/*! ./Segment */ \"./Segment.js\")\nconst {Player} = __webpack_require__(/*! ./Player */ \"./Player.js\")\nconst {PlayersPoints} = __webpack_require__(/*! ./PlayersPoints */ \"./PlayersPoints.js\")\n\nclass Game {\n\n    // @bionic ()\n    constructor() {\n    }\n\n    // @bionic get players Array<Player>\n\n    // @bionic Player\n    get currentPlayer() {\n        return this.players[this.turnCounter % this.players.length]\n    }\n\n    // @bionic ((Board) => Void) => Void\n    onGameStart(callback) {\n        this.gameStartCallback = callback\n    }\n\n    // @bionic ((Player) => Void) => Void\n    onGameOver(callback) {\n        this.gameOverCallback = callback\n    }\n\n    // @bionic ((Board, Segment) => Void) => Void\n    onSegmentAdded(callback) {\n        this.segmentAddedCallback = callback\n    }\n\n    // @bionic (Int, Int) => Void\n    startGame(width, height) {\n        this.players = [new Player('John Doe'), new Player('Alan Smith')]\n        this.turnCounter = 0\n        this.board = new Board(height, width)\n        this.gameStartCallback(this.board)\n    }\n\n    // @bionic (Int, Int, String) => Void\n    addSegment(x, y, direction) {\n        const segment = new Segment(this.currentPlayer, new Point(x, y), direction)\n        this.board.addSegment(segment)\n        this.segmentAddedCallback(this.board, segment)\n        this.turnCounter++\n\n        if (this.board.isGameOver) {\n            this.gameOverCallback(this.points.winningPlayer)\n        }\n    }\n\n    // @bionic PlayersPoints\n    get points() {\n        const points = new PlayersPoints()\n        for (const player of this.players) {\n            points.set(player, this.board.getPoints(player))\n        }\n        return points\n    }\n}\n\nmodule.exports = {Game}\n\n\n//# sourceURL=webpack://bellagio/./Game.js?");

/***/ }),

/***/ "./Player.js":
/*!*******************!*\
  !*** ./Player.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

eval("class Player {\n\n    constructor(name) {\n        this.name = name\n    }\n\n    // @bionic get name String\n}\nmodule.exports = {Player}\n\n//# sourceURL=webpack://bellagio/./Player.js?");

/***/ }),

/***/ "./PlayersPoints.js":
/*!**************************!*\
  !*** ./PlayersPoints.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 27:0-14 */
/***/ ((module) => {

eval("class PlayersPoints {\n\n    constructor() {\n        this.points = new Map()\n    }\n\n    // @bionic (Player) => Int\n    get(player) {\n        this.points.get(player)\n    }\n\n    set(player, points) {\n        this.points.set(player, points)\n    }\n\n    get winningPlayer() {\n        const points = this.points\n        const maxPoint = Math.max(...points.values())\n        return [...points].find(kvp => kvp[1] === maxPoint)[0]\n    }\n\n    forEach(...args) {\n        this.points.forEach(...args)\n    }\n}\n\nmodule.exports = {PlayersPoints}\n\n//# sourceURL=webpack://bellagio/./PlayersPoints.js?");

/***/ }),

/***/ "./Point.js":
/*!******************!*\
  !*** ./Point.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 11:0-14 */
/***/ ((module) => {

eval("class Point {\n    constructor(x, y) {\n        this.x = x\n        this.y = y\n    }\n\n    // @bionic get x Int\n    // @bionic get y Int\n}\n\nmodule.exports = {Point}\n\n//# sourceURL=webpack://bellagio/./Point.js?");

/***/ }),

/***/ "./Segment.js":
/*!********************!*\
  !*** ./Segment.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 53:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ./Point */ \"./Point.js\")\n\nclass Segment {\n\n    // @bionic String\n    static get horizontal() {\n        return 'horizontal'\n    }\n\n    // @bionic String\n    static get vertical() {\n        return 'vertical'\n    }\n\n    constructor(player, startPoint, direction) {\n        if (direction !== Segment.horizontal && direction !== Segment.vertical) {\n            throw new Error('Invalid direction')\n        }\n\n        this.player = player\n        this.startPoint = startPoint\n        this.direction = direction\n    }\n\n    // @bionic get startPoint Point\n\n    // @bionic Bool\n    get isVertical() {\n        return this.direction === Segment.vertical\n    }\n\n    // @bionic Bool\n    get isHorizontal() {\n        return this.direction === Segment.horizontal\n    }\n\n    get segmentPoints() {\n        const endPoint = this.isVertical\n            ? {x: this.startPoint.x, y: this.startPoint.y + 1}\n            : {x: this.startPoint.x + 1, y: this.startPoint.y}\n\n        return [this.startPoint, endPoint]\n    }\n\n    isValid(width, height) {\n        return this.startPoint.x < width && this.startPoint.x >= 0\n            && this.startPoint.y < height && this.startPoint.y >= 0\n            && (this.startPoint.x !== width - 1 || this.isVertical)\n            && (this.startPoint.y !== height - 1 || this.isHorizontal)\n    }\n}\n\nmodule.exports = {Segment}\n\n//# sourceURL=webpack://bellagio/./Segment.js?");

/***/ }),

/***/ "./Size.js":
/*!*****************!*\
  !*** ./Size.js ***!
  \*****************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 12:0-14 */
/***/ ((module) => {

eval("class Size {\n\n    constructor(width, height) {\n        this.width = width\n        this.height = height\n    }\n\n    // @bionic get width Int\n    // @bionic get height Int\n}\n\nmodule.exports = {Size}\n\n//# sourceURL=webpack://bellagio/./Size.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
(() => {
/*!*******************************!*\
  !*** ./MainBundleBjsIndex.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("bjsSetModuleLoader(moduleName => {\n    switch (moduleName) {\n        case 'Board': return __webpack_require__(/*! ./Board.js */ \"./Board.js\")\n        case 'ConqueredSquare': return __webpack_require__(/*! ./ConqueredSquare.js */ \"./ConqueredSquare.js\")\n        case 'Game': return __webpack_require__(/*! ./Game.js */ \"./Game.js\")\n        case 'Player': return __webpack_require__(/*! ./Player.js */ \"./Player.js\")\n        case 'PlayersPoints': return __webpack_require__(/*! ./PlayersPoints.js */ \"./PlayersPoints.js\")\n        case 'Point': return __webpack_require__(/*! ./Point.js */ \"./Point.js\")\n        case 'Segment': return __webpack_require__(/*! ./Segment.js */ \"./Segment.js\")\n        case 'Size': return __webpack_require__(/*! ./Size.js */ \"./Size.js\")\n    }\n})\n\n//# sourceURL=webpack://bellagio/./MainBundleBjsIndex.js?");
})();

/******/ })()
;
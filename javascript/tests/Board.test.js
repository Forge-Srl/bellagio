describe('Board', () => {
    let Board, Segment, board2x2, board3x2, board2x3, board3x2full

    beforeEach(() => {
        Board = require('../Board').Board
        Segment = require('../Segment').Segment

        board2x2 = new Board()
        board2x2.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]

        board3x2 = new Board()
        board3x2.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 2, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]

        board2x3 = new Board()
        board2x3.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]

        board3x2full = new Board()
        board3x2full.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 2, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]
    })

    test('_getAdjacentPoints 1 point on right', () => {
        const board = new Board()
        board.segments = [new Segment(undefined, {x: 0, y: 0}, Segment.horizontal)]
        const adjacentPoints = board._getAdjacentPoints({x: 0, y: 0})
        expect(adjacentPoints).toEqual({right: {x: 1, y: 0}})
    })

    test('_getAdjacentPoints 4 points around', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.horizontal),
        ]
        const adjacentPoints = board._getAdjacentPoints({x: 1, y: 1})
        expect(adjacentPoints).toEqual({
            top: {x: 1, y: 0},
            left: {x: 0, y: 1},
            right: {x: 2, y: 1},
            bottom: {x: 1, y: 2},
        })
    })

    test('_getAdjacentPoints surrounded by 4 not connected segments', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 2, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 2, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]
        const adjacentPoints = board._getAdjacentPoints({x: 1, y: 1})
        expect(adjacentPoints).toEqual({})
    })

    test('_getSquaredPaths 2x2 clockwise', () => {
        const squaredPaths = board2x2._getSquaredPaths([], {x: 1, y: 0}, ['E'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 0}]},
        ])
    })

    test('_getSquaredPaths 2x2 counterclockwise', () => {
        const squaredPaths = board2x2._getSquaredPaths([], {x: 1, y: 0}, ['N'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]},
        ])
    })

    test('_getSquaredPaths 2x2 clockwise incomplete', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
        ]
        const squaredPaths = board._getSquaredPaths([], {x: 1, y: 0}, ['E'])
        expect(squaredPaths).toEqual([])
    })

    test('_getSquaredPaths 3x2 clockwise', () => {
        const squaredPaths = board3x2._getSquaredPaths([], {x: 1, y: 0}, ['E'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 0}]},
        ])
    })

    test('_getSquaredPaths 3x2 counterclockwise', () => {
        const squaredPaths = board3x2._getSquaredPaths([], {x: 1, y: 0}, ['W'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0}]},
        ])
    })

    test('_getSquaredPaths 2x3 clockwise', () => {
        const squaredPaths = board2x3._getSquaredPaths([], {x: 1, y: 0}, ['E'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2}, {x: 0, y: 1}, {x: 0, y: 0}]},
        ])
    })

    test('_getSquaredPaths 2x3 counterclockwise', () => {
        const squaredPaths = board2x3._getSquaredPaths([], {x: 1, y: 0}, ['N'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}]},
        ])
    })

    test('_getSquaredPaths 3x2 full, 2 paths', () => {
        const squaredPaths = board3x2full._getSquaredPaths([], {x: 1, y: 0}, ['N'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]},
            {path: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 1, y: 1}]},
        ])
    })

    test('_getSquaredPaths 3x2 full, single path', () => {
        const squaredPaths = board3x2full._getSquaredPaths([], {x: 2, y: 0}, ['N'])
        expect(squaredPaths).toEqual([
            {path: [{x: 2, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}]},
            {path: [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}]},
        ])
    })
})
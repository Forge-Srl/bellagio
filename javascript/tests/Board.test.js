describe('Board', () => {
    let Board

    beforeEach(() => {
        Board = require('../Board').Board
    })

    test.each([
        'something', null, undefined
    ])('addSegment wrong direction %s', (direction) => {
        const board = new Board(0, 0)

        expect(() => board.addSegment('player', null, direction)).toThrow('Invalid direction')
    })

    test.each([
        [5, 5],
        [4, 5],
        [5, 4],
        [0, -1],
        [-1, 0],
        [-1, -1],
    ])('addSegment (%d, %d) coordinates out of grid', (x, y) => {
        const board = new Board(5, 5)

        expect(() => board.addSegment('player', {x, y}, Board.horizontal)).toThrow('Invalid coordinates')
        expect(() => board.addSegment('player', {x, y}, Board.vertical)).toThrow('Invalid coordinates')
    })

})
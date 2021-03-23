describe('Segment', () => {
    let Segment

    beforeEach(() => {
        Segment = require('../Segment').Segment
    })

    test('horizontal', () => {
        expect(Segment.horizontal).toBe('horizontal')
    })

    test('vertical', () => {
        expect(Segment.vertical).toBe('vertical')
    })

    describe('constructor', () => {

        test('ok', () => {
            const segment = new Segment('player', {x: 3, y: 5}, Segment.horizontal)
            expect(segment.player).toBe('player')
            expect(segment.startPoint).toStrictEqual({x: 3, y: 5})
            expect(segment.direction).toBe(Segment.horizontal)
        })

        test('exception', () => {
            expect(() => new Segment('player', {x: 3, y: 5}, 'puppa')).toThrowError(new Error('Invalid direction'))
        })
    })

    test('isVertical', () => {
        let segment = new Segment('player', {x: 3, y: 5}, Segment.vertical)
        expect(segment.isVertical).toBeTruthy()
        segment = new Segment('player', {x: 3, y: 5}, Segment.horizontal)
        expect(segment.isVertical).toBeFalsy()
    })

    test('isHorizontal', () => {
        let segment = new Segment('player', {x: 3, y: 5}, Segment.horizontal)
        expect(segment.isHorizontal).toBeTruthy()
        segment = new Segment('player', {x: 3, y: 5}, Segment.vertical)
        expect(segment.isHorizontal).toBeFalsy()
    })

    test('segmentPoints', () => {
        let segment = new Segment('player', {x: 3, y: 5}, Segment.horizontal)
        expect(segment.segmentPoints).toStrictEqual([{x: 3, y: 5}, {x: 4, y: 5}])
        segment = new Segment('player', {x: 3, y: 5}, Segment.vertical)
        expect(segment.segmentPoints).toStrictEqual([{x: 3, y: 5}, {x: 3, y: 6}])
    })

    test.each([
        [2, 3, 'vertical', true],
        [2, 3, 'horizontal', true],
        [5, 5, 'vertical', false],
        [5, 5, 'horizontal', false],
        [4, 5, 'vertical', false],
        [4, 5, 'horizontal', false],
        [5, 4, 'vertical', false],
        [5, 4, 'horizontal', false],
        [0, -1, 'vertical', false],
        [0, -1, 'horizontal', false],
        [-1, 0, 'vertical', false],
        [-1, 0, 'horizontal', false],
        [-1, -1, 'vertical', false],
        [-1, -1, 'horizontal', false],
    ])('isValid', (x, y, direction, expected) => {
        const segment = new Segment('player', {x, y}, direction)
        expect(segment.isValid(5, 5)).toBe(expected)
    })
})
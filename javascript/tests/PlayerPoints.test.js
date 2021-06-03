describe('PlayerPoints', () => {
    let PlayerPoints

    beforeEach(() => {
        PlayerPoints = require('../PlayersPoints').PlayersPoints
    })

    test('Setter and Getter', () => {
        let playerPoints = new PlayerPoints()

        expect(playerPoints.get('player1')).toBeUndefined()
        expect(playerPoints.get('player2')).toBeUndefined()

        playerPoints.set('player1', 10)
        expect(playerPoints.get('player1')).toBe(10)
        expect(playerPoints.get('player2')).toBeUndefined()

        playerPoints.set('player2', 15)
        expect(playerPoints.get('player1')).toBe(10)
        expect(playerPoints.get('player2')).toBe(15)

        playerPoints.set('player1', 33)
        expect(playerPoints.get('player1')).toBe(33)
        expect(playerPoints.get('player2')).toBe(15)
    })

    test('winningPlayer', () => {
        let playerPoints = new PlayerPoints()

        expect(playerPoints.winningPlayer).toBeUndefined()

        playerPoints.set('player1', 10)
        playerPoints.set('player2', 20)
        playerPoints.set('player3', 30)
        expect(playerPoints.winningPlayer).toBe('player3')

        playerPoints.set('player1', 100)
        expect(playerPoints.winningPlayer).toBe('player1')
    })
})
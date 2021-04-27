const {Game} = require('../javascript/Game')
const {Segment} = require('../javascript/Segment')

const getClickLocation = (event) => {
    const rect = event.target.getBoundingClientRect()
    const relX = (event.clientX - rect.left) / rect.width
    const relY = (event.clientY - rect.top) / rect.height

    const verticalProximity = relY >= 0.5 ? 'bottom' : 'top'
    const verticalDelta = Math.min(relY, 1 - relY)
    const horizontalProximity = relX >= 0.5 ? 'right' : 'left'
    const horizontalDelta = Math.min(relX, 1 - relX)

    return horizontalDelta <= verticalDelta ? horizontalProximity : verticalProximity
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game()
    const container = document.createElement('div')
    container.classList.add('container')
    document.body.append(container)

    const renderPoints = () => {
        const playersBox = container.querySelector('.playersBox')
        let pointsHTML = ''
        game.points.forEach((points, player) => {
            pointsHTML += player.name + ' ' + points + '<br>'
        })
        playersBox.innerHTML = pointsHTML
    }

    game.onGameStart(board => {
        container.innerHTML = ''

        const playersBox = document.createElement('div')
        playersBox.classList.add('playersBox')
        container.append(playersBox)
        renderPoints()

        const boardWrapper = document.createElement('div')
        container.append(boardWrapper)

        for (let row = 0; row < board.size.height - 1; row++) {
            const rowElement = document.createElement('div')
            rowElement.classList.add('row')
            for (let col = 0; col < board.size.width - 1; col++) {
                const cell = document.createElement('div')
                cell.classList.add('cell', `row-${row}`, `col-${col}`)
                rowElement.append(cell)

                cell.addEventListener('click', (event) => {
                    const location = getClickLocation(event)

                    if (location === 'top') {
                        game.addSegment(col, row, Segment.horizontal)
                    } else if (location === 'bottom') {
                        game.addSegment(col, row + 1, Segment.horizontal)
                    } else if (location === 'left') {
                        game.addSegment(col, row, Segment.vertical)
                    } else if (location === 'right') {
                        game.addSegment(col + 1, row, Segment.vertical)
                    }
                })
            }
            boardWrapper.append(rowElement)
        }
    })

    game.onSegmentAdded((board, addedSegment) => {
        renderPoints()

        board.segments.forEach(segment => {
            const y = segment.startPoint.y
            const x = segment.startPoint.x

            const playerClass = segment.player === game.players[0] ? 'player-1' : 'player-2'

            if (segment.isHorizontal) {
                if (y === board.size.height - 1) {
                    container.querySelector(`.row-${y - 1}.col-${x}`).classList.add(`border-bottom-${playerClass}`)
                } else {
                    container.querySelector(`.row-${y}.col-${x}`).classList.add(`border-top-${playerClass}`)
                    if (y > 0)
                        container.querySelector(`.row-${y - 1}.col-${x}`).classList.add(`border-bottom-${playerClass}`)
                }
            } else {
                if (x === board.size.width - 1) {
                    container.querySelector(`.row-${y}.col-${x - 1}`).classList.add(`border-right-${playerClass}`)
                } else {
                    container.querySelector(`.row-${y}.col-${x}`).classList.add(`border-left-${playerClass}`)
                    if (x > 0)
                        container.querySelector(`.row-${y}.col-${x - 1}`).classList.add(`border-right-${playerClass}`)
                }
            }
        })

        board.conqueredSquares.forEach(square => {
            const playerClass = square.player === game.players[0] ? 'player-1' : 'player-2'

            for (let col = square.left; col < square.right; col++) {
                for (let row = square.top; row < square.bottom; row++) {
                    container.querySelector(`.row-${row}.col-${col}`).classList.add(playerClass)
                }
            }
        })
    })

    game.onGameOver((player) => {
        setTimeout(() => {
            alert(`${player.name} won!`)}, 0)
    })

    game.startGame()
})
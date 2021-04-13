const {Board} = require('../javascript/Board')
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

const updateUI = (container, board) => {
    board.segments.forEach(segment => {
        const y = segment.startPoint.y
        const x = segment.startPoint.x

        if (segment.isHorizontal) {
            if (y === board.size.height - 1) {
                container.querySelector(`.row-${y-1}.col-${x}`).classList.add('border-bottom')
            } else {
                container.querySelector(`.row-${y}.col-${x}`).classList.add('border-top')
                if (y > 0)
                    container.querySelector(`.row-${y-1}.col-${x}`).classList.add('border-bottom')
            }
        } else {
            if (x === board.size.width - 1) {
                container.querySelector(`.row-${y}.col-${x-1}`).classList.add('border-right')
            } else {
                container.querySelector(`.row-${y}.col-${x}`).classList.add('border-left')
                if (x > 0)
                    container.querySelector(`.row-${y}.col-${x-1}`).classList.add('border-right')
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const board = new Board()

    const container = document.createElement('div')
    container.classList.add('container')
    document.body.append(container)

    for (let row = 0; row < board.size.height - 1; row++) {
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        for (let col = 0; col < board.size.width - 1; col++) {
            const cell = document.createElement('div')
            cell.classList.add('cell', `row-${row}`, `col-${col}`)
            rowElement.append(cell)

            cell.addEventListener('click', (event) => {
                const location = getClickLocation(event)
                const player = 'John Doe'
                if (location === 'top') {
                    board.addSegment(new Segment(player, {x: col, y: row}, Segment.horizontal))
                } else if (location === 'bottom') {
                    board.addSegment(new Segment(player, {x: col, y: row + 1}, Segment.horizontal))
                } else if (location === 'left') {
                    board.addSegment(new Segment(player, {x: col, y: row}, Segment.vertical))
                } else if (location === 'right') {
                    board.addSegment(new Segment(player, {x: col + 1, y: row}, Segment.vertical))
                }

                updateUI(container, board)
            })
        }
        container.append(rowElement)
    }
})
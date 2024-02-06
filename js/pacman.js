'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === SUPER_FOOD && gPacman.isSuper) return
    // console.log(nextLocation)
    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === SUPER_FOOD) {
        foodCount --
        updateScore(1)
        gPacman.isSuper = true
        superPac = true
        setTimeout(() => gPacman.isSuper = false, 5000)
        setTimeout(() => superPac = false, 5000)
    }

    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    } else if (nextCell === GHOST && gPacman.isSuper) {
        erseGhost(nextLocation)
        setTimeout(() => createGhost(gGhosts, nextLocation.i, nextLocation.j,EMPTY), 5000)


    }

    if (nextCell === FOOD) {
        console.log('foodCount:', foodCount)
        foodCount -=1
        updateScore(1)
    }
    if (nextCell === CHERRY) updateScore(10)


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}

function erseGhost(cell) {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghostI = gGhosts[i].location.i
        const ghostJ = gGhosts[i].location.j
        if (ghostI === cell.i && ghostJ === cell.j) {
            gGhosts.splice(i, 1)
        }console.log('gGhosts:', gGhosts)
    }
}
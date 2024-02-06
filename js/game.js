'use strict'

// done show a game-over modal with a play again button
// done make a 'victory' function that also opens the modal but with wining line
// todo each ghost should have a random color 
// todo add super food 



const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '*'
const EMPTY = ' '
const CHERRY = '🍒'
// Model
const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var foodCount = -1
var superPac = false
var intervalCherryId
function onInit() {
    const elModal = document.querySelector('div.modal')
    elModal.classList.add('hide')
    foodCount = -1
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    console.log('foodCount:', foodCount)
    intervalCherryId = setInterval(cherryMaker,15000)
    // moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (board[i][j] === FOOD) foodCount++
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
        
        checkVictory()
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    const elModal = document.querySelector('div.modal')
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(intervalCherryId)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    elModal.querySelector('.user-msg').innerText = 'GAME-OVER'
    elModal.classList.remove('hide')
}


function checkVictory() {
    if (foodCount === 0) {
        const elModal = document.querySelector('div.modal')
        clearInterval(gIntervalGhosts)
        clearInterval(intervalCherryId)
        gGame.isOn = false
        elModal.querySelector('.user-msg').innerText = 'YOU WON!!'
        elModal.classList.remove('hide')
    }

}

function cherryMaker() {
    const cell =getEmptyPos(gBoard)
    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell,CHERRY) 
}
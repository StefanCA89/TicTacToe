let symbol = ""
const boardVal = [0,0,0,0,0,0,0,0,0,0]
const winLine = [0,0,0,0,0,0,0,0,0]
let emptyBoxes = 9

function startGame() {
    for (let i = 1; i <= 9; ++i) {
        document.getElementById(i).innerText= ""
    }
    document.getElementById("infoArea").value = 1
    playerInfo()
}

function playerInfo() {
    if (document.getElementById("infoArea").value == 1) {
        document.getElementById("infoArea").style.backgroundColor = "rgb(169, 240, 182)"
        document.getElementById("infoArea").innerHTML = '\
        Player 1\
        <div class="currentPlayer" id="player">X</div>'
        document.getElementById("infoArea").value = 2
        symbol = "X"
    } else if (document.getElementById("infoArea").value == 2) {
        document.getElementById("infoArea").style.backgroundColor = "rgb(245 139 78)"
        document.getElementById("infoArea").innerHTML = '\
        Player 2\
        <div class="currentPlayer" id="player">O</div>'
        document.getElementById("infoArea").value = 1
        symbol = "O" 
    }
}

function updateBoard(idNr) {
    if (symbol == "" ) {
        return
    }
    if (document.getElementById(idNr).innerText != "") {
        return
    }
    document.getElementById(idNr).innerText = symbol
    if(symbol == "X") {
        boardVal[idNr] += 1
    } else {
        boardVal[idNr] -= 1
    }
    --emptyBoxes
    if (!checkWin()) {
        playerInfo()
    }
}

function checkWin() {
    winLine[1] = boardVal[1] + boardVal[2] + boardVal[3]
    winLine[2] = boardVal[4] + boardVal[5] + boardVal[6]
    winLine[3] = boardVal[7] + boardVal[8] + boardVal[9]
    winLine[4] = boardVal[1] + boardVal[4] + boardVal[7]
    winLine[5] = boardVal[2] + boardVal[5] + boardVal[8]
    winLine[6] = boardVal[3] + boardVal[6] + boardVal[9]
    winLine[7] = boardVal[1] + boardVal[5] + boardVal[9]
    winLine[8] = boardVal[7] + boardVal[5] + boardVal[3]
    for (let i = 1; i <= 8; ++i) {    
        if (winLine[i] == 3 || winLine[i] == -3) {
            document.getElementById("player").innerText = "WIN"
            document.getElementById("infoArea").innerHTML += '\
            <button onclick="resetGame()">Play Again</button>'
            symbol = ""
            return true
        }
    }
    if (emptyBoxes == 0) {
        document.getElementById("infoArea").style.backgroundColor = "rgb(236 236 236)"
        document.getElementById("infoArea").innerHTML = '\
        <div class="resultDraw">DRAW</div>\
        <button onclick="resetGame()">Play Again</button>'
        return true
    }
}

function resetGame() {
    window.location.reload()
}
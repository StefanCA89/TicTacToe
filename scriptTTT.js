let symbol = ""
const winLine = [[0,0,0,0],
                 [0,1,2,3],
                 [0,4,5,6],
                 [0,7,8,9],
                 [0,1,4,7],
                 [0,2,5,8],
                 [0,3,6,9],
                 [0,1,5,9],
                 [0,7,5,3]]
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
    let modifier = -1
    if(symbol == "X") {
        modifier = 1
    }
    updateWline(idNr, modifier)
    --emptyBoxes
    if (!checkWin()) {
        playerInfo()
    }
}

function updateWline(idNr, modifier) {
    for (let i = 1; i <= 8; ++i) {
        for (let j = 1; j <= 3; ++j) {
            if (winLine[i][j] == idNr) {
                winLine[i][0] += modifier
            }
        }
    }
}

function checkWin() {
    for (let i = 1; i <= 8; ++i) {    
        if (winLine[i][0] == 3 || winLine[i][0] == -3) {
            showLine(i, winLine[i][0])
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

function showLine(lineNr, value) {
    let color = "rgb(245 139 78)"
    if (value > 0) {
        color = "rgb(169, 240, 182)"
    }
    for (let i = 1; i <= 3; ++i) {
        document.getElementById(winLine[lineNr][i]).style.backgroundColor = color
    }
}

function resetGame() {
    window.location.reload()
}
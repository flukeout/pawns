//  AnnotateChat
//   - generateMessageNodes

let inputEl;
let boardSize = 8;
let gleamDelay = 1000;
let boardSelector = ".board"
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let pieces = [
    { "rank" : 1
    , "file" : "a"
    , "type": "wr"
    , "player" : 1
    },

    { "rank" : 2
    , "file" : "a"
    , "type": "wp"
    , "player" : 1
    },

    { "rank" : 1
    , "file" : "b"
    , "type": "wn"
    , "player" : 1
    },

    { "rank" : 1
    , "file" : "c"
    , "type": "wb"
    , "player" : 1
    },

    { "rank" : 1
    , "file" : "d"
    , "type": "wq"
    , "player" : 1
    },


    { "rank" : 1
    , "file" : "f"
    , "type": "wb"
    , "player" : 1
    },

    { "rank" : 1
    , "file" : "h"
    , "type": "wr"
    , "player" : 1
    },

    { "rank" : 2
    , "file" : "a"
    , "type": "wp"
    , "player" : 1
    },

    { "rank" : 2
    , "file" : "b"
    , "type": "wp"
    , "player" : 1
    },

    { "rank" : 2
    , "file" : "c"
    , "type": "wp"
    , "player" : 1
    },

    { "rank" : 3
    , "file" : "d"
    , "type": "wp"
    , "player" : 1
    },


    { "rank" : 5
    , "file" : "c"
    , "type": "wn"
    , "player" : 1
    },


    { "rank" : 4
    , "file" : "g"
    , "type": "wk"
    , "player" : 1
    },


    { "rank" : 2
    , "file" : "f"
    , "type": "wp"
    , "player" : 1
    },



    { "rank" : 7
    , "file" : "b"
    , "type": "bp"
    , "player" : 2
    },

    { "rank" : 6
    , "file" : "c"
    , "type": "bp"
    , "player" : 2
    },

    { "rank" : 4
    , "file" : "b"
    , "type": "bp"
    , "player" : 2
    },


    { "rank" : 8
    , "file" : "e"
    , "type": "bq"
    , "player" : 2
    },

    { "rank" : 7
    , "file" : "e"
    , "type": "bp"
    , "player" : 2
    },

    { "rank" : 5
    , "file" : "f"
    , "type": "bn"
    , "player" : 2
    },

    { "rank" : 6
    , "file" : "f"
    , "type": "bk"
    , "player" : 2
    },

    { "rank" : 6
    , "file" : "g"
    , "type": "bp"
    , "player" : 2
    },


    { "rank" : 8
    , "file" : "a"
    , "type": "br"
    , "player" : 2
    },

    { "rank" : 8
    , "file" : "f"
    , "type": "bb"
    , "player" : 2
    },

    { "rank" : 8
    , "file" : "h"
    , "type": "br"
    , "player" : 2
    }
]

let lastZindex = 1;

let methods = ["draw", "surrender", "checkmate"]

document.addEventListener("DOMContentLoaded", function(event) { 
    generateBoard(boardSelector, boardSize);
    placePieces(boardSelector, pieces);
    let randomMethodIndex = Math.floor(Math.random() * methods.length);
    // gameOver("surrender");
    addListeners();
});

const addListeners = () => {
    let els = document.querySelectorAll("button");
    if(els) {
        els.forEach(e => e.addEventListener("click", e => {
            gameOver(e.srcElement.getAttribute("type"));
        }));
    }
}

const gameOver = method => {

    let els = document.querySelectorAll(".status-bubble");
    if(els){
        els.forEach(e => {
            e.parentNode.removeChild(e);
        });
    }

    let kings = document.querySelectorAll(".bk, .wk");

    kings.forEach(e => {
        ["winner","checkmate","surrender"].forEach(className => {
            e.classList.remove(className);
        });
    })

    if (method == "clear") {
        return;
    }


    kings.forEach(e => {
        let statusBubble = document.createElement("div");
        statusBubble.classList.add("status-bubble");

        let icon = document.createElement("div");
        icon.classList.add("icon");
        statusBubble.appendChild(icon);

        if(method == "checkmate") {
            if(e.classList.contains("bk")) {
                statusBubble.classList.add("winner");
                e.classList.add("winner");
            } else {
                statusBubble.classList.add("checkmate");
                e.classList.add("checkmate");
            }
        }

        if(method == "surrender") {
            if(e.classList.contains("bk")) {
                statusBubble.classList.add("surrender");
                e.classList.add("surrender");
            } else {
                statusBubble.classList.add("winner");
                e.classList.add("winner");
            }
        }

        if(method == "draw") {
            statusBubble.classList.add("draw");
            e.classList.add("draw");
        }

        e.append(statusBubble);
    });
}

// Adds pieces to the generated board
const placePieces = (boardSelector, pieces) => {
    let board = document.querySelector(boardSelector);

    pieces.map(piece => {
        let pieceEl = document.createElement("div");
        pieceEl.className = "piece " + piece.type;
        pieceEl.style.width = 100/boardSize + "%";
        pieceEl.style.height = 100/boardSize + "%";
        pieceEl.style.height = 100/boardSize + "%";
        pieceEl.style.bottom = ((piece.rank - 1) * 100/boardSize) + "%";
        pieceEl.style.left = (alphabet.indexOf(piece.file) * 100/boardSize) + "%";

        let figureEl = document.createElement("div");
        figureEl.classList.add("figure");
        pieceEl.append(figureEl);

        pieceEl.setAttribute("coordinates", piece.file + piece.rank );
        board.append(pieceEl);
    });
}

// const gleamTile = (tileCode, player) => {
//     let isValidMove = checkValidMove(tileCode);
//     // document.querySelector(".square[name=" + tileCode).classList.add("highlight");

//     highlightTile(tileCode, player);
//     if(isValidMove){
//         highlightMove(tileCode);
//     }

//     setTimeout(function(){
//         clearHighlights();
//     }, gleamDelay);
// }





const highlightTile = (tileCode, player) => {

    let relatedPiece = document.querySelector(".piece[coordinates=" + tileCode + "]");
    if(relatedPiece) {
        relatedPiece.classList.add("highlight");
    }

    let relatedTile = document.querySelector(".square[name=" + tileCode + "]");
    lastZindex++;
    relatedTile.style.zIndex = lastZindex;
    relatedTile.classList.add("highlight");
}


// Returns a piece that matches a move
const getPiece = moveCode => {
    let file = moveCode.substr(0, 1);
    let rank = parseInt(moveCode.substr(1, moveCode.length));
    
    let piece =  pieces.find(piece => {
        if (file == piece.file) {
            if(piece.player == 1) {
                return piece.rank + 1 == rank || piece.rank + 2 == rank;
            } else {
                return piece.rank - 1 == rank || piece.rank - 2 == rank;
            }
        }
    });
    
    if(piece) { return piece }
        else 
    return false;
}

const highlightMove = (moveCode, player) => {
    let piece = getPiece(moveCode);
    let file = moveCode.substr(0, 1);
    let rank = parseInt(moveCode.substr(1, moveCode.length));

    let delta = rank - piece.rank;
    let length = Math.abs(delta);
    let direction = delta > 0 ? "up" : "down";
    let arrowEl = document.createElement("div");
    arrowEl.className = "arrow " + direction + " length-" + length;

    let piecePosition = piece.file + piece.rank;
    let originTile = document.querySelector(".square[name=" + piecePosition + "]");

    let destinationTile = document.querySelector(".square[name=" + moveCode + "]");

    let board = document.querySelector(boardSelector);

    arrowEl.style.width = 100/boardSize + "%";
    arrowEl.style.left = (alphabet.indexOf(file) *100/boardSize) + "%";
    arrowEl.style.bottom = ((rank - length - 1) * 100/boardSize) + "%";
    arrowEl.style.height = ((length + 1)* 100/boardSize) + "%";

    let pieceCode = piece.file + piece.rank;
    let pieceEl = document.querySelector(".piece[coordinates="+pieceCode+"]");

    pieceEl.classList.add("lift");
    board.append(arrowEl);
}

const clearHighlights = () => {

    let removeClasses = ["move-origin", "lift", "move-up", "highlight" ]

    let arrow = document.querySelector(".arrow");
    if(arrow) {
        arrow.parentNode.removeChild(arrow);
    }

    removeClasses.forEach(className => {
        let els = document.querySelectorAll(".board ." + className);
        if(els) {
            els.forEach(e => e.classList.remove(className));
        }
    });
}


const generateBoard = (selector, size) => {

    let board = document.querySelector(selector);
    let lastClass = "even";

    if(!board) { return }

    board.innerHtml = "";

    const toggleSquareClass = () => {
        if(lastClass == "even") {
            lastClass = "odd";
        } else {
            lastClass = "even";
        }
    }

    for(let rank = 0; rank < size; rank++) {
        let square = document.createElement("div");
        square.className = "coordinate rank";
        square.style.height = 100/size + "%";
        square.style.top = (rank  *100/size) + "%";
        square.innerText = (size - rank);
        board.appendChild(square);
    }

    for(let file = 0; file < size; file++) {
        let square = document.createElement("div");
        square.className = "coordinate file";
        square.style.width = 100/size + "%";
        square.style.left = (file  *100/size) + "%";
        let thisFile = alphabet.charAt(file);
        square.innerText = thisFile;
        board.appendChild(square);
    }

    for(let rank = 0; rank < size; rank++) {

        toggleSquareClass();

        for(let file = 0; file < size; file++) {

            let thisFile = alphabet.charAt(file);
            let thisRank = size - rank;
            let square = document.createElement("div");
            square.classList.add("square");

            if(lastClass == "even") {
                square.classList.add("odd");
            } else {
                square.classList.add("even");
            }
            
            toggleSquareClass();

            square.style.width = 100/size + "%";
            square.style.height = 100/size + "%";

            let name = thisFile + thisRank.toString();
            square.setAttribute("name", name)

            let squareNameEl = document.createElement("div");
            squareNameEl.classList.add("square-name");
            squareNameEl.innerText = name;
            square.appendChild(squareNameEl);

            board.appendChild(square);
        }
    }
}

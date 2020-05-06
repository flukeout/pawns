//  AnnotateChat
//   - generateMessageNodes

let inputEl;
let boardSize = 8;
let gleamDelay = 1000;
let boardSelector = ".board"
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let pieces = [
    { "rank" : 1
    , "file" : "d"
    , "type": "wp"
    , "player" : 1
    },
    { "rank" : 1
    , "file" : "e"
    , "type": "wp"
    , "player" : 1
    },
    { "rank" : 8
    , "file" : "e"
    , "type": "bp"
    , "player" : 2
    },
    { "rank" : 8
    , "file" : "d"
    , "type": "bp"
    , "player" : 2
    }
]

document.addEventListener("DOMContentLoaded", function(event) { 
    generateBoard(boardSelector, boardSize);
    placePieces(boardSelector, pieces);
    annotateChat();
    inputEl = document.querySelector("input");
    inputEl.addEventListener("keyup", (key) => {keyPress(key)});
    inputEl.focus();
});

const keyPress = e => {
    if(e.code == "Enter") {
        addMessage("Flukeout", "one", inputEl.value);
    }
}

// Adds pieces to the generated board
const placePieces = (boardSelector, pieces) => {
    let board = document.querySelector(boardSelector);
    pieces.map(piece => {
        let pieceEl = document.createElement("div");
        pieceEl.className = "piece " + piece.type;
        board.querySelector("[name=" + piece.file + piece.rank + "]").append(pieceEl);
    });
}

const gleamTile = (tileCode, player) => {
    document.querySelector(".square[name=" + tileCode).classList.add("highlight");
    document.querySelector(".square[name=" + tileCode).classList.add(player);

    setTimeout(function(){
        document.querySelector(".square[name=" + tileCode).classList.remove("highlight");
        document.querySelector(".square[name=" + tileCode).classList.remove(player);
    }, gleamDelay);
}

const addMessage = (username, player, string) => {

    if(string.trim().length == 0) {
        return;
    }

    inputEl.value = "";
    let newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.innerHTML = "<span class='username user-one'>"+ username + "</span> ";
    newMessage.setAttribute("player", player);
    let messageEl = document.createElement("span");
    messageEl.classList.add("text");
    let messageNodes = generateMessageNodes(string, player);

    messageNodes.forEach(m => {
        if(m.tagName == "SPAN") {
            gleamTile(m.getAttribute("tile"), player)
        }
        messageEl.append(m);
    });

    newMessage.append(messageEl);
    document.querySelector(".chat").append(newMessage)
}


const checkMove = string => {
    let file = string.substr(0, 1);
    let rank = parseInt(string.substr(1, string.length));
    let validFile = alphabet.substr(0,boardSize).includes(file)
    let validRank = !isNaN(rank) && rank <= boardSize;

    return validFile && validRank;
}

const checkValidMove = w => {
    let first = w.substr(0, 1);
    let second = w.substr(1, w.length);



    if (alphabet.includes(first) && !isNaN(parseInt(second))) {

        let rank = parseInt(second);
        let file = first;

        //We are going to assume panws only.
        let some = pieces.some(piece => {
            if (file == piece.file) {
                if(piece.player == 1) {
                    return piece.rank + 1 == rank || piece.rank + 2 == rank;
                } else {
                    return piece.rank - 1 == rank || piece.rank - 2 == rank;
                }
            }
        });
        return some;
    }

    return false;
}

const generateMessageNodes = (string, player) => {
    let words = string.split(" ");
    let newNodes = [];

    words.forEach(w => {
        let node;

        let isMove = checkMove(w);
        let isTile = checkMove(w)
        let isValidMove = checkValidMove(w);

        if (isMove) {
            node = document.createElement("span");
            node.classList.add("highlight");
            let tileCode = w;
            node.setAttribute("tile", tileCode);
            node.innerText = tileCode
            let relatedTile = document.querySelector(".square[name=" + tileCode + "]");

            relatedTile.classList.contains("odd") ? node.classList.add("odd") : node.classList.add("even");

            node.addEventListener("mouseenter", () => {
                highlightTile(tileCode, player );
                if(isValidMove) {
                    highlightMove(tileCode, player);
                }
            });

            node.addEventListener("mouseleave", () => {
                clearHighlights();
            });
        } else {
            node = document.createTextNode(" " + w + " ");
        }
        newNodes.push(node);

    })
    return newNodes;
}


const annotateChat = () => {
    let messages = document.querySelectorAll(".message");

    messages.forEach(e => {
        let textNode = e.querySelector(".text");
        let player = e.getAttribute("player");
        let text = textNode.innerText;
        let nodes = generateMessageNodes(text, player);
        textNode.innerText = "";
        nodes.map(n => {
            e.append(n)
        });
    });
}


const highlightTile = (tileCode, player) => {
    let relatedTile = document.querySelector(".square[name=" + tileCode + "]");
    relatedTile.classList.add(player);
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
    originTile.classList.add("move-up");

    originTile.append(arrowEl);
}

const clearHighlights = () => {
    
    let arrow = document.querySelector(".arrow");
    if(arrow) {
        arrow.parentNode.removeChild(arrow);
    }
    let moveOriginEl = document.querySelector(".move-origin");
    if(moveOriginEl) {
        moveOriginEl.classList.remove("move-origin");
    }
    let highlightedEl = document.querySelector(".square.highlight");
    if(highlightedEl){
        highlightedEl.classList.remove("highlight");
    }
    let movedUpEl = document.querySelector(".square.move-up");
    if(movedUpEl){
        highlightedEl.classList.remove("move-up");
    }
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

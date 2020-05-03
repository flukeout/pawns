let inputEl;
let boardSize = 8;
let gleamDelay = 1000;
let boardSelector = ".board"
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let placedPieces = {
    "a1":"bp", 
    "b1":"bp", 
    "c1":"bp", 
    "d1":"bp", 
    "e1":"bp", 
    "f1":"bp", 
    "g1":"bp", 
    "h1":"bp", 
    "a2":"bp", 
    "b2":"bp", 
    "c2":"bp", 
    "d2":"bp", 
    "e2":"bp", 
    "f2":"bp", 
    "g2":"bp", 
    "h2":"bp", 
    "a8": "wp",
    "b8": "wp",
    "c8": "wp",
    "d8": "wp",
    "e8": "wp",
    "f8": "wp",
    "g8": "wp",
    "h8": "wp",
    "a7": "wp",
    "b7": "wp",
    "c7": "wp",
    "d7": "wp",
    "e7": "wp",
    "f7": "wp",
    "g7": "wp",
    "h7": "wp"
    };

document.addEventListener("DOMContentLoaded", function(event) { 
    generateBoard(boardSelector, boardSize);
    placePieces(boardSelector,placedPieces);
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
    let keys = Object.keys(pieces);

    keys.forEach(k => {
        let pieceEl = document.createElement("div");
        pieceEl.className = "piece " + pieces[k];
        board.querySelector("[name=" + k).append(pieceEl);
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


const generateMessageNodes = (string, player) => {
    let words = string.split(" ");
    let newNodes = [];
    let regex = /(?:\:)\b(\w*)\b(?=\:)/g

    words.forEach(w => {
        let node;
        let first = w.substr(0, 1);
        let second = w.substr(1, w.length);
        let isTileCode =  alphabet.includes(first) && !isNaN(parseInt(second));

        if (isTileCode) {
            node = document.createElement("span");
            node.classList.add("highlight");
            let tileCode = w.replace(/:/g, "");
            node.setAttribute("tile", tileCode);
            node.innerText = tileCode
            let relatedTile = document.querySelector(".square[name=" + tileCode + "]");

            relatedTile.classList.contains("odd") ? node.classList.add("odd") : node.classList.add("even");

            node.addEventListener("mouseenter", () => {
                highlightTile(tileCode, player , true);
            });

            node.addEventListener("mouseleave", () => {
                highlightTile(tileCode, player, false);
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


const highlightTile = (tileCode, player, highlight) => {
    let relatedTile = document.querySelector(".square[name=" + tileCode + "]");
    relatedTile.classList.add(player);
    highlight ? relatedTile.classList.add("highlight") : relatedTile.classList.remove("highlight");
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
        toggleSquareClass();
        
        for(let file = 0; file < size; file++) {

            let thisFile = alphabet.charAt(size - file - 1);
            let thisRank = rank + 1;
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

            let name = thisFile + thisRank.toString() 
            square.setAttribute("name", name)
            // square.innerText = name;

            board.appendChild(square);
        }
    }
}

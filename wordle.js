var height = 6;
var width = 5;
var row = 0;
var col = 0;
var gameOver = false;
var word = "ERASE";
var guess = "";

var dictionary = {
    "A": letterA,
    "B": letterB,
    "C": letterC,
    "D": letterD,
    "E": letterE,
    "F": letterF,
    "G": letterG,
    "H": letterH,
    "I": letterI,
    "J": letterJ,
    "K": letterK,
    "L": letterL,
    "M": letterM,
    "N": letterN,
    "O": letterO,
    "P": letterP,
    "Q": letterQ,
    "R": letterR,
    "S": letterS,
    "T": letterT,
    "U": letterU,
    "V": letterV,
    "W": letterW,
    "X": letterX,
    "Y": letterY,
    "Z": letterZ,
};


window.onload = function () {
    initialize();
}

function initialize() {

    //Creating the game board

    for (let r = 0; r < height; r++)
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }

    //keyboard
    let keyboard = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"]];

    for (let i = 0; i < 3; i++) {
        let currRow = keyboard[i];
        let kbrow = document.createElement("div");
        kbrow.classList.add("keyboardRow");

        for (let j = 0; j < currRow.length; j++) {
            let kTile = document.createElement("div");
            let key = currRow[j];
            kTile.innerText = key;

            if (key == "Enter") {
                kTile.id = "Enter";

            }
            else if (key == "⌫")
                kTile.id = "Backspace";
            else if ("A" <= key && key <= "Z") {
                kTile.id = "Key" + key;
            }

            kTile.addEventListener("click", processKey);

            if (key == "Enter") {
                kTile.classList.add("enterTile")
            }
            else {
                kTile.classList.add("keyTile");
            }
            kbrow.appendChild(kTile);

        }
        document.body.appendChild(kbrow);
    }

    //populating
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })

}

function processKey() {
    let e = { "code": this.id };
    processInput(e);
}

function processInput(e) {
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col++;
            }

        }
    }

    else if (e.code == "Backspace") {
        document.getElementById("answer").innerText = "";
        if (0 < col && col <= width)
            col--;
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }

    else if (e.code == "Enter") {
        if (col == width) {
            guess = "";
            for (let c = 0; c < width; c++) {
                let currTile = document.getElementById(row.toString() + '-' + c.toString());
                guess += currTile.innerText;
            }
            update();
        }

    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}

function update() {
    var guessWord = getGuess().toLocaleUpperCase();
    var validword = dictionary[guessWord.charAt(0)][0][guessWord];
    if (validword) {
        let correct = 0;

        let tempGuess = guess.split('');

        let tempWord = word.split('');

        for (let c = 0; c < width; c++) {

            let currTile = document.getElementById(row.toString() + '-' + c.toString());
            let letter = currTile.innerText;
            let letter2 = letter;

            //correct position
            if (tempWord[c] == letter) {
                currTile.classList.add("correct");
                let kTile = document.getElementById("Key" + letter);
                kTile.classList.remove("present");
                kTile.classList.add("correct");
                correct++;
                tempWord[c] = " ";
            }

            // wrong position
            else if (tempWord.includes(letter)) {
                for (let i = 0; i < width; i++) {
                    if (tempWord[i] == letter) {

                        if (tempWord[i] != tempGuess[i]) {    //lulat yggyy
                            tempWord[i] = " ";
                            letter = " ";
                            currTile.classList.add("present");
                            let kTile = document.getElementById("Key" + letter2);
                            if (!kTile.classList.contains("correct")) {
                                kTile.classList.add("present");
                            }
                        }
                    }
                }
            }

            //absent
            else {
                currTile.classList.add("absent");
                let kTile = document.getElementById("Key" + letter);
                if(!kTile.classList.contains("correct") && !kTile.classList.contains("present"))
                kTile.classList.add("absent");
            }

            if (correct == width) {
                gameOver = true;
            }
        }
        
        row++;
        col = 0;
        document.getElementById("answer").innerText = "";
    } else {
        document.getElementById("answer").innerText = "OOPS! Word not Found. Try again";
        document.getElementById("answer").classList.add("error");
    }
}

function getGuess() {
    var guessWord = "";
    for (let i = 0; i < width; i++) {
        guessWord = guessWord + document.getElementById(row.toString() + '-' + i.toString()).innerText;
    }
    return guessWord.toLocaleLowerCase();
}


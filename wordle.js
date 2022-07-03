var height = 6;
var width = 5;
var row = 0;
var col = 0;
var gameOver = false;
var word = "SMILE";

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

    //populating
    document.addEventListener("keyup", (e) => { //arrow function
        if (gameOver) return;
        // alert(e.code);

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
            if (0 < col && col <= width)
                col--;
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })

}

function update() {
    isWordPresentInDictionary(getGuess()).then(value => {
        if (value) {
            console.log("found word");
            let correct = 0;
            for (let c = 0; c < width; c++) {
                let currTile = document.getElementById(row.toString() + '-' + c.toString());
                let letter = currTile.innerText;

                //correct position
                if (word[c] == letter) {
                    currTile.classList.add("correct");
                    correct++;
                }
                // wrong position
                else if (word.includes(letter)) {
                    currTile.classList.add("present");
                }
                //absent
                else {
                    currTile.classList.add("absent");
                }

                if (correct == width) {
                    gameOver = true;
                }
            }
            row++;
            col = 0;
        } else {

        }
    });
}

async function isWordPresentInDictionary(guess) {
    const response = await fetch('https://api.wordnik.com/v4/word.json/' + guess + '/definitions?limit=500&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5');
    const myJson = await response.json(); //extract JSON from the http response

    console.log(myJson);
    console.log(myJson.statusCode);
    if (myJson.statusCode == 404) {
        return false;
    }
    return true;

}

function getGuess() {
    var guess = "";
    for (let i = 0; i < width; i++) {
        guess = guess + document.getElementById(row.toString() + '-' + i.toString()).innerText;
    }
    return guess.toLocaleLowerCase();
}

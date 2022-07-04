var height = 6;
var width = 5;
var row = 0;
var col = 0;
var gameOver = false;
var word = "ATOLL";
var guess = "";

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
            if (col == width) {
                guess = "";
                for (let c = 0; c < width; c++) {
                    let currTile = document.getElementById(row.toString() + '-' + c.toString());
                    guess += currTile.innerText;
                }
                update();
                row++;
                col = 0;
            }

        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })

}

function update() {
    let correct = 0;

    let tempGuess = guess.split('');

    let tempWord = word.split('');



    for (let c = 0; c < width; c++) {

        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //correct position
        if (tempWord[c] == letter) {
            currTile.classList.add("correct");
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

                    }

                }

            }

        }

        //absent
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }
    }
}

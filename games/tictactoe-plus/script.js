const cells = document.querySelectorAll('.cell');

let isCircle = true;

let specialMode = true;
let positionsPlayed = [];


// ***************************
// * Main game button events *
// ***************************
cells.forEach((cell, key) => {
    cell.addEventListener('click', () => {
        if (cell.classList.contains('circle') || cell.classList.contains('cross')) {
            return;
        }

        if (isCircle) {
            cell.classList.add('circle');
            isCircle = false;
        } else {
            cell.classList.add('cross');
            isCircle = true;
        }

        if (specialMode) {
            const fade = document.querySelector('.fade');

            if (fade) {
                fade.classList.remove('fade');
                removeClass(fade);
            }

            positionsPlayed.push(key);
            if (positionsPlayed.length == 6) {
                cells[positionsPlayed.shift()].classList.add("fade");
            }
        }

        checkForWinner();
    });
});
// **********************************
// * End of main game button events *
// **********************************


/**
 * Checks if there is a winner.
 */
function checkForWinner() {
    const winningCombinations = [
        new Set([0, 1, 2]),
        new Set([3, 4, 5]),
        new Set([6, 7, 8]),
        new Set([0, 3, 6]),
        new Set([1, 4, 7]),
        new Set([2, 5, 8]),
        new Set([0, 4, 8]),
        new Set([2, 4, 6])
    ];

    let circle = new Set();
    let cross = new Set();
    cells.forEach((cell, key) => {
        if (cell.classList.contains('circle')) {
            circle.add(key);
        }

        if (cell.classList.contains('cross')) {
            cross.add(key);
        }
    });

    let someoneWon = false;
    let isCircleWinner = false;
    winningCombinations.forEach((combination) => {
        if (compare(combination, circle)) {
            someoneWon = true;
            isCircleWinner = true;
        }

        if (compare(combination, cross)) {
            someoneWon = true;
            isCircleWinner = false;
        }
    });

    if (someoneWon) {
        endGame(
            isCircleWinner ?
            "Circle" :
            "Cross"
        );
        return;
    }

    // Check if it's a draw
    if (circle.size + cross.size == 9) draw();
}

/**
 * 
 * @param {Set<Number>} winCondition 
 * @param {Set<Number>} cells 
 * @returns {boolean}
 */
function compare(winCondition, cells) {
    return [...winCondition].every((x) => cells.has(x));
}

/**
 * 
 * @param {String} winner 
 */
function endGame(winner) {
    setTimeout(() => {
        alert(`${winner} won!`);
        resetGame();
        openMenu();
    }, 100);
}

/**
 * Ends the game in a draw.
 */
function draw() {
    setTimeout(() => {
        alert("It's a draw!");
        resetGame();
        openMenu();
    }, 100);
}

/**
 * Resets the game.
 */
function resetGame() {
    isCircle = true;
    positionsPlayed = [];
    cells.forEach((cell) => {
        removeClass(cell);
    });
}

/**
 * 
 * @param {Element} cell 
 */
function removeClass(cell) {
    cell.classList.remove('circle');
    cell.classList.remove('cross');
}



// ********
// * Menu *
// ********
const dialog = document.querySelector('dialog');
function openMenu() {
    dialog.showModal();
}

function start() {
    const specialModeCheckbox = document.getElementById('specialModeOption');
    specialMode = specialModeCheckbox.checked;
    dialog.close();
}

document.addEventListener('DOMContentLoaded', openMenu);
document.getElementById('startButton').addEventListener('click', start);
// ************
// * End Menu *
// ************

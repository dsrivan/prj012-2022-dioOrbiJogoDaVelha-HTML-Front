let player;
let winner;
let selectedPlayer;
let selectedWinner;
let squaresNotWinner;

function fnGetElemById(id) {
    return document.getElementById(id);
}

function fnGetInnerHTML(elem) {
    return elem.innerHTML;
}

function fnSetInnerHTML(elem, content) {
    elem.innerHTML = content;
}

function fnSetPlayer(val) {
    player = val;
}

function fnSetWinner(val) {
    winner = val;
}

function setSquaresNotWinner(val) {
    squaresNotWinner = val;
}

function fnAddClass(elem, className) {
    return elem.classList.add(className);
}
function fnRemoveClass(elem, className) {
    return elem.classList.remove(className);
}

function fnFinishedGame() {
    setSquaresNotWinner(document.querySelectorAll('.square:not(.isWinner)'));
    squaresNotWinner.forEach(function (square) {
        fnAddClass(square, 'isBlurred');
    });
    fnAddClass(fnGetElemById('controls'), 'isNotPlaying');
}

function fnChooseSquare(id) {
    if (winner !== null) {
        return;
    }

    let square = fnGetElemById(id);
    if (fnGetInnerHTML(square) !== '-') {
        return;
    }

    fnSetInnerHTML(square, player);
    fnAddClass(square, 'colorBlack');

    if (player === 'X') {
        fnSetPlayer('O');
    } else {
        fnSetPlayer('X');
    }

    fnChangePlayer(player);
    fnCheckWinner();
}

function fnChangePlayer(valor) {
    fnSetPlayer(valor);
    fnSetInnerHTML(selectedPlayer, player);
}

function fnCheckWinner() {
    let square1 = fnGetElemById(1);
    let square2 = fnGetElemById(2);
    let square3 = fnGetElemById(3);
    let square4 = fnGetElemById(4);
    let square5 = fnGetElemById(5);
    let square6 = fnGetElemById(6);
    let square7 = fnGetElemById(7);
    let square8 = fnGetElemById(8);
    let square9 = fnGetElemById(9);

    if (fnCheckSequence(square1, square2, square3)) {
        fnChangeColorSquare(square1, square2, square3);
        fnChangeWinner(square1);
        return;
    }

    if (fnCheckSequence(square4, square5, square6)) {
        fnChangeColorSquare(square4, square5, square6);
        fnChangeWinner(square4);
        return;
    }

    if (fnCheckSequence(square7, square8, square9)) {
        fnChangeColorSquare(square7, square8, square9);
        fnChangeWinner(square7);
        return;
    }

    if (fnCheckSequence(square1, square4, square7)) {
        fnChangeColorSquare(square1, square4, square7);
        fnChangeWinner(square1);
        return;
    }

    if (fnCheckSequence(square2, square5, square8)) {
        fnChangeColorSquare(square2, square5, square8);
        fnChangeWinner(square2);
        return;
    }

    if (fnCheckSequence(square3, square6, square9)) {
        fnChangeColorSquare(square3, square6, square9);
        fnChangeWinner(square3);
        return;
    }

    if (fnCheckSequence(square1, square5, square9)) {
        fnChangeColorSquare(square1, square5, square9);
        fnChangeWinner(square1);
        return;
    }

    if (fnCheckSequence(square3, square5, square7)) {
        fnChangeColorSquare(square3, square5, square7);
        fnChangeWinner(square3);
    }
}

function fnChangeWinner(square) {
    fnSetWinner(fnGetInnerHTML(square));
    fnSetInnerHTML(selectedWinner, winner);
}

function fnChangeColorSquare(square1, square2, square3) {
    fnAddClass(square1, 'isWinner');
    fnAddClass(square2, 'isWinner');
    fnAddClass(square3, 'isWinner');

    fnFinishedGame();
}

function fnCheckSequence(square1, square2, square3) {
    if (
        fnGetInnerHTML(square1) !== '-' &&
        fnGetInnerHTML(square1) === fnGetInnerHTML(square2) &&
        fnGetInnerHTML(square2) === fnGetInnerHTML(square3)
    ) {
        return true;
    }
    return false;
}

function fnReset() {
    fnSetWinner(null);
    fnSetInnerHTML(selectedWinner, '');

    if (squaresNotWinner != null) {
        squaresNotWinner.forEach(function (square) {
            fnRemoveClass(square, 'isBlurred');
        });
    }
    fnRemoveClass(fnGetElemById('controls'), 'isNotPlaying');

    for (let i = 1; i <= 9; i++) {
        let square = fnGetElemById(i);
        fnRemoveClass(square, 'isWinner');
        fnRemoveClass(square, 'colorBlack');
        fnSetInnerHTML(square, '-');
    }
    fnChangePlayer('X');
}

fnSetPlayer(null);
fnSetWinner(null);
setSquaresNotWinner(null);
selectedPlayer = fnGetElemById('selected-player');
selectedWinner = fnGetElemById('selected-winner');
fnChangePlayer('X');
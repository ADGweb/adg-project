/* eslint no-magic-numbers: 0 */

const menu = document.querySelector('.tic-tac-toe__menu');
const buttonStart = document.querySelector('.tic-tac-toe__button-start');
const selectStyle = document.querySelector('.tic-tac-toe__select_type_style');
const selectMode = document.querySelector('.tic-tac-toe__select_type_mode');
const field = document.querySelector('.tic-tac-toe__field');
const cells = document.querySelectorAll('.tic-tac-toe__cell');
const cellsArr = Array.prototype.slice.call( cells );
const buttonRestart = document.querySelector('.tic-tac-toe__button-restart');
const infoFirst = document.querySelector('.tic-tac-toe__info_gamer_first');
const infoSecond = document.querySelector('.tic-tac-toe__info_gamer_second');
const difficulty = document.querySelector('.tic-tac-toe__difficulty-wrapper');
const easyGame = document.querySelector('#easy');
const normalGame = document.querySelector('#normal');
const firstWiner = document.querySelector('.tic-tac-toe__winning-text_gamer_first');
const secondWiner = document.querySelector('.tic-tac-toe__winning-text_gamer_second');

let style = 'classic';
let resultArr = [];
let arrActive = [];
let userArr = [];
let compArr = [];
let counter = 0;
let computerCell = 0;
let compMove = 0;
let itСontinues = true;

buttonStart.addEventListener( 'click', startGame );
buttonRestart.addEventListener( 'click', restartGame );
selectStyle.addEventListener( 'change', addStyle );
selectMode.addEventListener( 'change', selectionDifficulty );


function selectionDifficulty() {
    if(selectMode.value === 'User vs computer') {
        easyGame.removeAttribute('disabled');
        normalGame.removeAttribute('disabled');
        difficulty.classList.add('tic-tac-toe__difficulty-wrapper_type_active');
    } else if(selectMode.value === 'Computer vs user') {
        easyGame.removeAttribute('disabled');
        normalGame.removeAttribute('disabled');
        difficulty.classList.add('tic-tac-toe__difficulty-wrapper_type_active');
    } else {
        easyGame.setAttribute('disabled', 'disabled');
        normalGame.setAttribute('disabled', 'disabled');
        difficulty.classList.remove('tic-tac-toe__difficulty-wrapper_type_active');
    }
}

function addStyle() {
    /* Этот блок нужно упростить. Сделать функцию. */
    if(selectStyle.value === 'Classic') {
        style = 'classic';
        field.classList.remove('tic-tac-toe__field_style_modern');
        field.classList.remove('tic-tac-toe__field_style_blindly');
        cellsArr.forEach(someCell => {
            someCell.classList.remove('tic-tac-toe__cell_type_modern');
            someCell.classList.remove('tic-tac-toe__cell_type_blindly');
            someCell.classList.remove('tic-tac-toe__cell_type_active-blindly');
            someCell.classList.remove('tic-tac-toe__cell_type_active-modern');
            someCell.classList.add('tic-tac-toe__cell_type_active-classic');
        });
    } else if(selectStyle.value === 'Modern') {
        style = 'modern';
        field.classList.remove('tic-tac-toe__field_style_blindly');
        field.classList.add('tic-tac-toe__field_style_modern');
        cellsArr.forEach(someCell => {
            someCell.classList.remove('tic-tac-toe__cell_type_blindly');
            someCell.classList.add('tic-tac-toe__cell_type_modern');
            someCell.classList.remove('tic-tac-toe__cell_type_active-classic');
            someCell.classList.remove('tic-tac-toe__cell_type_active-blindly');
            someCell.classList.add('tic-tac-toe__cell_type_active-modern');
        });
    } else {
        style = 'blindly';
        field.classList.remove('tic-tac-toe__field_style_modern');
        field.classList.add('tic-tac-toe__field_style_blindly');
        cellsArr.forEach(someCell => {
            someCell.classList.remove('tic-tac-toe__cell_type_modern');
            someCell.classList.add('tic-tac-toe__cell_type_blindly');
            someCell.classList.remove('tic-tac-toe__cell_type_active-classic');
            someCell.classList.remove('tic-tac-toe__cell_type_active-modern');
            someCell.classList.add('tic-tac-toe__cell_type_active-blindly');
        });
    }
}

function addMode() {
    addInfo()

    if(selectMode.value === 'User vs computer') {
        field.addEventListener( 'click', addStepUser );
    } else if(selectMode.value === 'Computer vs user') {
        normalGame.checked ? addAutoStepNormal() : addAutoStep();
        field.addEventListener( 'click', addStepUser );
    } else {
        field.addEventListener( 'click', addStep );
    }
}

function addInfo(){
    if (counter % 2 === 0 ){
        infoSecond.classList.remove('tic-tac-toe__info_type_active');
        infoFirst.classList.add('tic-tac-toe__info_type_active');
    }
    else {
        infoFirst.classList.remove('tic-tac-toe__info_type_active');
        infoSecond.classList.add('tic-tac-toe__info_type_active');
    }
}

function startGame() {
    addMode();
    selectStyle.setAttribute('disabled', 'disabled');
    selectMode.setAttribute('disabled', 'disabled');

    menu.classList.add('tic-tac-toe__menu_type_desabled');
    buttonStart.classList.add('tic-tac-toe__button-start_type_desabled');
    difficulty.classList.add('tic-tac-toe__difficulty-wrapper_type_desabled');
    selectStyle.classList.add('tic-tac-toe__select_type_desabled');
    selectMode.classList.add('tic-tac-toe__select_type_desabled');

    field.classList.remove('tic-tac-toe__field_type_desabled');
}

function addButtonRestart() {
    field.removeEventListener( 'click', addStep );
    field.removeEventListener( 'click', addStepUser );

    infoFirst.classList.remove('tic-tac-toe__info_type_active');
    infoSecond.classList.remove('tic-tac-toe__info_type_active');

    buttonRestart.classList.add('tic-tac-toe__button-restart_type_active');

    itСontinues = !itСontinues;
}

function addWin( winNumberItemArr, turn ) {
    console.log(turn);
    cellsArr.forEach(cell => {
        cell.classList.remove(`tic-tac-toe__cell_type_active-${style}`);
    });

    winNumberItemArr.forEach(position => {
        cellsArr[position].classList.add('tic-tac-toe__cell_type_win');
    });

    if( counter % 2 !== 0 ) {
        firstWiner.classList.add('tic-tac-toe__winning-text_type_active');
    } else {
        secondWiner.classList.add('tic-tac-toe__winning-text_type_active');
    }

    addButtonRestart();
}

function checksLocation( turn ) {
    cellsArr.forEach(someCell => {
        if (someCell.classList.contains(`tic-tac-toe__cell_style_${style}-${turn}`)) {
            resultArr.push(1);
        }
        else {
            resultArr.push(0);
        }
    });

    if ( resultArr[0] && resultArr[1] && resultArr[2]) {
        const winNumberItemArr = [0, 1, 2];

        addWin( winNumberItemArr, counter );
    }

    if ( resultArr[3] && resultArr[4] && resultArr[5]) {
        const winNumberItemArr = [3, 4, 5];

        addWin( winNumberItemArr, counter );
    }

    if ( resultArr[6] && resultArr[7] && resultArr[8]) {
        const winNumberItemArr = [6, 7, 8];

        addWin( winNumberItemArr, counter );
    }

    if ( resultArr[0] && resultArr[3] && resultArr[6]) {
        const winNumberItemArr = [0, 3, 6];

        addWin( winNumberItemArr, counter );
    }

    if ( resultArr[1] && resultArr[4] && resultArr[7]) {
        const winNumberItemArr = [1, 4, 7];

        addWin( winNumberItemArr, counter );
    }

    if ( resultArr[2] && resultArr[5] && resultArr[8]) {
        const winNumberItemArr = [2, 5, 8];

        addWin( winNumberItemArr, counter );
    }

    if ( resultArr[0] && resultArr[4] && resultArr[8]) {
        const winNumberItemArr = [0, 4, 8];

        addWin( winNumberItemArr, counter );
    }

    if ( resultArr[2] && resultArr[4] && resultArr[6]) {
        const winNumberItemArr = [2, 4, 6];

        addWin( winNumberItemArr, counter );
    }
}

function addStep( e ) {
    const cell = e.target;

    if (cell !== field && !cell.classList.contains('tic-tac-toe__cell_type_used')) {
        counter++;

        addInfo();

        cell.classList.remove(`tic-tac-toe__cell_type_active-${style}`);
        cell.classList.add('tic-tac-toe__cell_type_used');

        if ( counter % 2 === 0 ){
            cell.classList.add(`tic-tac-toe__cell_style_${style}-o`);
            checksLocation('o');
        }
        else {
            cell.classList.add(`tic-tac-toe__cell_style_${style}-x`);
            checksLocation('x');
        }
    }

    resultArr.length = 0;

    if (counter === 9) {
        addButtonRestart();
    }
}

function addStepUser() {
    const cell = event.target;

    if (cell !== field && !cell.classList.contains('tic-tac-toe__cell_type_used')) {
        counter++;

        if(itСontinues) {
            addInfo();
        }

        cell.classList.remove(`tic-tac-toe__cell_type_active-${style}`);
        cell.classList.add('tic-tac-toe__cell_type_used');
        cell.classList.add(`tic-tac-toe__cell_style_${style}-x`);
        cell.setAttribute('data-used', 'user');
        checksLocation('x');
        field.removeEventListener( 'click', addStepUser );

        resultArr.length = 0;

        if (counter === 9 && itСontinues) {
            addButtonRestart();
        }

        if(itСontinues && easyGame.checked) {
            setTimeout(addAutoStep, 500);
        } else if(itСontinues && normalGame.checked) {
            setTimeout(addAutoStepNormal, 500);
        }
    }
}

function addAutoStep(){
    let i = 0;

    arrActive.length = 0;

    cellsArr.forEach(cell => {
        i++;

        if (cell.classList.contains(`tic-tac-toe__cell_type_active-${style}`)) {
            arrActive.push(i);
        }
    });
    computerCell = Math.floor(Math.random() * (9 - counter) + 1);
    cellsArr[arrActive[computerCell-1] - 1].classList.remove(`tic-tac-toe__cell_type_active-${style}`);
    cellsArr[arrActive[computerCell-1] - 1].classList.add('tic-tac-toe__cell_type_used');
    cellsArr[arrActive[computerCell-1] - 1].classList.add(`tic-tac-toe__cell_style_${style}-o`);

    checksLocation('o');

    if(itСontinues) {
        field.addEventListener( 'click', addStepUser );
    }

    resultArr.length = 0;
    counter++;

    if(itСontinues) {
        addInfo();
    }

    if (counter === 9 && itСontinues) {
        addButtonRestart();
    }
}

function addAutoStepNormal(){
    let i = 0;

    arrActive.length = 0;
    userArr.length = 0;
    compArr.length = 0;

    cellsArr.forEach(cell => {
        i++;

        if(cell.dataset.used === 'user') {
            userArr.push(i);
        }

        if(cell.dataset.used === 'comp') {
            compArr.push(i);
        }

        if (cell.classList.contains(`tic-tac-toe__cell_type_active-${style}`)) {
            arrActive.push(i);
        }
    })

    checksProbabilityWinning();

    if( compMove === 0 ) {
        computerCell = Math.floor(Math.random() * (9 - counter) + 1);
        cellsArr[arrActive[computerCell-1] - 1].classList.remove(`tic-tac-toe__cell_type_active-${style}`);
        cellsArr[arrActive[computerCell-1] - 1].classList.add('tic-tac-toe__cell_type_used');
        cellsArr[arrActive[computerCell-1] - 1].classList.add(`tic-tac-toe__cell_style_${style}-o`);
        cellsArr[arrActive[computerCell-1] - 1].setAttribute('data-used', 'comp');
    } else {
        cellsArr[compMove - 1].classList.remove(`tic-tac-toe__cell_type_active-${style}`);
        cellsArr[compMove - 1].classList.add('tic-tac-toe__cell_type_used');
        cellsArr[compMove - 1].classList.add(`tic-tac-toe__cell_style_${style}-o`);
        cellsArr[compMove - 1].setAttribute('data-used', 'comp');
    }

    compMove = 0;

    checksLocation('o');

    if(itСontinues) {
        field.addEventListener( 'click', addStepUser );
    }

    resultArr.length = 0;
    counter++;

    if(itСontinues) {
        addInfo();
    }

    if (counter === 9 && itСontinues) {
        addButtonRestart();
    }
}

function checksProbabilityWinning() {
    let move = 0;

    if(compArr.indexOf(1) >= 0 && compArr.indexOf(2) >= 0 && arrActive.indexOf(3) >= 0) {
        move = 3;
    } else if(compArr.indexOf(1) >= 0 && compArr.indexOf(3) >= 0 && arrActive.indexOf(2) >= 0) {
        move = 2;
    } else if(compArr.indexOf(2) >= 0 && compArr.indexOf(3) >= 0 && arrActive.indexOf(1) >= 0) {
        move = 1;
    } else if(compArr.indexOf(4) >= 0 && compArr.indexOf(5) >= 0 && arrActive.indexOf(6) >= 0) {
        move = 6;
    } else if(compArr.indexOf(4) >= 0 && compArr.indexOf(6) >= 0 && arrActive.indexOf(5) >= 0) {
        move = 5;
    } else if(compArr.indexOf(5) >= 0 && compArr.indexOf(6) >= 0 && arrActive.indexOf(4) >= 0) {
        move = 4;
    } else if(compArr.indexOf(7) >= 0 && compArr.indexOf(8) >= 0 && arrActive.indexOf(9) >= 0) {
        move = 9;
    } else if(compArr.indexOf(7) >= 0 && compArr.indexOf(9) >= 0 && arrActive.indexOf(8) >= 0) {
        move = 8;
    } else if(compArr.indexOf(8) >= 0 && compArr.indexOf(9) >= 0 && arrActive.indexOf(7) >= 0) {
        move = 7;
    } else if(compArr.indexOf(1) >= 0 && compArr.indexOf(4) >= 0 && arrActive.indexOf(7) >= 0) {
        move = 7;
    } else if(compArr.indexOf(1) >= 0 && compArr.indexOf(7) >= 0 && arrActive.indexOf(4) >= 0) {
        move = 4;
    } else if(compArr.indexOf(4) >= 0 && compArr.indexOf(7) >= 0 && arrActive.indexOf(1) >= 0) {
        move = 1;
    } else if(compArr.indexOf(2) >= 0 && compArr.indexOf(5) >= 0 && arrActive.indexOf(8) >= 0) {
        move = 8;
    } else if(compArr.indexOf(2) >= 0 && compArr.indexOf(8) >= 0 && arrActive.indexOf(5) >= 0) {
        move = 5;
    } else if(compArr.indexOf(5) >= 0 && compArr.indexOf(8) >= 0 && arrActive.indexOf(2) >= 0) {
        move = 2;
    } else if(compArr.indexOf(3) >= 0 && compArr.indexOf(6) >= 0 && arrActive.indexOf(9) >= 0) {
        move = 9;
    } else if(compArr.indexOf(3) >= 0 && compArr.indexOf(9) >= 0 && arrActive.indexOf(6) >= 0) {
        move = 6;
    } else if(compArr.indexOf(6) >= 0 && compArr.indexOf(9) >= 0 && arrActive.indexOf(3) >= 0) {
        move = 3;
    } else if(compArr.indexOf(1) >= 0 && compArr.indexOf(5) >= 0 && arrActive.indexOf(9) >= 0) {
        move = 9;
    } else if(compArr.indexOf(1) >= 0 && compArr.indexOf(9) >= 0 && arrActive.indexOf(5) >= 0) {
        move = 5;
    } else if(compArr.indexOf(5) >= 0 && compArr.indexOf(9) >= 0 && arrActive.indexOf(1) >= 0) {
        move = 1;
    } else if(compArr.indexOf(3) >= 0 && compArr.indexOf(5) >= 0 && arrActive.indexOf(7) >= 0) {
        move = 7;
    } else if(compArr.indexOf(3) >= 0 && compArr.indexOf(7) >= 0 && arrActive.indexOf(5) >= 0) {
        move = 5;
    } else if(compArr.indexOf(5) >= 0 && compArr.indexOf(7) >= 0 && arrActive.indexOf(3) >= 0) {
        move = 3;
    }

    if(move === 0) {
        if(userArr.indexOf(1) >= 0 && userArr.indexOf(2) >= 0 && arrActive.indexOf(3) >= 0) {
            move = 3;
        } else if(userArr.indexOf(1) >= 0 && userArr.indexOf(3) >= 0 && arrActive.indexOf(2) >= 0) {
            move = 2;
        } else if(userArr.indexOf(2) >= 0 && userArr.indexOf(3) >= 0 && arrActive.indexOf(1) >= 0) {
            move = 1;
        } else if(userArr.indexOf(4) >= 0 && userArr.indexOf(5) >= 0 && arrActive.indexOf(6) >= 0) {
            move = 6;
        } else if(userArr.indexOf(4) >= 0 && userArr.indexOf(6) >= 0 && arrActive.indexOf(5) >= 0) {
            move = 5;
        } else if(userArr.indexOf(5) >= 0 && userArr.indexOf(6) >= 0 && arrActive.indexOf(4) >= 0) {
            move = 4;
        } else if(userArr.indexOf(7) >= 0 && userArr.indexOf(8) >= 0 && arrActive.indexOf(9) >= 0) {
            move = 9;
        } else if(userArr.indexOf(7) >= 0 && userArr.indexOf(9) >= 0 && arrActive.indexOf(8) >= 0) {
            move = 8;
        } else if(userArr.indexOf(8) >= 0 && userArr.indexOf(9) >= 0 && arrActive.indexOf(7) >= 0) {
            move = 7;
        } else if(userArr.indexOf(1) >= 0 && userArr.indexOf(4) >= 0 && arrActive.indexOf(7) >= 0) {
            move = 7;
        } else if(userArr.indexOf(1) >= 0 && userArr.indexOf(7) >= 0 && arrActive.indexOf(4) >= 0) {
            move = 4;
        } else if(userArr.indexOf(4) >= 0 && userArr.indexOf(7) >= 0 && arrActive.indexOf(1) >= 0) {
            move = 1;
        } else if(userArr.indexOf(2) >= 0 && userArr.indexOf(5) >= 0 && arrActive.indexOf(8) >= 0) {
            move = 8;
        } else if(userArr.indexOf(2) >= 0 && userArr.indexOf(8) >= 0 && arrActive.indexOf(5) >= 0) {
            move = 5;
        } else if(userArr.indexOf(5) >= 0 && userArr.indexOf(8) >= 0 && arrActive.indexOf(2) >= 0) {
            move = 2;
        } else if(userArr.indexOf(3) >= 0 && userArr.indexOf(6) >= 0 && arrActive.indexOf(9) >= 0) {
            move = 9;
        } else if(userArr.indexOf(3) >= 0 && userArr.indexOf(9) >= 0 && arrActive.indexOf(6) >= 0) {
            move = 6;
        } else if(userArr.indexOf(6) >= 0 && userArr.indexOf(9) >= 0 && arrActive.indexOf(3) >= 0) {
            move = 3;
        } else if(userArr.indexOf(1) >= 0 && userArr.indexOf(5) >= 0 && arrActive.indexOf(9) >= 0) {
            move = 9;
        } else if(userArr.indexOf(1) >= 0 && userArr.indexOf(9) >= 0 && arrActive.indexOf(5) >= 0) {
            move = 5;
        } else if(userArr.indexOf(5) >= 0 && userArr.indexOf(9) >= 0 && arrActive.indexOf(1) >= 0) {
            move = 1;
        } else if(userArr.indexOf(3) >= 0 && userArr.indexOf(5) >= 0 && arrActive.indexOf(7) >= 0) {
            move = 7;
        } else if(userArr.indexOf(3) >= 0 && userArr.indexOf(7) >= 0 && arrActive.indexOf(5) >= 0) {
            move = 5;
        } else if(userArr.indexOf(5) >= 0 && userArr.indexOf(7) >= 0 && arrActive.indexOf(3) >= 0) {
            move = 3;
        }
    }

    compMove = move;
}

function restartGame() {
    cellsArr.forEach(cell => {
        cell.removeAttribute('class');
        cell.setAttribute('class', `tic-tac-toe__cell tic-tac-toe__cell_type_active-${style}`);
        cell.removeAttribute('data-used');
    });

    field.classList.add('tic-tac-toe__field_type_desabled');

    buttonRestart.classList.remove('tic-tac-toe__button-restart_type_active');
    counter = 0;
    itСontinues = !itСontinues;

    menu.classList.remove('tic-tac-toe__menu_type_desabled');
    buttonStart.classList.remove('tic-tac-toe__button-start_type_desabled');
    difficulty.classList.remove('tic-tac-toe__difficulty-wrapper_type_desabled');
    selectStyle.classList.remove('tic-tac-toe__select_type_desabled');
    selectMode.classList.remove('tic-tac-toe__select_type_desabled');
    selectStyle.removeAttribute('disabled');
    selectMode.removeAttribute('disabled');
    firstWiner.classList.remove('tic-tac-toe__winning-text_type_active');
    secondWiner.classList.remove('tic-tac-toe__winning-text_type_active');

    addStyle()
}
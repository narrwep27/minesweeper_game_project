// Global constants that remain with changing grid sizes
const squareArray = document.querySelectorAll(`.square`);
let mineNumArray = [];
mineNumArray.length = squareArray.length;
mineNumArray.fill(0);
const coverArray = document.querySelectorAll(`.cover`);
const redFlagArray = document.querySelectorAll(`.redFlag`);
let minePercent = null;
// Game end variables
let winArray = [];
let boomCovers = null;
const gameEndDisplay = document.querySelector(`#gameEndDisplay`);
// Timer global variables
let timePassed = 0;
let previousTime = Infinity;
let timeStarted = false;
let swFunctionVar = null;

// Global constants that need updates with changing grid sizes
const row1Array = document.querySelectorAll(`.row1`);
const row2Array = document.querySelectorAll(`.row2`);
const row3Array = document.querySelectorAll(`.row3`);
const row4Array = document.querySelectorAll(`.row4`);
const row5Array = document.querySelectorAll(`.row5`);
const row6Array = document.querySelectorAll(`.row6`);
const row7Array = document.querySelectorAll(`.row7`);
const row8Array = document.querySelectorAll(`.row8`);
const row9Array = document.querySelectorAll(`.row9`);

const coverRow1Array = document.querySelectorAll(`.covRow1`);
const coverRow2Array = document.querySelectorAll(`.covRow2`);
const coverRow3Array = document.querySelectorAll(`.covRow3`);
const coverRow4Array = document.querySelectorAll(`.covRow4`);
const coverRow5Array = document.querySelectorAll(`.covRow5`);
const coverRow6Array = document.querySelectorAll(`.covRow6`);
const coverRow7Array = document.querySelectorAll(`.covRow7`);
const coverRow8Array = document.querySelectorAll(`.covRow8`);
const coverRow9Array = document.querySelectorAll(`.covRow9`);

// Functions for game logic
// Function for random number generator that ranges within squareArray.length
const RNG = () => {
    return Math.floor(Math.random() * squareArray.length)
};
// Creates and places mines in random square to fill up no more than 12%(easy) and 16%(hard) of board
const createMine = () => {
    let randNum = RNG();
    const mine = document.createElement(`img`);
    mine.setAttribute(`src`, `../images/bomb.png`);
    mine.setAttribute(`class`, `mine`);
    if (squareArray[randNum].classList[1] === `empty`) {
        squareArray[randNum].classList.replace(`empty`, `mineHere`);
        squareArray[randNum].append(mine);
    };
};
const setMines = () => {
    // Need to change minePercent threshold with different difficulties
    while (minePercent < .15) {
        createMine();
        minePercent = parseFloat(document.querySelectorAll(`.mine`).length / squareArray.length);
    };
    for (i = 0; i < squareArray.length; i++) {
        if (squareArray[i].classList[1] === `mineHere`) {
            coverArray[i].classList.replace(`safe`, `boom`);
        };
    };
};
// Function for empty squares in row 1 to check number of adjacent mines
const row1CornerCount = (mineArrayIndexLast) => {
    for (i = 0; i < row1Array.length; i++) {
        if (row1Array[i].classList[1] === `empty`) {
            if (row1Array[i] === row1Array[0]) {
                if (row1Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[0] += 1;
                };
                if (row2Array[i].classList[1] === `mineHere`) {
                    mineNumArray[0] += 1;
                };
                if (row2Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[0] += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineNumArray[0];
                row1Array[i].append(mineNum);
            };
            if (row1Array[i] === row1Array[row1Array.length - 1]) {
                if (row1Array[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                if (row2Array[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                if (row2Array[i].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineArrayIndexLast;
                row1Array[i].append(mineNum);
            };
        };
    };
};
const row1CenterCount = (colString, arrayInd) => {
    for (i = 0; i < row1Array.length; i++) {
        if (row1Array[i].classList[1] === `empty`) {
            if (row1Array[i].classList[3] === colString) {
                if (row1Array[i - 1].classList[1] === `mineHere`) {
                    arrayInd += 1;
                };
                if (row1Array[i + 1].classList[1] === `mineHere`) {
                    arrayInd += 1;
                };
                if (row2Array[i - 1].classList[1] === `mineHere`) {
                    arrayInd += 1;
                };
                if (row2Array[i].classList[1] === `mineHere`) {
                    arrayInd += 1;
                };
                if (row2Array[i + 1].classList[1] === `mineHere`) {
                    arrayInd += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = arrayInd;
                row1Array[i].append(mineNum);
            };
        };
    };
};
// Function for bottom row squares to check number of mines
const lastRowCornerCount = (rowArray, rowAbove, mineArrayIndexFirst, mineArrayIndexLast) => {
    for (i = 0; i < rowArray.length; i++) {
        if (rowArray[i].classList[1] === `empty`) {
            if (rowArray[i] === rowArray[0]) {
                if (rowAbove[i].classList[1] === `mineHere`) {
                    mineArrayIndexFirst += 1;
                };
                if (rowAbove[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndexFirst += 1;
                };
                if (rowArray[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndexFirst += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineArrayIndexFirst;
                rowArray[i].append(mineNum);
            };
            if (rowArray[i] === rowArray[rowArray.length - 1]) {
                if (rowAbove[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                if (rowAbove[i].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                if (rowArray[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineArrayIndexLast;
                rowArray[i].append(mineNum);
            };
        };
    };
};
const lastRowCenterCount = (rowArray, colString, rowAbove, mineArrayIndex) => {
    for (i = 0; i < rowArray.length; i++) {
        if (rowArray[i].classList[1] === `empty`) {
            if (rowArray[i].classList[3] === colString) {
                if (rowAbove[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowAbove[i].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowAbove[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowArray[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowArray[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineArrayIndex;
                rowArray[i].append(mineNum);
            };
        };
    };
};
// Function for edge squares in middle rows to check number of adjacent mines
const midEdgeCount = (rowArray, rowAbove, rowBelow, mineArrayIndexFirst, mineArrayIndexLast) => {
    for (i = 0; i < rowArray.length; i++) {
        if (rowArray[i].classList[1] === `empty`) {
            if (rowArray[i] === rowArray[0]) {
                if (rowAbove[i].classList[1] === `mineHere`) {
                    mineArrayIndexFirst += 1;
                };
                if (rowAbove[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndexFirst += 1;
                };
                if (rowArray[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndexFirst += 1;
                };
                if (rowBelow[i].classList[1] === `mineHere`) {
                    mineArrayIndexFirst += 1;
                };
                if (rowBelow[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndexFirst += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineArrayIndexFirst;
                rowArray[i].append(mineNum);
            };
            if (rowArray[i] === rowArray[rowArray.length - 1]) {
                if (rowAbove[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                if (rowAbove[i].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                if (rowArray[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                if (rowBelow[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                if (rowBelow[i].classList[1] === `mineHere`) {
                    mineArrayIndexLast += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineArrayIndexLast;
                rowArray[i].append(mineNum);
            };
        };
    };
};
// Function for center squares in middle rows to check for mines
const midCenterCount = (rowArray, colString, rowAbove, rowBelow, mineArrayIndex) => {
    for (i = 0; i < rowArray.length; i++) {
        if (rowArray[i].classList[1] === `empty`) {
            if (rowArray[i].classList[3] === colString) {
                if (rowAbove[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowAbove[i].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowAbove[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowArray[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowArray[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowBelow[i - 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowBelow[i].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                if (rowBelow[i + 1].classList[1] === `mineHere`) {
                    mineArrayIndex += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineArrayIndex;
                rowArray[i].append(mineNum);
            };
        };
    };
};
// Function to click cover and reveal number/mine
const hideCoverShowFlag = () => {
    for (i = 0; i < coverArray.length; i++) {
        let currentCover = coverArray[i];
        let currentFlag = redFlagArray[i];
        const hideCover = () => {
            for (i = 0; i < coverArray.length; i++) {
                currentCover.style.visibility = `hidden`;
            };
        };
        currentCover.addEventListener(`click`, hideCover);
        currentCover.addEventListener(`contextmenu`, () => {
            if (currentCover.classList[2] === `unflagged`) {
                currentCover.classList.replace(`unflagged`, `flagged`);
                currentFlag.classList.replace(`hide`, `show`);
            } else if (currentCover.classList[2] === `flagged`) {
                currentCover.classList.replace(`flagged`, `unflagged`);
                currentFlag.classList.replace(`show`, `hide`);
            };
        });
    };
};
// Variables and functions to prep win/lose condition
const makeWinArray = () => {
    for (i = 0; i < coverArray.length; i++) {
        if (coverArray[i].classList[1] === `safe`) {
            winArray[i] = 1;
        } else if (coverArray[i].classList[1] === `boom`) {
            winArray[i] = 0;
        };
    };
};
const arraysEqual = (array1, array2) => {
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        };
    };
    return true;
};
const loseDisplay = () => {
    document.querySelector(`#gameEndDisplay`).style.display = `block`;
    document.querySelector(`#gameEndText`).innerHTML  = `You stepped on a mine...`;
    document.querySelector(`#winLossEmoji`).innerHTML = `&#128565`;
    for (i = 0; i < boomCovers.length; i++) {
        boomCovers[i].removeEventListener(`click`, loseDisplay);
    };
};
const loseCondition = () => {
    boomCovers = document.querySelectorAll(`.boom`);
    for (i = 0; i < boomCovers.length; i++) {
        boomCovers[i].addEventListener(`click`, loseDisplay);
    };
};
const winCondition = () => {
    let coversClickedArray = [];
    coversClickedArray.length = coverArray.length;
    coversClickedArray.fill(0);
    for (i = 0; i < coverArray.length; i++) {
        let index = i;
        coverArray[i].addEventListener(`click`, () => {
            coversClickedArray[index] = 1;
            if (arraysEqual(coversClickedArray, winArray)) {
                document.querySelector(`#gameEndDisplay`).style.display = `block`;
                document.querySelector(`#gameEndText`).innerHTML = `You cleared all the mines!`;
                document.querySelector(`#winLossEmoji`).innerHTML = `&#128512`;
                for (i = 0; i < boomCovers.length; i++) {
                    boomCovers[i].removeEventListener(`click`, loseDisplay);
                };
            };
        });
    };
};
// Function for changing number colors
const numColors = () => {
    let numTexts = document.querySelectorAll(`.square h3`);
    for (i = 0; i < numTexts.length; i++) {
        if (numTexts[i].innerHTML === `1`) {
            numTexts[i].style.color = `blue`;
        } else if (numTexts[i].innerHTML === `2`) {
            numTexts[i].style.color = `green`;
        } else if (numTexts[i].innerHTML === `3`) {
            numTexts[i].style.color = `red`;
        } else if (numTexts[i].innerHTML === `4`) {
            numTexts[i].style.color = `darkblue`;
        } else if (numTexts[i].innerHTML === `5`) {
            numTexts[i].style.color = `darkred`;
        } else if (numTexts[i].innerHTML === `6`) {
            numTexts[i].style.color = `teal`;
        } else if (numTexts[i].innerHTML === `8`) {
            numTexts[i].style.color = `gray`;
        };
    };
};
// Function to start game
const gameStart = () => {
    setMines();
    // row1 mine check
    row1CornerCount(mineNumArray[8]);
    row1CenterCount(`col2`, mineNumArray[1]);
    row1CenterCount(`col3`, mineNumArray[2]);
    row1CenterCount(`col4`, mineNumArray[3]);
    row1CenterCount(`col5`, mineNumArray[4]);
    row1CenterCount(`col6`, mineNumArray[5]);
    row1CenterCount(`col7`, mineNumArray[6]);
    row1CenterCount(`col8`, mineNumArray[7]);
    // last row mine check
    lastRowCornerCount(row9Array, row8Array, mineNumArray[72], mineNumArray[80]);
    lastRowCenterCount(row9Array, `col2`, row8Array, mineNumArray[73]);
    lastRowCenterCount(row9Array, `col3`, row8Array, mineNumArray[74]);
    lastRowCenterCount(row9Array, `col4`, row8Array, mineNumArray[75]);
    lastRowCenterCount(row9Array, `col5`, row8Array, mineNumArray[76]);
    lastRowCenterCount(row9Array, `col6`, row8Array, mineNumArray[77]);
    lastRowCenterCount(row9Array, `col7`, row8Array, mineNumArray[78]);
    lastRowCenterCount(row9Array, `col8`, row8Array, mineNumArray[79]);
    // edge of middle rows mine check
    midEdgeCount(row2Array, row1Array, row3Array, mineNumArray[9], mineNumArray[17]);
    midEdgeCount(row3Array, row2Array, row4Array, mineNumArray[18], mineNumArray[26]);
    midEdgeCount(row4Array, row3Array, row5Array, mineNumArray[27], mineNumArray[35]);
    midEdgeCount(row5Array, row4Array, row6Array, mineNumArray[36], mineNumArray[44]);
    midEdgeCount(row6Array, row5Array, row7Array, mineNumArray[45], mineNumArray[53]);
    midEdgeCount(row7Array, row6Array, row8Array, mineNumArray[54], mineNumArray[62]);
    midEdgeCount(row8Array, row7Array, row9Array, mineNumArray[63], mineNumArray[71]);
    // center of middle rows mine check
    midCenterCount(row2Array, `col2`, row1Array, row3Array, mineNumArray[10]);
    midCenterCount(row2Array, `col3`, row1Array, row3Array, mineNumArray[11]);
    midCenterCount(row2Array, `col4`, row1Array, row3Array, mineNumArray[12]);
    midCenterCount(row2Array, `col5`, row1Array, row3Array, mineNumArray[13]);
    midCenterCount(row2Array, `col6`, row1Array, row3Array, mineNumArray[14]);
    midCenterCount(row2Array, `col7`, row1Array, row3Array, mineNumArray[15]);
    midCenterCount(row2Array, `col8`, row1Array, row3Array, mineNumArray[16]);
    midCenterCount(row3Array, `col2`, row2Array, row4Array, mineNumArray[19]);
    midCenterCount(row3Array, `col3`, row2Array, row4Array, mineNumArray[20]);
    midCenterCount(row3Array, `col4`, row2Array, row4Array, mineNumArray[21]);
    midCenterCount(row3Array, `col5`, row2Array, row4Array, mineNumArray[22]);
    midCenterCount(row3Array, `col6`, row2Array, row4Array, mineNumArray[23]);
    midCenterCount(row3Array, `col7`, row2Array, row4Array, mineNumArray[24]);
    midCenterCount(row3Array, `col8`, row2Array, row4Array, mineNumArray[25]);
    midCenterCount(row4Array, `col2`, row3Array, row5Array, mineNumArray[28]);
    midCenterCount(row4Array, `col3`, row3Array, row5Array, mineNumArray[29]);
    midCenterCount(row4Array, `col4`, row3Array, row5Array, mineNumArray[30]);
    midCenterCount(row4Array, `col5`, row3Array, row5Array, mineNumArray[31]);
    midCenterCount(row4Array, `col6`, row3Array, row5Array, mineNumArray[32]);
    midCenterCount(row4Array, `col7`, row3Array, row5Array, mineNumArray[33]);
    midCenterCount(row4Array, `col8`, row3Array, row5Array, mineNumArray[34]);
    midCenterCount(row5Array, `col2`, row4Array, row6Array, mineNumArray[37]);
    midCenterCount(row5Array, `col3`, row4Array, row6Array, mineNumArray[38]);
    midCenterCount(row5Array, `col4`, row4Array, row6Array, mineNumArray[39]);
    midCenterCount(row5Array, `col5`, row4Array, row6Array, mineNumArray[40]);
    midCenterCount(row5Array, `col6`, row4Array, row6Array, mineNumArray[41]);
    midCenterCount(row5Array, `col7`, row4Array, row6Array, mineNumArray[42]);
    midCenterCount(row5Array, `col8`, row4Array, row6Array, mineNumArray[43]);
    midCenterCount(row6Array, `col2`, row5Array, row7Array, mineNumArray[46]);
    midCenterCount(row6Array, `col3`, row5Array, row7Array, mineNumArray[47]);
    midCenterCount(row6Array, `col4`, row5Array, row7Array, mineNumArray[48]);
    midCenterCount(row6Array, `col5`, row5Array, row7Array, mineNumArray[49]);
    midCenterCount(row6Array, `col6`, row5Array, row7Array, mineNumArray[50]);
    midCenterCount(row6Array, `col7`, row5Array, row7Array, mineNumArray[51]);
    midCenterCount(row6Array, `col8`, row5Array, row7Array, mineNumArray[52]);
    midCenterCount(row7Array, `col2`, row6Array, row8Array, mineNumArray[55]);
    midCenterCount(row7Array, `col3`, row6Array, row8Array, mineNumArray[56]);
    midCenterCount(row7Array, `col4`, row6Array, row8Array, mineNumArray[57]);
    midCenterCount(row7Array, `col5`, row6Array, row8Array, mineNumArray[58]);
    midCenterCount(row7Array, `col6`, row6Array, row8Array, mineNumArray[59]);
    midCenterCount(row7Array, `col7`, row6Array, row8Array, mineNumArray[60]);
    midCenterCount(row7Array, `col8`, row6Array, row8Array, mineNumArray[61]);
    midCenterCount(row8Array, `col2`, row7Array, row9Array, mineNumArray[64]);
    midCenterCount(row8Array, `col3`, row7Array, row9Array, mineNumArray[65]);
    midCenterCount(row8Array, `col4`, row7Array, row9Array, mineNumArray[66]);
    midCenterCount(row8Array, `col5`, row7Array, row9Array, mineNumArray[67]);
    midCenterCount(row8Array, `col6`, row7Array, row9Array, mineNumArray[68]);
    midCenterCount(row8Array, `col7`, row7Array, row9Array, mineNumArray[69]);
    midCenterCount(row8Array, `col8`, row7Array, row9Array, mineNumArray[70]);
    // win/lose conditions
    makeWinArray()
    winCondition();
    loseCondition();
    // adjust number colors
    numColors();
};
// Function for game reset/Need to fix bugs
const gameReset = () => {
    for (i = 0; i < squareArray.length; i++) {
        squareArray[i].classList.replace(`mineHere`, `empty`);
        squareArray[i].innerHTML = ``;
        coverArray[i].style.visibility = `visible`;
        coverArray[i].classList.replace(`flagged`, `unflagged`);
        coverArray[i].classList.replace(`boom`, `safe`);
        redFlagArray[i].classList.replace(`show`,`hide`);
    };
    minePercent = null;
    timePassed = 0;
    mineNumArray.fill(0);
    document.querySelector(`#gameEndDisplay`).style.display = `none`;
    // document.querySelector(`.stopwatch p`).innerHTML = `0 sec`;
    gameStart();
};

// Invoked functions and event listeners
gameStart();
hideCoverShowFlag();
document.querySelector(`#gridOverlay`).addEventListener(`contextmenu`, (event) => {
    event.preventDefault();
});
document.querySelector(`button`).addEventListener(`click`, gameReset);
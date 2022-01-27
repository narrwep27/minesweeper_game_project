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

const coverRow1Array = document.querySelectorAll(`.covRow1`);
const coverRow2Array = document.querySelectorAll(`.covRow2`);
const coverRow3Array = document.querySelectorAll(`.covRow3`);
const coverRow4Array = document.querySelectorAll(`.covRow4`);
const coverRow5Array = document.querySelectorAll(`.covRow5`);

// Functions for game logic
// Function for random number generator that ranges within squareArray.length
const RNG = () => {
    return Math.floor(Math.random() * squareArray.length)
};
// Creates and places mines in random square to fill up no more than 12%(easy) and 16%(hard) of board
const createMine = () => {
    let randNum = RNG();
    const mine = document.createElement(`img`);
    mine.setAttribute(`src`, `./images/bomb.png`);
    mine.setAttribute(`class`, `mine`);
    if (squareArray[randNum].classList[1] === `empty`) {
        squareArray[randNum].classList.replace(`empty`, `mineHere`);
        squareArray[randNum].append(mine);
    };
};
const setMines = () => {
    // Need to change minePercent threshold with different difficulties
    while (minePercent < .12) {
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
    swStop();
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
                document.querySelector(`#diffChoice`).style.visibility = `visible`;
                document.querySelector(`#winLossEmoji`).innerHTML = `&#128512`;
                swStop();
                showBest();
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
// Functions for stopwatch
const addSec = () => {
    timePassed += 1;
    document.querySelector(`.stopwatch p`).innerHTML = timePassed + ` sec`;
};
const swStart = () => {
    if (timeStarted === false) {
        swFunctionVar = setInterval(addSec, 1000);
        timeStarted = true;
    };
};
const swStop = () => {
    clearInterval(swFunctionVar);
    timeStarted = false;
};
for (i = 0; i < coverArray.length; i++) {
    coverArray[i].addEventListener(`click`, swStart);
    coverArray[i].addEventListener(`contextmenu`, swStart);
};
// Functions to record best time
const showBest = () => {
    if (timePassed < previousTime) {
        document.querySelector(`.bestTime p`).innerHTML = timePassed + ` sec`;
    };
    previousTime = timePassed;
};
// Unsuccesful attempt at using flags to make covers unclickable; will return to sort out later
// const winLoseCondition = () => {
//     let safeCovers = document.querySelectorAll(`.safe`);
//     let safeClickedNum = 0;
//     let boomCovers = document.querySelectorAll(`.boom`);
//     const loseCondition = () => {
//         document.querySelector(`#gameEndDisplay`).style.display = `block`;
//         document.querySelector(`#gameEndText`).innerHTML = `You stepped on a mine...`;
//         for (i = 0; i < coverArray.length; i++) {
//             coverArray[i].removeEventListener(`click`, loseCondition);
//             coverArray[i].removeEventListener(`click`, winCondition);
//         };
//     };
//     const winCondition = () => {
//         safeClickedNum += 1;
//         if (safeClickedNum === safeCovers.length) {
//             document.querySelector(`#gameEndDisplay`).style.display = `block`;
//             document.querySelector(`#gameEndText`).innerHTML = `You found all the mines!`;
//             for (i = 0; i < coverArray.length; i++) {
//                 coverArray[i].removeEventListener(`click`, loseCondition);
//                 coverArray[i].removeEventListener(`click`, winCondition);
//             };
//         };
//     };
//     for (i = 0; i < document.querySelectorAll(`.boom`).length; i++) {
//         let currentBoomCover = boomCovers[i];
//         currentBoomCover.addEventListener(`click`, loseCondition);
//     };
//     for (i = 0; i < safeCovers.length; i++) {
//         let currentSafeCover = safeCovers[i];
//         currentSafeCover.addEventListener(`click`, winCondition);
//     };
// };

// Function to start game
const gameStart = () => {
    setMines();
    // row1 mine check
    row1CornerCount(mineNumArray[4]);
    row1CenterCount(`col2`, mineNumArray[1]);
    row1CenterCount(`col3`, mineNumArray[2]);
    row1CenterCount(`col4`, mineNumArray[3]);
    // last row mine check
    lastRowCornerCount(row5Array, row4Array, mineNumArray[20], mineNumArray[24]);
    lastRowCenterCount(row5Array, `col2`, row4Array, mineNumArray[21]);
    lastRowCenterCount(row5Array, `col3`, row4Array, mineNumArray[22]);
    lastRowCenterCount(row5Array, `col4`, row4Array, mineNumArray[23]);
    // edge of middle rows mine check
    midEdgeCount(row2Array, row1Array, row3Array, mineNumArray[5], mineNumArray[9]);
    midEdgeCount(row3Array, row2Array, row4Array, mineNumArray[10], mineNumArray[14]);
    midEdgeCount(row4Array, row3Array, row5Array, mineNumArray[15], mineNumArray[19]);
    // center of middle rows mine check
    midCenterCount(row2Array, `col2`, row1Array, row3Array, mineNumArray[6]);
    midCenterCount(row2Array, `col3`, row1Array, row3Array, mineNumArray[7]);
    midCenterCount(row2Array, `col4`, row1Array, row3Array, mineNumArray[8]);
    midCenterCount(row3Array, `col2`, row2Array, row4Array, mineNumArray[11]);
    midCenterCount(row3Array, `col3`, row2Array, row4Array, mineNumArray[12]);
    midCenterCount(row3Array, `col4`, row2Array, row4Array, mineNumArray[13]);
    midCenterCount(row4Array, `col2`, row3Array, row5Array, mineNumArray[16]);
    midCenterCount(row4Array, `col3`, row3Array, row5Array, mineNumArray[17]);
    midCenterCount(row4Array, `col4`, row3Array, row5Array, mineNumArray[18]);
    // win/lose conditions
    makeWinArray();
    winCondition();
    loseCondition();
    // Adjust number colors
    numColors();
};

// Function for game reset
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
    document.querySelector(`#diffChoice`).style.visibility = `hidden`;
    document.querySelector(`.stopwatch p`).innerHTML = `0 sec`;
    gameStart();
};

// Invoked functions and event listeners
gameStart();
hideCoverShowFlag();
document.querySelector(`#gridOverlay`).addEventListener(`contextmenu`, (event) => {
    event.preventDefault();
});
document.querySelector(`button`).addEventListener(`click`, gameReset);
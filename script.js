// Global constants that remain with changing grid sizes
const squareArray = document.querySelectorAll(`.square`);
const mineNumArray = [];
mineNumArray.length = squareArray.length;
mineNumArray.fill(0);
const coverArray = document.querySelectorAll(`.cover`);
const gameEndDisplay = document.querySelector(`#gameEndDisplay`);

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
let minePercent = parseFloat(document.querySelectorAll(`.mine`).length / squareArray.length);
const createMine = () => {
    let randNum = RNG();
    const mine = document.createElement(`img`);
    mine.setAttribute(`src`, `https://cdn.pixabay.com/photo/2017/01/31/16/59/bomb-2025548_1280.png`);
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
const revealSquare = () => {
    for (i = 0; i < coverArray.length; i++) {
        let currentCover = coverArray[i];
        coverArray[i].addEventListener(`click`, () => {
            if (currentCover.classList[2] === `unflagged`) {
                currentCover.style.visibility = `hidden`;
            };
        });
    };
};
// Lose condition
const loseCondition = () => {
    const boomCovers = document.querySelectorAll(`.boom`);
    for (i = 0; i < boomCovers.length; i++) {
        boomCovers[i].addEventListener(`click`, () => {
            document.querySelector(`#gameEndDisplay`).style.display = `block`;
            document.querySelector(`#gameEndText`).innerHTML = `You stepped on a mine...`;
        });
    };
};
// Win condition
const winCondition = () => {
    const safeNum = document.querySelectorAll(`.safe`).length;
    const safeCovers = document.querySelectorAll(`.safe`);
    let safeClickedNum = 0;
    for (i = 0; i < safeCovers.length; i++) {
        safeCovers[i].addEventListener(`click`, () => {
            safeClickedNum += 1;
            if (safeClickedNum === safeNum) {
                document.querySelector(`#gameEndDisplay`).style.display = `block`;
                document.querySelector(`#gameEndText`).innerHTML = `You found all the mines!`;
            };
        });
    };
};
// Function for right-click setting flags onto overlay covers
const setFlag = () => {
    for (i = 0; i < coverArray.length; i++) {
        let currentCover = coverArray[i];
        const flag = document.createElement(`img`);
        flag.setAttribute(`src`, `http://clipart-library.com/images_k/red-flag-transparent-background/red-flag-transparent-background-1.png`);
        flag.setAttribute(`class`, `redFlag`);
        coverArray[i].addEventListener(`contextmenu`, (event) => {
            event.preventDefault();
            if (currentCover.classList[2] === `unflagged`) {
                currentCover.classList.replace(`unflagged`, `flagged`)
                currentCover.append(flag);
            } else if (currentCover.classList[2] === `flagged`) {
                currentCover.classList.replace(`flagged`, `unflagged`);
                flag.remove();
            };
        });
    };
};
// Function for game reset
const gameReset = () => {
    for (i = 0; i < squareArray.length; i++) {
        squareArray[i].classList.replace(`mineHere`, `empty`);
        squareArray[i].innerHTML = ``;
        coverArray[i].style.visibility = `visible`;
        coverArray[i].classList.replace(`flagged`, `unflagged`);
        coverArray[i].innerHTML = ``;
    };
    document.querySelector(`#gameEndDisplay`).style.display = `none`;
};
document.querySelector(`button`).addEventListener(`click`, gameReset);

// Invoked functions and event listeners
setMines();
// row1 mine check
row1CornerCount(mineNumArray[4]);
row1CenterCount(`col2`, mineNumArray[1]);
row1CenterCount(`col3`, mineNumArray[2]);
row1CenterCount(`col4`, mineNumArray[3]);
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
// last row mine check
lastRowCornerCount(row5Array, row4Array, mineNumArray[20], mineNumArray[24]);
lastRowCenterCount(row5Array, `col2`, row4Array, mineNumArray[21]);
lastRowCenterCount(row5Array, `col3`, row4Array, mineNumArray[22]);
lastRowCenterCount(row5Array, `col4`, row4Array, mineNumArray[23]);
// click to reveal square under cover
revealSquare();
// win/lose conditions
loseCondition();
winCondition();
// click to set flags overtop of covers
setFlag();
// Global constants
const squareArray = document.querySelectorAll(`.square`);
const mineNumArray = [];
mineNumArray.length = squareArray.length;
mineNumArray.fill(0);

const row1Array = document.querySelectorAll(`.row1`);
const row2Array = document.querySelectorAll(`.row2`);
const row3Array = document.querySelectorAll(`.row3`);
const row4Array = document.querySelectorAll(`.row4`);
const row5Array = document.querySelectorAll(`.row5`);

// Functions for game logic
// Function for random number generator that ranges within squareArray.length
const RNG = () => {
    return Math.floor(Math.random() * squareArray.length)
};
// Creates and places mines in random square to fill up no more than 15% of board
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
    while (minePercent < .15) {
        createMine();
        minePercent = parseFloat(document.querySelectorAll(`.mine`).length / squareArray.length);
    };
};
// Function for empty squares in row 1 to check number of mines adjacent to it
const row1CornerCount = () => {
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
                    mineNumArray[4] += 1;
                };
                if (row2Array[i - 1].classList[1] === `mineHere`) {
                    mineNumArray[4] += 1;
                };
                if (row2Array[i].classList[1] === `mineHere`) {
                    mineNumArray[4] += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineNumArray[4];
                row1Array[i].append(mineNum);
            };
        };
    };
};
const row1CenterCountTest = (arrayInd, column) => {
    for (i = 0; i < row1Array.length; i++) {
        if (row1Array[i].classList[1] === `empty`) {
            if (row1Array[i].classList[3] === column) {
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
// Function for empty squares in middle rows to check number of adjacent mines
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

// Invoked functions and event listeners
setMines();
row1CornerCount();
row1CenterCountTest(mineNumArray[1], `col2`);
row1CenterCountTest(mineNumArray[2], `col3`);
row1CenterCountTest(mineNumArray[3], `col4`);
midEdgeCount(row2Array, row1Array, row3Array, mineNumArray[5], mineNumArray[9]);
midEdgeCount(row3Array, row2Array, row4Array, mineNumArray[10], mineNumArray[14]);
midEdgeCount(row4Array, row3Array, row5Array, mineNumArray[15], mineNumArray[19]);

// Scratch/testing area
const row2EdgeCount = () => {
    for (i = 0; i < row2Array.length; i++) {
        if (row2Array[i].classList[1] === `empty`) {
            if (row2Array[i] === row2Array[0]) {
                if (row1Array[i].classList[1] === `mineHere`) {
                    mineNumArray[5] += 1;
                };
                if (row1Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[5] += 1;
                };
                if (row2Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[5] += 1;
                };
                if (row3Array[i].classList[1] === `mineHere`) {
                    mineNumArray[5] += 1;
                };
                if (row3Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[5] += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineNumArray[5];
                row2Array[i].append(mineNum);
            };
            if (row2Array[i] === row2Array[row2Array.length - 1]) {
                if (row1Array[i - 1].classList[1] === `mineHere`) {
                    mineNumArray[9] += 1;
                };
                if (row1Array[i].classList[1] === `mineHere`) {
                    mineNumArray[9] += 1;
                };
                if (row2Array[i - 1].classList[1] === `mineHere`) {
                    mineNumArray[9] += 1;
                };
                if (row3Array[i - 1].classList[1] === `mineHere`) {
                    mineNumArray[9] += 1;
                };
                if (row3Array[i].classList[1] === `mineHere`) {
                    mineNumArray[9] += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineNumArray[9];
                row2Array[i].append(mineNum);
            };
        };
    };
};
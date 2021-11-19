// Global constants that remain even with changing grid sizes
const squareArray = document.querySelectorAll(`.square`);
const mineNumArray = [];
mineNumArray.length = squareArray.length;
mineNumArray.fill(0);

// Global constants that need updates with changing grid sizes
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
    // change minePercent threshold with different difficulties
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
const lastRowCornerCount = () => {
    for (i = 0; i < row5Array.length; i++) {
        if (row5Array[i].classList[1] === `empty`) {
            if (row5Array[i] === row5Array[0]) {
                if (row4Array[i].classList[1] === `mineHere`) {
                    mineNumArray[20] += 1;
                };
                if (row4Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[20] += 1;
                };
                if (row5Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[20] += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineNumArray[20];
                row5Array[i].append(mineNum);
            };
            if (row5Array[i] === row5Array[row5Array.length - 1]) {
                if (row4Array[i - 1].classList[1] === `mineHere`) {
                    mineNumArray[24] += 1;
                };
                if (row4Array[i].classList[1] === `mineHere`) {
                    mineNumArray[24] += 1;
                };
                if (row5Array[i - 1].classList[1] === `mineHere`) {
                    mineNumArray[24] += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = mineNumArray[24];
                row5Array[i].append(mineNum);
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

// Invoked functions and event listeners
setMines();
// row1 mine check
row1CornerCount();
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

lastRowCornerCount();
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
            if (row1Array[i].classList[3] === `col1`) {
                if (row1Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[0] += 1;
                };
                if (row2Array[i].classList[1] === `mineHere`) {
                    mineNumArray[0] += 1;
                };
                if (row2Array[i + 1].classList[1] === `mineHere`) {
                    mineNumArray[0] += 1;
                };
                const r1c1Text = document.createElement(`h3`);
                r1c1Text.innerHTML = mineNumArray[0];
                row1Array[i].append(r1c1Text);
            };
            if (row1Array[i].classList[3] === `col5`) {
                if (row1Array[i - 1].classList[1] === `mineHere`) {
                    mineNumArray[4] += 1;
                };
                if (row2Array[i - 1].classList[1] === `mineHere`) {
                    mineNumArray[4] += 1;
                };
                if (row2Array[i].classList[1] === `mineHere`) {
                    mineNumArray[4] += 1;
                };
                const r1c5Text = document.createElement(`h3`);
                r1c5Text.innerHTML = mineNumArray[4];
                row1Array[i].append(r1c5Text);
            };
        };
    };
};
const row1CenterCountTest = (par1, par2) => {
    for (i = 0; i < row1Array.length; i++) {
        if (row1Array[i].classList[1] === `empty`) {
            if (row1Array[i].classList[3] === par2) {
                if (row1Array[i - 1].classList[1] === `mineHere`) {
                    par1 += 1;
                };
                if (row1Array[i + 1].classList[1] === `mineHere`) {
                    par1 += 1;
                };
                if (row2Array[i - 1].classList[1] === `mineHere`) {
                    par1 += 1;
                };
                if (row2Array[i].classList[1] === `mineHere`) {
                    par1 += 1;
                };
                if (row2Array[i + 1].classList[1] === `mineHere`) {
                    par1 += 1;
                };
                let mineNum = document.createElement(`h3`);
                mineNum.innerHTML = par1;
                row1Array[i].append(mineNum);
            };
        };
    };
};
row1CornerCount();
row1CenterCountTest(mineNumArray[1], `col2`);
row1CenterCountTest(mineNumArray[2], `col3`);
row1CenterCountTest(mineNumArray[3], `col4`);
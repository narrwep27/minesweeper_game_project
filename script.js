// Global constants
const squareArray = document.querySelectorAll(`.square`);

// Functions for game logic
// Function for random number generator from 0-15
const RNG = () => {
    return Math.floor(Math.random() * squareArray.length)
};
// Function to place mine in random square
const createMine = () => {
    let randNum = RNG();
    const mine = document.createElement(`img`);
    mine.setAttribute(`src`, `https://cdn.pixabay.com/photo/2017/01/31/16/59/bomb-2025548_1280.png`);
    mine.setAttribute(`class`, `mine`);
    if (squareArray[randNum].classList.length === 1) {
        squareArray[randNum].classList.add(`mineHere`);
        squareArray[randNum].append(mine);
    };
};
// Function to check number of mines in grid and set no more than 15% of board
let minePercent = parseFloat(document.querySelectorAll(`.mine`).length / squareArray.length);
const setMines = () => {
    while (minePercent < .8) {
        createMine();
        minePercent = parseFloat(document.querySelectorAll(`.mine`).length / squareArray.length);
    };
};
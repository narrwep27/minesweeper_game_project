// Global constants
const squareArray = document.querySelectorAll(`.square`);
const mine = document.createElement(`img`);
mine.setAttribute(`src`, `https://cdn.pixabay.com/photo/2017/01/31/16/59/bomb-2025548_1280.png`);

// Function for random number generator from 0-15
const RNG = () => {
    return Math.floor(Math.random() * squareArray.length)
};
// Function to place mine in random square
const placeMine = () => {
    let randNum = RNG();
    squareArray[randNum].append(mine);
};
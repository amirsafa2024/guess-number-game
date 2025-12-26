let $ = document;
let inputElem = $.getElementById("guess-input");
let submitBtn = $.getElementById("submit-btn");
let resetBtn = $.getElementById("reset-btn");
let remainingShotsElem = $.getElementById("remaining-shots");
let feedback = $.getElementById("feedback");
let totalGames = $.querySelector("#total-games");
let correctGuesses = $.querySelector("#correct-guesses");
let remainingShots = 4;
let randomNumber;
let isAllowedToPlayFlag = true;

function gameInit() {
    isAllowedToPlayFlag = true;
    randomNumber = Math.floor(Math.random() * 20) + 1;
    remainingShots = 4;
    inputElem.value = "";
    feedback.innerHTML = `Make a guess to start!`;
    renderRemainingShots(remainingShots);
    updateStatus();
}
function submitHandler() {
    if (isAllowedToPlayFlag) {
        if (remainingShots > 1) {
            if (inputElem.value == randomNumber) {
                feedback.innerHTML = `Congratulation! You guessed the number correctly! Let's play again!`;
                gameOverHandler(1);
            } else if (inputElem.value == "") {
                feedback.innerHTML = `The input is blank! Enter a number the next time or you would lose more shots!`;
            } else if (
                inputElem.value > randomNumber &&
                inputElem.value <= 20
            ) {
                feedback.innerHTML = `Guess a bit lower!`;
            } else if (inputElem.value < randomNumber && inputElem.value >= 1) {
                feedback.innerHTML = `Guess a bit higher!`;
            } else if (inputElem.value > 20) {
                feedback.innerHTML = `Too high! Guess between 1 and 20!`;
            } else if (inputElem.value < 1) {
                feedback.innerHTML = `Too low! Guess between 1 and 20!`;
                console.log(inputElem.value);
            }
        } else {
            if (inputElem.value == randomNumber) {
                feedback.innerHTML = `Congratulation! You guessed the number correctly! Let's play again!`;
                gameOverHandler(1);
            } else {
                feedback.innerHTML = `You have lost the game! The correct answer was ${randomNumber}. Reset for another round!`;
                gameOverHandler(0);
            }
        }
        remainingShots--;
        renderRemainingShots(remainingShots);
    }
}
function renderRemainingShots(num) {
    remainingShotsElem.innerHTML = `Remaining Guesses: ${num}`;
}
function gameOverHandler(result) {
    isAllowedToPlayFlag = false;
    let total = +localStorage.getItem("totalGames") + 1;
    let wins = +localStorage.getItem("correctGuesses") + result;
    localStorage.setItem("totalGames", total);
    localStorage.setItem("correctGuesses", wins);
    updateStatus();
}
function updateStatus() {
    let total = +localStorage.getItem("totalGames");
    let wins = +localStorage.getItem("correctGuesses");
    totalGames.innerHTML = total;
    correctGuesses.innerHTML = wins;
}

submitBtn.addEventListener("click", submitHandler);
resetBtn.addEventListener("click", gameInit);
inputElem.addEventListener("keydown", (e) => {
    e.keyCode === 13 && submitHandler();
});

gameInit();

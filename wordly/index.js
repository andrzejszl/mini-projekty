const wordApiURL = 'https://words.dev-apis.com/word-of-the-day';
const checkWordUrl = 'https://words.dev-apis.com/validate-word';

const btnDayWord = document.querySelector('div.controls_wordofday');
const btnRandomWord = document.querySelector('div.controls_randomword');
const exitButton = document.querySelector('button.message__button');

const inputs = [...document.querySelectorAll('input')];
inputs.forEach(input => input.readOnly = true);

let index = 0;
let row = 1;
let rowMaxIndex = {
    1: 4,
    2: 9,
    3: 14,
    4: 19,
    5: 24,
    6: 29
}
let answerWord = getWord(false);
let answerRandom = getWord(true);
let mode = 1;

async function getWord(isRandom) {
    let promise;
    let response;
    showLoading();
    if (isRandom) {
        promise = await fetch(wordApiURL + "?random=1");
        response = await promise.json();
        answerRandom = response.word;
    } else {
        promise = await fetch(wordApiURL);
        response = await promise.json();
        answerWord = response.word;
    }
    hideLoading();
}

function showWindow(result) {
    let messageWindow = document.querySelector('div.message');
    let textWindow = document.querySelector('p.message__text');
    let btn = document.querySelector('button.message__button');
    if (result === "win") {
        btn.innerHTML = "Try diffrent word";
        textWindow.innerHTML = "You have won!!!";
        messageWindow.classList.add('visible');
        document.querySelector('div.message__window').style.backgroundColor = "green";
        answer = answerRandom;
        getWord(true);
        mode = 2;
        btnDayWord.classList.remove('active');
        btnRandomWord.classList.add('active');
    } else if (result === "loss") {
        btn.innerHTML = "Try again";
        textWindow.innerHTML = "You have lost :((";
        messageWindow.classList.add('visible');
        document.querySelector('div.message__window').style.backgroundColor = "red";
    }
}

function hideWindow() {
    resetGame();
    let messageWindow = document.querySelector('div.message');
    messageWindow.classList.remove('visible');
}

function resetGame() {
    index = 0;
    row = 1;

    for (i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].classList = "";
    }
}

function showLoading() {
    document.querySelector('div.loading').classList.add('active');
}

function hideLoading() {
    document.querySelector('div.loading').classList.remove('active');
}

async function checkWord(playerAnswer) {
    showLoading();
    const promise = await fetch(checkWordUrl, {
        method: "POST",
        body: JSON.stringify({
            "word": playerAnswer
        })
    });
    const response = await promise.json();
    let isValidWord = response.validWord;
    handleAnswer(isValidWord, playerAnswer);
    hideLoading();
}

function handleAnswer(isValidWord, playerAnswer) {
    if (typeof answer === "undefined" && mode === 1) {
        answer = answerWord;
    } else if (typeof answer === "undefined" && mode === 2) {
        answer = answerRandom;
    }
    let currentRowInputs = [];
    for (let i = rowMaxIndex[row] - 4; i <= rowMaxIndex[row]; i++) {
        currentRowInputs.push(inputs[i])
    }
    if (isValidWord) {
        if (playerAnswer === answer) {
            currentRowInputs.forEach(input => input.classList.add('correct'));
            showWindow("win");
        } else {
            let answerClone = answer;
            for (let i = 0; i < playerAnswer.length; i++) {
                currentRowInputs[i].value = playerAnswer[i];
                if (playerAnswer[i] === answer[i]) {
                    currentRowInputs[i].classList.add('correct');
                    answerClone = answerClone.slice(0, (answerClone.indexOf(playerAnswer[i]))) + answerClone.slice((answerClone.indexOf(playerAnswer[i])) + 1, answerClone.length);
                }
            }
            for (let i = 0; i < playerAnswer.length; i++) {
                if (answer.includes(playerAnswer[i]) && answerClone.includes(playerAnswer[i]) && !currentRowInputs[i].classList.contains('correct')) {
                    currentRowInputs[i].classList.add('includes');
                    answerClone = answerClone.slice(0, (answerClone.indexOf(playerAnswer[i]))) + answerClone.slice((answerClone.indexOf(playerAnswer[i])) + 1, answerClone.length);
                } else if (!answerClone.includes(playerAnswer[i]) && !currentRowInputs[i].classList.contains('correct')) {
                    currentRowInputs[i].classList.add('invalid');
                } else {
                    //empty
                }
            }
        }
        row++;
        if (row > 6) {
            showWindow("loss");
        }
    } else {
        currentRowInputs.forEach(input => {
            input.classList.add('wrong');
            setTimeout(() => {
                input.classList.remove('wrong');
            }, 500);
            input.value = "";
            index = rowMaxIndex[row] - 4;
        })
    }
}

function handlePress() {
    if (isLetter(event.key) && inputs[rowMaxIndex[row]].value.length === 0) {
        inputs[index].value = event.key;
        index++;
    } else if (event.key === "Backspace" && index > rowMaxIndex[row] - 4) {
        index--;
        inputs[index].value = "";
    } else if (event.key === "Enter" && inputs[rowMaxIndex[row]].value.length !== 0) {
        let playerAnswer = getPlayerWord();
        checkWord(playerAnswer);
    } else {
        //do nothing
    }
}

function getPlayerWord() {
    let playerAnswer = "";
    for (let i = rowMaxIndex[row] - 4; i <= rowMaxIndex[row]; i++) {
        playerAnswer += inputs[i].value;
    };
    return playerAnswer;
};

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
};

//listen on keyboard
window.addEventListener('keydown', handlePress);

//clear inputs on dom load
window.addEventListener('DOMContentLoaded', () => {
    inputs.forEach(input => input.value = "")
});

exitButton.addEventListener('click', hideWindow);

function newGame(random) {
    resetGame();
    if (random) {
        answer = answerRandom;
        getWord(true);
        mode = 2;
    } else {
        answer = answerWord;
        mode = 1;
    }
    document.querySelectorAll('div.controls div').forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

btnRandomWord.addEventListener('click', function () {
    newGame(true)
});
btnDayWord.addEventListener('click', function () {
    newGame(false)
});
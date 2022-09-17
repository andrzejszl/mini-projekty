const wordApiURL = 'https://words.dev-apis.com/word-of-the-day';
const checkWordUrl = 'https://words.dev-apis.com/validate-word';

const btnDayWord = document.querySelector('button.controls_wordofday');
const btnRandomWord = document.querySelector('button.controls_randomword');
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
let answer = getWord();

function showWindow(result) {
    let messageWindow = document.querySelector('div.message');
    let textWindow = document.querySelector('p.message__text');
    let btn = document.querySelector('button.message__button');
    if (result === "win") {
        btn.innerHTML = "Try diffrent word";
        textWindow.innerHTML = "You have won!!!";
        messageWindow.classList.add('visible');
        document.querySelector('div.message__window').style.backgroundColor = "green";
        answer = getWord("?random=1")
    } else if (result === "loss") {
        btn.innerHTML = "Try again";
        textWindow.innerHTML = "You have lost :((";
        messageWindow.classList.add('visible');
        document.querySelector('div.message__window').style.backgroundColor = "red";
    }
}

function hideWindow() {
    let messageWindow = document.querySelector('div.message');
    messageWindow.classList.remove('visible');
    resetGame();
}

function resetGame() {
    index = 0;
    row = 1;
    inputs.forEach(input => {
        input.value = "";
        input.classList = "";
    })
}

async function getWord(random = "") {
    const promise = await fetch(wordApiURL + random);
    console.log(wordApiURL + random);
    const response = await promise.json();
    answer = response.word;
    return answer;
}

async function checkWord(playerAnswer) {
    const promise = await fetch(checkWordUrl, {
        method: "POST",
        body: JSON.stringify({
            "word": playerAnswer
        })
    });
    const response = await promise.json();
    let isValidWord = response.validWord;
    handleAnswer(isValidWord, playerAnswer);
}

function handleAnswer(isValidWord, playerAnswer) {
    let currentRowInputs = [];
    for (let i = rowMaxIndex[row] - 4; i <= rowMaxIndex[row]; i++) {
        currentRowInputs.push(inputs[i])
    }
    if (isValidWord) {
        if (playerAnswer === answer) {
            currentRowInputs.forEach(input => input.classList.add('correct'));
            showWindow("win");
        } else {
            currentRowInputs.forEach((input, index) => {
                if (input.value === answer[index]) {
                    input.classList.add('correct');
                } else if (answer.includes(input.value)) {
                    input.classList.add('includes');
                } else {
                    input.classList.add('invalid');
                }
            })
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

btnRandomWord.addEventListener('click', () => {
    btnDayWord.classList.remove('active');
    btnRandomWord.classList.add('active');
    answer = getWord("?random=1");
    resetGame();
});

btnDayWord.addEventListener('click', () => {
    btnRandomWord.classList.remove('active');
    btnDayWord.classList.add('active');
    answer = getWord();
    resetGame();
})
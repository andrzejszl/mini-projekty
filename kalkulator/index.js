const buttons = document.querySelectorAll('button');
const display = document.querySelector('div.display');

let storedNumber;
let sign;

buttons.forEach(button => {

    function mathFunction(number, action) {
        if (action === "divide") {
            return Number(number) / Number(display.innerHTML)
        } else if (action === "multiply") {
            return Number(number) * Number(display.innerHTML)
        } else if (action === "minus") {
            return Number(number) - Number(display.innerHTML)
        } else if (action === "plus") {
            return Number(number) + Number(display.innerHTML)
        } else {
            return "blad"
        }
    }

    function handleAction(buttonClass) {
        if (buttonClass === "cancel") {
            storedNumber = "";
            display.innerHTML = "0";
        } else if (buttonClass === "back" && display.innerHTML !== "0") {
            if (display.innerHTML.length === 1) {
                display.innerHTML = "0";
                return;
            }
            display.innerHTML = display.innerHTML.slice(0, -1);
        } else if (buttonClass === "equals") {
            if (!storedNumber) {
                display.innerHTML = "0"
            } else if (display.innerHTML !== "0" && sign) {
                storedNumber = mathFunction(storedNumber, sign);
                display.innerHTML = storedNumber;
                sign = "";
            }
        } else {
            if (!storedNumber && display.innerHTML !== "0") {
                storedNumber = display.innerHTML;
            } else if (sign) {
                storedNumber = mathFunction(storedNumber, sign);
                console.log(storedNumber);
            }
            sign = buttonClass;
            display.innerHTML = "0";
        }
    }

    function handleClick() {
        if (!isNaN(Number(button.innerHTML))) {
            if (display.innerHTML === "0") {
                display.innerHTML = button.innerHTML;
            } else {
                display.innerHTML += button.innerHTML;
            }
        } else {
            handleAction(button.classList[0]);
        }
    }

    button.addEventListener('click', handleClick)

    button.addEventListener('mousedown', () => {
        button.classList.add('darkColor');
    })
    window.addEventListener('mouseup', () => {
        button.classList.remove('darkColor');
    })
})
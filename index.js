const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

let firstNumber = null;
let operator = null;
let secondNumber = null;
let newNumber = false;
let resetDisplay = false;

function displayValue(value) {
    if (value === '.' && display.value.includes('.')) {
        return;
    }    
    if (display.value.length >= 16 && !newNumber) {
        return;
    }

    if (newNumber) {
        replaceDisplayValue(value);
    } else {
        appendDisplayValue(value);
    }
}

function replaceDisplayValue(value) {
    display.value = value;
    newNumber = false;
}
function appendDisplayValue(value) {
    if (display.value === '0' || resetDisplay) {
        display.value = value;
        resetDisplay = false;
    } else {
        display.value += value;
    }
}

function formatNumber(number){
    if (typeof number === 'number') {        
        if (Math.abs(number) >= 1e16 || Math.abs(number) < 1e-16) {
            return number.toExponential(10);
        }
        return Number(number.toFixed(11)).toString();
    }
    return number;
}

function clearAll() {
    display.value = '0';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    newNumber = false;
    resetDisplay = false;
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isNaN(button.textContent) || button.textContent === '.') {
            displayValue(button.textContent);
        }
        if (button.classList.contains('operator')) {
            if (operator !== null) {
                secondNumber = display.value;
                display.value = calculate(operator, Number(firstNumber), Number(secondNumber));
                resetDisplay = true;
            }
            operator = button.textContent;
            firstNumber = display.value;
            newNumber = true;
        }
        if (button.classList.contains('equals')) {
            secondNumber = display.value;
            display.value = calculate(operator, Number(firstNumber), Number(secondNumber));
            resetDisplay = true;
            operator = null;
            newNumber = true;
        }
        if (button.classList.contains('clear')) {
            clearAll();
        }
    })
})


function calculate(operator, firstNumber, secondNumber) {
    let result;
    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break
        case '×':
            result = firstNumber * secondNumber;
            break;
        case '÷':
            if (secondNumber === 0) {
                return 'Error';
            }
            result = firstNumber / secondNumber;
            break;
    }
    return formatNumber(result);
}

document.addEventListener('DOMContentLoaded', () => {
    display.value = '0';
});
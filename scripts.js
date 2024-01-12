//variables to be used later for output/display
let num1;
let num2;
let operator;

//basic calculations

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

//operate function that uses above calc functions

function operate(num1, num2, operator) {

    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 === 0) {
                console.log('error');
                break;
            } else {
                return divide(num1, num2);
            };
        default:
            console.log('not working???')
            break;
    }
}
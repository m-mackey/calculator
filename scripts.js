//variables to be used later for output/display
let num1, num2, operator;
let display = document.querySelector('.calc-display');
let displayedNum = '';

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
      }
    default:
      console.log('not working???');
      break;
  }
}

//displays numbers click in display

const nums = document.querySelectorAll('.number');
nums.forEach((num) => {
  num.addEventListener('click', addNumToDisplay);
});

// adds the number button clicked to the current num displayed
function addNumToDisplay() {
  displayedNum += this.textContent;
  display.textContent = displayedNum; 
  toggleDecimalEvent(); //not sure if i like this here but it works
}

// removes last number from current number
const backspace = document.querySelector('.backspace')
backspace.addEventListener('click', () => {
  displayedNum = displayedNum.slice(0, -1);
  display.textContent = displayedNum; 
  toggleDecimalEvent();
})

//remove/add click event to decimal based on if num includes one
///move up
function toggleDecimalEvent() {
  const decimal = document.querySelector('.decimal');
  if (displayedNum.includes('.')) {
    decimal.removeEventListener('click', addNumToDisplay);
    //maybe add something here that slighty changes color
    //to indicate it can't be clicked?
  } else {
    decimal.addEventListener('click', addNumToDisplay);
  } 
}

//clear button
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
  displayedNum = '';
  display.textContent = '';
  toggleDecimalEvent();
})

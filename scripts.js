//variables to be used later for output/display
let display = document.querySelector('.calc-display');
let displayedNum = '';

//basic calculations

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

//operate function that uses above calc functions

function operate(num1, num2, operator) { //change name of this function
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      if (num2 === 0) {
        console.log('error'); //add this to display
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
  //also need to clear the array that holds the numbers
})

const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach((operator) => {
  operator.addEventListener('click', onOperatorClick);
})

let testArr = [];

function onOperatorClick() { //prob needs a better name
  
  const operatorRegex = /[+-/*]/
  if (testArr.length === 2 && operatorRegex.test(this.textContent)) {
    testArr[1] = this.textContent;
    console.log(testArr)
  }

  const numRegex = /[0-9]/; 

  if (numRegex.test(displayedNum)) {
    //the regex test just makes sure an empty string/string with just decimal isn't pushed, maybe there is a better way
    testArr.push(displayedNum);
    console.log(testArr);
    if (testArr.length < 2) {
      testArr.push(this.textContent);
      console.log(testArr);
    } 

    if (this.textContent === '=') { //only need this function if length of arr is 3
      testArr.push(displayedNum);
      display.textContent = runCalculation(testArr); //this is the result
      console.log(displayedNum);
      testArr.length = 0; //this empties array, but we need to save result if someone wants to continue calculations, and clear only when needed
    }
    displayedNum = '';
  }

  
}

function runCalculation (testArr) {
  const num1 = +testArr[0];  //+converts the string to a number, may change because its confusing to read? or just leave a comment
  const operator = testArr[1];
  const num2 = +testArr[2];
  console.log(num1, num2, operator);
  console.log(operate(num1, num2, operator));
  return operate(num1, num2, operator);
}
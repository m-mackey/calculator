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
        display.textContent = 'ERROR';
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
  //can set a hard limit on num of nums likw while displayednum is less than x
  displayedNum += this.textContent;
  display.textContent = displayedNum; 
  toggleDecimalEvent(); 
}

// removes last number from current number
const backspace = document.querySelector('.backspace')
backspace.addEventListener('click', backspaceEvent);

function backspaceEvent() {
  displayedNum = displayedNum.slice(0, -1);
  display.textContent = displayedNum; 
  toggleDecimalEvent();
}

//remove/add click event to decimal based on if num includes one
///move up
function toggleDecimalEvent() {
  const decimal = document.querySelector('.decimal');
  if (displayedNum.includes('.')) {
    decimal.removeEventListener('click', addNumToDisplay);
  } else {
    decimal.addEventListener('click', addNumToDisplay);
  } 
}

//clear button
const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearInputs);

function clearInputs() {
  displayedNum = '';
  display.textContent = '';
  toggleDecimalEvent();
  clearObj(operationObj);
}

const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach((operator) => {
  operator.addEventListener('click', onOperatorClick);
})

let operationObj = {};

function clearObj(obj){
  delete obj.num1;
  delete obj.num2;
  delete obj.operator;
  delete obj.result;
}

function onOperatorClick() {
  
  if(/[0-9]/.test(displayedNum) || typeof displayedNum === "number") {
    for (let key in operationObj){
      //for...in checks to see if there are any properties, in this case num1 and operator in the obj, if so it continues on with below
      operationObj.num2 = displayedNum;
      runCalculation(operationObj);
      clearObj(operationObj);
    }
    //and if there are no properties, it continues on with the following:
    operationObj.num1 = displayedNum;
    operationObj.operator = this.textContent;
  }

  displayedNum = '';

}

const equalBtn = document.querySelector('.equals');
equalBtn.addEventListener('click', onEqualsClick);

function onEqualsClick() {

  if(operationObj.num1 && operationObj.operator) {
    if (/[0-9]/.test(displayedNum)) {
      operationObj.num2 = displayedNum;
      runCalculation(operationObj);
      clearObj(operationObj);
    }
    displayedNum = '';
  }
  
}

function runCalculation (operationObj) {
  operationObj.result = (operate(+operationObj.num1, +operationObj.num2, operationObj.operator));
  if(operationObj.result) {
    //only does the following if there is a result,
    //basically covers the case where user would divide by zero,
    //in that case the ERROR message in the operate function is displayed instead.
    const resultLengthCheck = operationObj.result.toString();
    //just a way to check for long numbers and round them below if needed.
    if (resultLengthCheck.length > 10) {
      displayedNum = +operationObj.result.toFixed(2);
      //per a stackoverflow answer, changing the string back to a number like this drops extra 0s
      //https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
      //this method of rounding and others aren't without flaws but work for now.
      display.textContent = displayedNum;
    } else {
    displayedNum = operationObj.result;
    display.textContent = displayedNum;
    }
  }
}

//keyboard support

window.addEventListener('keydown', (e) => {
  if (/[0-9]/.test(e.key)) {
    displayedNum += e.key;
    display.textContent = displayedNum; 
  //   //basically make a if else with the different buttons one might press
  //   //operators,  enter for equals? clear
  } else if (e.key === '.') {
    if (displayedNum.includes('.') === false) {
      displayedNum += e.key;
      display.textContent = displayedNum; 
    }
  } else if (e.key === '='){
    onEqualsClick();
  } else if (e.key === 'Backspace') {
    backspaceEvent();
  } else if (e.key === 'Escape'){
    clearInputs();
  }
})
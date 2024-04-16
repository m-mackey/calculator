//variables to be used later for output/display
let display = document.querySelector('.calc-display');
let displayedNum = '';
// let result;

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
  // if (operationObj.result) {
  //   clearObj(operationObj);
  //   delete operationObj.result; //don't always want to delete result, so do it separately here
  //   displayedNum = '';
  // }
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
  clearObj(operationObj);
  delete operationObj.result;
})

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

function onOperatorClick() { //prob needs a better name, also maybe this fn is getting a little long
  
  if(/[0-9]/.test(displayedNum) || typeof displayedNum === "number") {
    for (let key in operationObj){
      //for...in checks to see if there are any properties, in this case num1 and operator in the obj, if so it continues on with below
      operationObj.num2 = displayedNum;
      runCalculation(operationObj);
      clearObj(operationObj);
      operationObj.num1 = operationObj.result;
      ///next thing is to make result num 1, and maybe just delete or replace operator, delete num2
    }
    //and if there are no properties, it continues on with the following:
    operationObj.num1 = displayedNum;
    operationObj.operator = this.textContent;
  }
  
  // if (/[0-9]/.test(displayedNum) || typeof(displayedNum) === "number") {
  //   //the regex test just makes sure an empty string/string with just decimal isn't pushed, maybe there is a better way
  //   // operationArr.push(displayedNum);
  //   console.log(operationArr);
  //   if (operationArr.length === 1) {
  //     console.log('one');
  //     operationArr.push(this.textContent);
  //     operationArr.push(displayedNum);
  //     console.log(operationArr);
  //   } else if (operationArr.length < 2) {
  //     operationArr.push(displayedNum);
  //     // operationArr.push(displayedNum);
  //     operationArr.push(this.textContent);
  //     displayedNum = '';
  //     console.log(operationArr);
  //   } else if (operationArr.length === 2){
  //     operationArr.push(displayedNum);
  //     console.log(operationArr);
  //     result = runCalculation(operationArr);
  //     displayedNum = result;
  //     display.textContent = displayedNum; 
  //     operationArr[0] = result;
  //   } else if (operationArr.length === 3) {
  //     result = runCalculation(operationArr);
  //     displayedNum = result;
  //     display.textContent = displayedNum; 
  //     console.log(operationArr);
  //   }
  displayedNum = '';

}

const equalBtn = document.querySelector('.equals');
equalBtn.addEventListener('click', onEqualsClick);

function onEqualsClick() {
  //need to add check to make sure have props in obj first before this runs
  if (/[0-9]/.test(displayedNum)) {
    operationObj.num2 = displayedNum;
    runCalculation(operationObj);
    clearObj(operationObj);
  }
  displayedNum = '';
}

function runCalculation (operationObj) {
  // const num1 = +operationArr[0];  //+converts the string to a number
  // const operator = operationArr[1];
  // const num2 = +operationArr[2];
  // console.log(num1, num2, operator);
  // console.log(operate(num1, num2, operator));
  // operationArr.length = 0;
  operationObj.result = (operate(+operationObj.num1, +operationObj.num2, operationObj.operator));
  displayedNum = operationObj.result;
  console.log(displayedNum);
  console.log(typeof displayedNum);
  display.textContent = displayedNum;
  // return operate(+operationObj.num1, +operationObj.num2, operationObj.operator);
}
const display = document.querySelector(".screen");
const numButtons = document.querySelectorAll(".number");
const buttons = document.querySelectorAll(".operator");

let numToCalc = [];

let displayText = "";
let op;

numButtons.forEach((button) => {
  button.addEventListener("click", populateDisplay);
});

buttons.forEach((button) => {
  button.addEventListener("click", addNumberToArray);
});

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  const result = operator(num1, num2);
  return Number(result);
}

function populateDisplay(num) {
  if (!Number.isInteger(Number(displayText))) {
    return;
  }
  displayText += String(num.target.id);
  if (!op || !numToCalc[0]) {
    display.textContent = displayText;
    numToCalc[0] = Number(displayText);
  } else if (op) {
    display.textContent = displayText;
    numToCalc[1] = Number(displayText);
  }
  display.textContent = displayText;
}

function addNumberToArray(operator) {
  switch (operator.target.id) {
    case "subtract":
      op = subtract;
      display.textContent = "";
      displayText = "";
      break;
    case "calculate":
      if (
        (numToCalc[0] && numToCalc[1] === 0) ||
        (numToCalc[0] && numToCalc[1])
      ) {
        calculateResult();
      }
      break;
    case "add":
      op = add;
      display.textContent = "";
      displayText = "";
      break;
    case "divide":
      op = divide;
      display.textContent = "";
      displayText = "";
      break;
    case "clear":
      op = null;
      displayText = "0";
      display.textContent = displayText;
      numToCalc = [];
      break;
    case "decimal":
      op = null;
      const textArr = [...displayText];
      if (!textArr.includes(".")) {
        displayText += ".";
        display.textContent = displayText;
      }
      break;
    case "multiply":
      op = multiply;
      display.textContent = "";
      displayText = "";
    default:
      break;
  }
  if ((numToCalc[0] && numToCalc[1] === 0) || (numToCalc[0] && numToCalc[1])) {
    calculateResult();
  }
}

function calculateResult() {
  if (numToCalc[1] === 0 && op === divide) {
    display.textContent = "ZERO DIVISION";
    return;
  }
  display.textContent = operate(op, numToCalc[0], numToCalc[1]);
  let result = operate(op, numToCalc[0], numToCalc[1]);
  result = Math.round(result * 10) / 10;
  numToCalc = [];
  numToCalc[0] = Number(result);
  if (numToCalc[0] === 0) {
    numToCalc = [];
  }
  display.textContent = result;
  displayText = String(result);
}

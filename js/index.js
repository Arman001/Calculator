
const themeContainer = document.getElementsByTagName("main")[0];
const toggleThemeButtons = document.querySelectorAll(".toggle-button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-del]");
const resetButton = document.querySelector("[data-reset]");
const equalButton = document.querySelector("[data-equals]");
const previousOperandText = document.getElementById('previousInput');
const currentOperandText = document.getElementById('currentInput');
const mainBgColor = ["hsl(222, 26%, 31%)", "hsl(0, 0%, 90%)", "hsl(268, 75%, 9%)"];

//getting stored theme from local storage
const userTheme = localStorage.getItem("user-theme");
let previousOperand =  previousOperandText.innerText;
let currentOperand = currentOperandText.value;
let operation;

if (userTheme) {
  changeTheme(parseInt(userTheme));
} else {
  changeTheme(1);
}

//changing theme with index of button pressed
function changeTheme(index) {
  toggleThemeButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
  themeContainer.setAttribute("data-theme", `theme-${index + 1}`);
  // if(window.innerWidth>1000){
    document.body.style.backgroundColor = mainBgColor[index];
  // }
  localStorage.setItem("user-theme", index);
  toggleThemeButtons[index].classList.add("active");
}

toggleThemeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    changeTheme(index);
  });
});

function addNumber(number) {
  if(number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}


function displayNumber() {
  currentOperandText.value = currentOperand.toLocaleString("en");
  if(operation !== undefined) {
      previousOperandText.innerText = `${previousOperand} ${operation.toString("en")}`;
  } else {
      previousOperandText.innerText = previousOperand;
  }
}   


numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addNumber(button.value);
    displayNumber();
});
});


operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if(currentOperandText.value=="") return;
    if(previousOperandText.innerText!==""){
      calculations();
    }
    operation = button.value;
    previousOperand = currentOperand;
    currentOperand = "";

    displayNumber();
  });
});

deleteButton.addEventListener("click", () => {
  currentOperand = currentOperand.toString().slice(0,-1);
  displayNumber();
});

resetButton.addEventListener("click", () => {
  previousOperand = "";
  currentOperand = "";
  operation = undefined;
  displayNumber();
});

equalButton.addEventListener("click", () => {
  calculations();
  displayNumber();
});

function calculations() {
  let result;
  let previous = parseFloat(previousOperand);
  let current = parseFloat(currentOperand);
  console.log(typeof(operation));
  switch (operation) {
    case "+":      
      result = previous + current;
      break;

    case "-":
      result = previous - current;
      break;

    case "x":
      result = previous * current;
      break;

    case "/":
      result = previous / current;
      break;

    default:
      break;
  }

  currentOperand = result;
  operation = undefined;
  previousOperand = "";
  previousOperandText.innerText = "";
}

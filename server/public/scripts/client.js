$(document).ready(handleReady);

function handleReady() {
  console.log("running js");
  $(".numberBtn").on("click", displayEquation);
  $(".operator").on("click", setOperator);
  $("#calculate").on("click", calculateAnswer);
  $("#clear").on("click", clearInputs);
  answer();
}

let calculations = [];
let equation = [];
let equationDisplay = "";
let numberOne = "";
let numberTwo = "";
let operator = "";

//setting operator for equation (+ - * /)
function setOperator() {
  setNumberOne();
  console.log("setting operator...");
  operator = $(this).text();
  equationDisplay += operator;
  $("#equationDisplay").val(equationDisplay);
}

//setting numberOne w/ current values in input display
function setNumberOne() {
  numberOne = equation.join("");
  console.log("#1:", numberOne);
  equation = [];
}

//setting numberTwo w/ input values after operator set
function setNumberTwo() {
  numberTwo = equation.join("");
  console.log("#2:", numberTwo);
  equation = [];
  console.log(equationDisplay);
}

//adds each button clicked into input display
function displayEquation() {
  let digit = $(this).text();
  equation.push(digit);
  equationDisplay += digit;
  $("#equationDisplay").val(equationDisplay);
}

//getting answers back from server
function answer() {
  //get messages from server -- AJAX!
  $.ajax({
    method: "GET",
    url: "/answers"
  }).then(function(response) {
    renderToDom(response);
  });
}

//creating object from inputs + sending to server
function calculateAnswer() {
  setNumberTwo();
  console.log("calculating answer...");

  if (operator == 0 || numberOne == 0 || numberTwo == 0) {
    alert("Equation incomplete, please enter all components.");
    return false;
  }
  let values = {
    numberOne: numberOne,
    operation: operator,
    numberTwo: numberTwo
  };
  //sending equation for calculation in server
  $.ajax({
    method: "POST",
    url: "/calculate",
    data: values
  }).then(function(response) {
    console.log(response);
    answer();
  });
  clearInputs();
}

//rendering the equation to the DOM
function renderToDom(equations) {
  console.log("rendering...");
  $("#answerLog").empty();

  for (let input of equations) {
    $("#answer").html(input.answer);

    $("#answerLog").prepend(
      `<li>${input.numberOne} ${input.operation} ${input.numberTwo} = ${
        input.answer
      }</li>`
    );
  }
}

//clearing all values for next calculation
function clearInputs() {
  $("#equationDisplay").val("");
  equationDisplay = "";
  equation = [];
  numberOne = "";
  numberTwo = "";
  operator = "none";
}

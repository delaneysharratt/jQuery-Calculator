$(document).ready(handleReady);

function handleReady() {
    console.log('running js');
    $('.numberBtn').on('click', displayEquation)
    $('.operator').on('click', setNumberOne)
    $('.operator').on('click', setOperator)
    $('#calculate').on('click', setNumberTwo)
    $('#calculate').on('click', calculateAnswer)
    $('#clear').on('click', clearInputs);
}

let equation = [];
let equationDisplay = '';
let numberOne = '';
let numberTwo = '';
let operator = '';

//setting operator for equation (+ - * /)
function setOperator() {
    console.log('setting operator...');
    operator = $(this).text();
    equationDisplay += operator;
    $('#equationDisplay').val(equationDisplay);
}

//setting numberOne w/ current values in input display
function setNumberOne() {
    numberOne = equation.join('');
    console.log('#1:', numberOne);
    equation = [];
}

//setting numberTwo w/ input values after operator set
function setNumberTwo() {
    numberTwo = equation.join('');
    console.log('#2:', numberTwo);
    equation = [];
    console.log(equationDisplay);

}

//adds each button clicked into input display
function displayEquation() {
    let digit = $(this).text();
    equation.push(digit);
    equationDisplay += digit;
    $('#equationDisplay').val(equationDisplay);
}

//getting answers back from server
function answer() {
    console.log('answer is...');
    //get messages from server -- AJAX!
    $.ajax({
        method: 'GET',
        url: '/answers'
    }).then(function (response) {
        console.log(response);
        renderToDom(response);
    });
}

//creating object from inputs + sending to server
function calculateAnswer() {
    console.log('calculating answer...');
    let values = {
        numberOne: numberOne,
        operation: operator,
        numberTwo: numberTwo
    }

    //sending equation for calculation in server
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: values
    }).then(function (response) {
        console.log(response);
        answer();
    });

}

//rendering the equation to the DOM
function renderToDom(equations) {
    console.log('rendering...');
    $('#answerLog').empty();

    for (let input of equations) {
        $('#answer').html(input.answer);

        $('#answerLog').prepend(
            `<li>${input.numberOne} ${input.operation} ${input.numberTwo} = ${input.answer}</li>`
        );
    }
}

//clearing all values for next calculation
function clearInputs() {
    $('#equationDisplay').val('');
    equationDisplay = '';
    numberOne = '';
    numberTwo = '';
    operator = 'none';
}
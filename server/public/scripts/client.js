$(document).ready(handleReady);

function handleReady() {
    console.log('running js');
    $('.operator').on('click', setOperator)
    $('#calculate').on('click', calculateAnswer)
    $('#clear').on('click', clearInputs);
}

let calculations = [];
let operator = 'none';

//setting operator for equation (+ - * /)
function setOperator() {
    console.log('setting operator...');
    operator = $(this).text();
    console.log(operator);
}

//getting answers back from server
function answer() {
    console.log('answer is...');
    //get messages from server -- AJAX!
    $.ajax({
        method: "GET",
        url: "/answers"
    }).then(function (response) {
        console.log("the answer is:", response);
        renderToDom(response);
    });
}

//creating object from inputs + sending to server
function calculateAnswer() {
    console.log('calculating answer...');
    let values = {
        numberOne: $('#valueOne').val(),
        operation: operator,
        numberTwo: $('#valueTwo').val()
    }
    calculations.push(values)
    console.log(calculations);

    $.ajax({
        method: "POST",
        url: "/calculate",
        data: values
    }).then(function (response) {
        console.log(response);
        answer();
    });

}

//rendering the equation to the DOM
function renderToDom(equations) {
    console.log("rendering...");
}

//clearing the two input values
function clearInputs() {
    $('#valueOne').val('');
    $('#valueTwo').val('');
    operator = 'none';
}
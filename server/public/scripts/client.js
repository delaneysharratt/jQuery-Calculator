$(document).ready(handleReady);

function handleReady() {
    console.log('running js');
    $('.operator').on('click', setOperator)
    $('#calculate').on('click', calculateAnswer)
    $('#clear').on('click', clearInputs);
}

let calculations = [];
let operator = 'none';

function setOperator() {
    console.log('setting operator...');
    operator = $(this).text();
    console.log(operator);
}

function calculateAnswer() {
    console.log('calculating answer...');
    let values = {
        numberOne: $('#valueOne').val(),
        numberTwo: $('#valueTwo').val(),
        operation: operator
    }
    calculations.push(values)
    console.log(calculations);

}

function clearInputs() {
    $('#valueOne').val('');
    $('#valueTwo').val('');
    operator = 'none';
}
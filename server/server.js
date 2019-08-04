const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

let equations = [];

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

//serves back files in public folder
// (html, css, js, images, etc)
app.use(express.static("server/public"));
//body parser setup
app.use(bodyParser.urlencoded({
    extended: true
}));

//returns updated equation objects with answers to client
app.get("/answers", (req, res) => {
    // res.sendStatus(200);
    console.log('sending answers');
    res.send(equations);
});

//calculations in post using inputs from get
app.post('/calculate', (req, res) => {
    console.log('calculating in post', req.body);
    let input = req.body;
    //store the input in equations
    equations.push(input);
    for (let input of equations) {
        if (input.operation == '+') {
            console.log('adding...');
            input.answer = Number(input.numberOne) + Number(input.numberTwo);
        } else if (input.operation == '-') {
            console.log('subtracting..');
            input.answer = input.numberOne - input.numberTwo;
        } else if (input.operation == '*') {
            console.log('multiplying..');
            input.answer = input.numberOne * input.numberTwo;
        } else if (input.operation == '/') {
            console.log('dividing..');
            input.answer = input.numberOne / input.numberTwo;
        }
    }
    console.log('updated calculations', equations);
    //all good servers respond!
    res.sendStatus(201); //CREATED
});
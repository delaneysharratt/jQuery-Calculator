const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

app.use(bodyParser.urlencoded({
    extended: true
}));
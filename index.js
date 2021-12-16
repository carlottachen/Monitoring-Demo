const express = require('express');
const path = require('path');
const app = express();
// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')

//create new instance of the class Rollbar
const rollbar = new Rollbar({
    accessToken: '081af7e73ffa49c49210b66e044149a3',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

let students = [];

//top level middleware
app.use(rollbar.errorHandler()); //send any errors to rollbar

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    //logs it when someone goes to our webpage
    rollbar.info('html file served successfully');
})

app.post('/api/student', (req, res) => {
    let { name } = req.body;
    name = name.trim(); //get rid of whitespace for uniformity
    students.push(name);
    rollbar.log('Student added successfully', { aurthor: "Carlotta", type: 'manual entry' });
    res.status(200).send(students);
})

const port = process.env.PORT || 4545
app.listen(port, () => console.log(`We are on PORT ${port}`));
//type npm start in command line
//type localhost:4545 in browser to check that it works
const express = require('express'),
      bodyParser = require('body-parser'),
      qanda = require('../api/qanda.json'),
      questions = require('../api/questions.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(express.static('views'));

app.set('view engine', 'ejs');

let numOfQuestions = 0
let correctAnswers = 0

app.get('/', (req, res) => {
    questions.get((result) => {
        res.render('index', { results: result });
    });
});

app.post('/', (req, res) => {
    let userAnswer = req.body.userAnswer.toLowerCase();
    let realAnswer = req.body.realAnswer.toLowerCase();

    questions.submit(userAnswer, realAnswer, (callback) => {

        // Increment the question counter
        numOfQuestions++;

        // If the callback was correct increment the correct answer counter
        if (callback === 'Correct') {
            correctAnswers++
        }

        // Finish after 10 questions in a row
        if (numOfQuestions % 10 == 0) {

            // Calculate the final score
            const result = correctAnswers / numOfQuestions * 100

            // Render the result page with the message
            res.render('results', { results: result });

        } else {
            // Continue the quiz
            res.redirect('/');
        }
    });
});

app.get('/questions', (req, res) => {
    res.json(qanda)
});

app.listen(port, () => {
    console.log('running on port: ' + port)
});

module.exports = app;

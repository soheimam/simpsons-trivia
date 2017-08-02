var request = require('request');

module.exports = {

  get: function (callback){
    request('http://localhost:' + process.env.PORT + '/questions', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let obj = JSON.parse(body)

            randomIndex = () => {
              return Math.floor(Math.random() * ((obj.length)))
            }

            // Get a random index
            const index = randomIndex()

            //pass back a random question
            callback(obj[index])
        } else {
            //pass back the error if it occured
            console.log
            callback(error)
        }
    });
  },

  submit: function (userAnswer, realAnswer, callback){
    if (userAnswer === realAnswer) {
      callback('Correct')
    } else {
      callback('Incorrect')
    }
  }
}

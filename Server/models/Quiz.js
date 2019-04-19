const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

// let answerSchema = mongoose.Schema({
//   text: {type: mongoose.Schema.Types.String,  required: REQUIRED_VALIDATION_MESSAGE},
//   correct: {type: mongoose.Schema.Types.Boolean, default: false, select: false}
// })

let questionSchema = mongoose.Schema({
  text: {type: mongoose.Schema.Types.String,  required: REQUIRED_VALIDATION_MESSAGE},
  option1: {type: mongoose.Schema.Types.String,  required: REQUIRED_VALIDATION_MESSAGE},  
  option2: {type: mongoose.Schema.Types.String,  required: REQUIRED_VALIDATION_MESSAGE},  
  option3: {type: mongoose.Schema.Types.String,  required: REQUIRED_VALIDATION_MESSAGE},  
  option4: {type: mongoose.Schema.Types.String,  required: REQUIRED_VALIDATION_MESSAGE},
  answer: {type: mongoose.Schema.Types.Number,  required: REQUIRED_VALIDATION_MESSAGE, enum: [0,1,2,3], select: false}
})

let quizSchema = mongoose.Schema({
  name: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  category: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, enum: ['funny', 'music', 'movies', 'games', 'science', 'other']},
  creator: {type: mongoose.Schema.Types.String},
  createdOn: {type: mongoose.Schema.Types.Date, default: Date.now()},
  description: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  questions: [questionSchema],  
})



let Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz

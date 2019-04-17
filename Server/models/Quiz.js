const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let answerSchema = mongoose.Schema({
  text: {type: mongoose.Schema.Types.String,  required: REQUIRED_VALIDATION_MESSAGE},
  correct: {type: mongoose.Schema.Types.Boolean, default: false, select: false}
})

let questionSchema = mongoose.Schema({
  text: {type: mongoose.Schema.Types.String,  required: REQUIRED_VALIDATION_MESSAGE},
  answers: [answerSchema],  
})

let quizSchema = mongoose.Schema({
  name: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  category: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, enum: ['funny', 'music', 'movies', 'games', 'science', 'other']},
  creator: {type: mongoose.Schema.Types.ObjectId},
  questions: [questionSchema],  
})



let Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz

const express = require('express')
const authCheck = require('../config/auth-check')
const Quiz = require('../models/Quiz')

const router = new express.Router()

function validateQuizCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  const catEnums = ['funny', 'music', 'movies', 'games', 'science', 'other'];

  if (!payload || typeof payload.name !== 'string' || payload.name.length < 5) {
    isFormValid = false
    errors.name = 'Quiz name must be at least 5 symbols.'
  }

  if (!catEnums.includes(payload.category)) {
    isFormValid = false
    errors.name = 'Invalid quiz category!'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const QuizObj = req.body;
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateQuizCreateForm(QuizObj)
    QuizObj.creator = req.user.id;
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
  
    Quiz
      .create(QuizObj)
      .then((createdQuiz) => {
        res.status(200).json({
          success: true,
          message: 'Quiz added successfully.',
          data: createdQuiz
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Quiz with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const QuizId = req.params.id
    const QuizObj = req.body
    const validationResult = validateQuizCreateForm(QuizObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Quiz
      .findById(QuizId)
      .then(existingQuiz => {
        existingQuiz.name = QuizObj.name
        existingQuiz.category = QuizObj.category
        existingQuiz.questions = QuizObj.questions


        existingQuiz
          .save()
          .then(editedQuiz => {
            res.status(200).json({
              success: true,
              message: 'Quiz edited successfully.',
              data: editedQuiz
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Quiz with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Quiz
    .find()
    .then(Quizzes => {
      res.status(200).json(Quizzes)
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Quiz
    .findById(id)
    .then(Quiz => {
      let updatedQs = Quiz.questions.map((q) => {
        return {
          _id: q._id,
          text: q.text,
          options: [q.option1, q.option2, q.option3, q.option4]
        }
      });
      Quiz.questions = updatedQs;
      res.status(200).json({Quiz, updatedQs})
    })
    .catch(() => {
      return res.status(404).json({
        message: 'Entry not found!'
      })
    })
})

router.post('/answers', (req, res) => {
  const id = req.body.id;
  Quiz
    .findById(id)
    .select('questions.answer')
    .then(Quiz => {     
      res.status(200).json(Quiz)
    })
    .catch(() => {
      return res.status(404).json({
        message: 'Entry not found!'
      })
    })
})


router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Quiz
      .findById(id)
      .then((Quiz) => {
        Quiz
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Quiz deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})


module.exports = router

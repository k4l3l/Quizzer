const authRoutes = require('../routes/auth')
const quizRoutes = require('../routes/quiz')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/quiz', quizRoutes)
}

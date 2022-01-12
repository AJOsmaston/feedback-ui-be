require('dotenv').config()
require('./database');

const express = require('express')
const app = express()
const port = 3000
const Feedback = require('./models/feedback')

app.get('/', (req, res) => {
  const displayFeedback = async () => {
    const feedback = await Feedback.find().sort({ id: -1 }).limit(10)
    res.status(200).json(feedback)
  }
  displayFeedback();
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
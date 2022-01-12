require('dotenv').config()
require('./database');

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Feedback = require('./models/feedback')

app.use(bodyParser.json());

app.get('/feedback', (req, res) => {
  const displayFeedback = async () => {
    const feedback = await Feedback.find().sort({ id: -1 }).limit(10)
    res.status(200).json(feedback)
  }
  displayFeedback();
})

app.post('/feedback', (req, res) => {
  const addFeedback = async () => {
    const newFeedback = new Feedback({ id: req.body.id, text: req.body.text, rating: req.body.rating })
    await newFeedback.save()
    console.log(`saved ${newFeedback}`)
    res.status(200).json(newFeedback)
  };
  addFeedback();
})

app.delete('/feedback/:id', (req, res) => {
  const deleteFeedback = async () => {
    const feedback = await Feedback.deleteOne({ id: req.params.id })
    console.log(`removed ${feedback}`)
    res.status(200).json(feedback)
  }
  deleteFeedback();
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
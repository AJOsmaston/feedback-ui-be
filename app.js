require('dotenv').config()
require('./database');

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Feedback = require('./models/feedback')

app.use(bodyParser.json());

app.get('/feedback', (req, res, next) => {
  const displayFeedback = async () => {
    const feedback = await Feedback.find().sort({ _id: -1 })
    res.status(200).json(feedback)
  }
  displayFeedback().catch(next);
})

app.post('/feedback', (req, res, next) => {
  const addFeedback = async () => {
    const feedback = new Feedback({ id: req.body.id, text: req.body.text, rating: req.body.rating })
    await feedback.save()
    console.log(`saved item id ${feedback.id}`)
    res.status(200).json(feedback)
  };
  addFeedback().catch(next);
})

app.delete('/feedback/:id', (req, res, next) => {
  const deleteFeedback = async () => {
    const feedback = await Feedback.deleteOne({ id: req.params.id })
    console.log(`successfully deleted id ${req.params.id}`)
    res.status(200).json(feedback)
  }
  deleteFeedback().catch(next);
})

app.put('/feedback/:id', (req, res, next) => {
  const updateFeedback = async () => {
    const feedback = await Feedback.findOne({ id: req.params.id })
    feedback.overwrite({ id: req.params.id, text: req.body.text, rating: req.body.rating });
    await feedback.save();
    console.log(`updated item id ${feedback.id}`)
    res.status(200).json(feedback)
  }
  updateFeedback().catch(next);
})

app.use((error, req, res, next) => {
  console.log(error.toString())
  return res.status(500).json({ error: error.toString() });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
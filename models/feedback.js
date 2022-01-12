const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  id: Number,
  text: String,
  rating: Number,
})

const Feedback = mongoose.model("feedback", FeedbackSchema)

module.exports = Feedback;

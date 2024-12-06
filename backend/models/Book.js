// Updated models/Book.js
const mongoose = require ('mongoose');

const bookSchema = new mongoose.Schema (
  {
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    condition: {type: String, required: true},
    image_url: {type: String},
    owner_id: {type: String, ref: 'User', required: true}, // Updated to use `String` for user-provided `_id`
    availability: {type: Boolean, default: true},
  },
  {timestamps: true}
);

module.exports = mongoose.model ('Book', bookSchema);

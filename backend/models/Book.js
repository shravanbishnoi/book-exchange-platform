const mongoose = require ('mongoose');

const bookSchema = new mongoose.Schema ({
  title: {type: String, required: true},
  author: {type: String, required: true},
  genre: {type: String, required: true},
  condition: {type: String, required: true},
  image_url: {type: String},
  owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  availability: {type: Boolean, default: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model ('Book', bookSchema);

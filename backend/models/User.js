const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: String, required: true},
  wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
  lend_books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
  transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model ('User', userSchema);

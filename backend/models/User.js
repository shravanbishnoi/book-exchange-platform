// Updated models/User.js
const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema (
  {
    _id: {
      type: String,
      required: true,
    },
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: false},
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    lend_books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}],
  },
  {timestamps: true}
);

module.exports = mongoose.model ('User', userSchema);

// Updated models/Transaction.js
const mongoose = require ('mongoose');

const transactionSchema = new mongoose.Schema (
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    lender_id: {type: String, ref: 'User', required: true}, // Updated to use `String` for user-provided `_id`
    borrower_id: {type: String, ref: 'User', required: true}, // Updated to use `String` for user-provided `_id`
    status: {
      type: String,
      enum: ['pending', 'success', 'fail'],
      required: true,
    },
    message: {type: String},
  },
  {timestamps: true}
);

module.exports = mongoose.model ('Transaction', transactionSchema);

// testing book ids
// 6752d63b0d6d5766228f56f8
// 6752d6d30d6d5766228f56ff

// testing transaction ids
// 6752d7e10d6d5766228f570a
// 6752d7c80d6d5766228f5708

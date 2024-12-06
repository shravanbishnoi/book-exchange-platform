const mongoose = require ('mongoose');

const transactionSchema = new mongoose.Schema ({
  book_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
  lender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  borrower_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {type: String, enum: ['pending', 'success', 'fail'], required: true},
  timestamp: {type: Date, default: Date.now},
  message: {type: String},
});

module.exports = mongoose.model ('Transaction', transactionSchema);

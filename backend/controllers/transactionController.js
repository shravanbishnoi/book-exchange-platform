// Updated controllers/transactionController.js
const Transaction = require ('../models/Transaction');

// Create a new transaction
// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { book_id, lender_id, borrower_id, status, type, message } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Transaction type is required' });
    }

    const transaction = new Transaction({
      book_id,
      lender_id,
      borrower_id,
      status,
      type,
      message,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Get a transaction by ID
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById (req.params.id).populate ([
      'book_id',
      'lender_id',
      'borrower_id',
    ]);
    if (!transaction)
      return res.status (404).json ({error: 'Transaction not found'});
    res.json (transaction);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find ().populate ([
      'book_id',
      'lender_id',
      'borrower_id',
    ]);
    res.json (transactions);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Update transaction status
// Update transaction status (and optionally type)
exports.updateTransactionStatus = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    transaction.status = req.body.status || transaction.status;
    transaction.message = req.body.message || transaction.message;

    // Update `type` if provided
    if (req.body.type) {
      transaction.type = req.body.type;
    }

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete (req.params.id);
    if (!transaction)
      return res.status (404).json ({error: 'Transaction not found'});
    res.json ({message: 'Transaction deleted successfully'});
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Get all transactions by a user
exports.getTransactionsByUser = async (req, res) => {
  try {
    const {id} = req.params;
    const transactions = await Transaction.find ({
      $or: [{lender_id: id}, {borrower_id: id}],
    }).populate (['book_id', 'lender_id', 'borrower_id']);
    if (!transactions || transactions.length === 0)
      return res
        .status (404)
        .json ({error: 'No transactions found for this user'});
    res.json (transactions);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

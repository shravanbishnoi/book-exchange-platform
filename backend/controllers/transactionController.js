const Transaction = require ('../models/Transaction');
const User = require ('../models/User');
const Book = require ('../models/Book');
const nodemailer = require ('nodemailer');
require ('dotenv').config ();

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const {book_id, lender_id, borrower_id, status, type, message} = req.body;

    if (!type) {
      return res.status (400).json ({error: 'Transaction type is required'});
    }

    const transaction = new Transaction ({
      book_id,
      lender_id,
      borrower_id,
      status,
      type,
      message,
    });

    await transaction.save ();
    res.status (201).json (transaction);
  } catch (err) {
    res.status (400).json ({error: err.message});
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

exports.updateTransactionStatus = async (req, res) => {
  try {
    const transaction = await Transaction.findById (req.params.id);
    if (!transaction) {
      return res.status (404).json ({error: 'Transaction not found'});
    }

    transaction.status = req.body.status || transaction.status;
    transaction.message = req.body.message || transaction.message;

    await transaction.save ();
    res.json (transaction);
  } catch (err) {
    res.status (400).json ({error: err.message});
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

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const {bookId, borrowerId} = req.body;

    const book = await Book.findById (bookId);
    if (!book || !book.availability) {
      return res
        .status (400)
        .json ({error: 'Book is not available for borrowing'});
    }
    const lenderId = book.owner_id;
    const lender = await User.findById (lenderId);
    const borrower = await User.findById (borrowerId);

    if (!lender || !borrower) {
      return res.status (404).json ({error: 'Lender or borrower not found'});
    }
    const transaction = new Transaction ({
      book_id: bookId,
      lender_id: lenderId,
      borrower_id: borrowerId,
      status: 'pending',
      type: 'borrow',
      message: `${borrower.name} requested to borrow "${book.title}"`,
    });
    await transaction.save ();
    lender.transactions.push (transaction._id);
    borrower.transactions.push (transaction._id);
    await lender.save ();
    await borrower.save ();

    book.availability = false;
    await book.save ();

    const transporter = nodemailer.createTransport ({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: lender.email,
      subject: `Book Borrow Request for ${book.title}`,
      text: `${borrower.name} (${borrower.email}) wants to borrow "${book.title}". Please respond promptly.`,
    };

    await transporter.sendMail (mailOptions);
    res.status (201).json ({message: 'Borrow request sent', transaction});
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

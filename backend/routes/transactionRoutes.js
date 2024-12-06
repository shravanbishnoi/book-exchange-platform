// Updated routes/transactionRoutes.js
const express = require ('express');
const router = express.Router ();
const transactionController = require ('../controllers/transactionController');

// Transaction routes
router.post ('/', transactionController.createTransaction); // Create a new transaction
router.get ('/', transactionController.getAllTransactions); // Get all transactions
router.get ('/:id', transactionController.getTransaction); // Get a transaction by ID
router.put ('/:id', transactionController.updateTransactionStatus); // Update transaction status
router.delete ('/:id', transactionController.deleteTransaction); // Delete a transaction
router.get ('/user/:id', transactionController.getTransactionsByUser); // Get all transactions by a user
router.post ('/borrow', transactionController.borrowBook); // New borrow route

module.exports = router;

// Updated routes/bookRoutes.js
const express = require ('express');
const router = express.Router ();
const bookController = require ('../controllers/bookController');
// const cors = require ('cors');

// Book routes
router.post ('/', bookController.createBook); // Create a new book
router.get ('/', bookController.getAllBooks); // Get all books
router.get ('/:id', bookController.getBook); // Get a book by ID
router.put ('/:id', bookController.updateBook); // Update book details
router.delete ('/:id', bookController.deleteBook); // Delete a book
router.put ('/:id/availability', bookController.toggleAvailability); // Toggle book availability

module.exports = router;

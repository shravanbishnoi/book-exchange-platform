const express = require ('express');
const router = express.Router ();
const bookController = require ('../controllers/bookController');

router.post ('/', bookController.createBook);
router.get ('/', bookController.getAllBooks);
router.get ('/:id', bookController.getBook); 
router.put ('/:id', bookController.updateBook);
router.delete ('/:id', bookController.deleteBook);
router.put ('/:id/availability', bookController.toggleAvailability);

module.exports = router;

// Updated routes/userRoutes.js
const express = require ('express');
const router = express.Router ();
const userController = require ('../controllers/userController');

// User routes
router.post ('/', userController.createUser); // Create a new user
router.get ('/', userController.getAllUsers); // Get all users
router.get ('/:userid', userController.getUser); // Get a user by userid
router.put ('/:userid', userController.updateUser); // Update user details
router.delete ('/:userid', userController.deleteUser); // Delete a user
router.put ('/:userid/wishlist', userController.addToWishlist); // Add a book to wishlist
router.delete ('/:userid/wishlist', userController.removeFromWishlist); // Remove a book from wishlist
router.delete('/:userid/lendlist', userController.removeFromLendList);
module.exports = router;

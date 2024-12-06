// Updated controllers/userController.js
const User = require ('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User ({
      _id: req.body.userid,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || null,
      wishlist: req.body.wishlist || [],
      lend_books: req.body.lend_books || [],
      transactions: req.body.transactions || [],
    });
    await user.save ();
    res.status (201).json (user);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Get a user by `userid`
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById (req.params.userid).populate ([
      'wishlist',
      'lend_books',
      'transactions',
    ]);
    if (!user) return res.status (404).json ({error: 'User not found'});
    res.json (user);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find ().populate ([
      'wishlist',
      'lend_books',
      'transactions',
    ]);
    res.json (users);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Update user details by `userid`
exports.updateUser = async (req, res) => {
  try {
    const updateFields = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
    };

    const user = await User.findByIdAndUpdate (
      req.params.userid,
      updateFields,
      {
        new: true,
      }
    );

    if (!user) {
      return res.status (404).json ({error: 'User not found'});
    }

    res.json (user);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Delete a user by `userid`
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete (req.params.userid);
    if (!user) return res.status (404).json ({error: 'User not found'});
    res.json ({message: 'User deleted successfully'});
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Add a book to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById (req.params.userid);
    if (!user) return res.status (404).json ({error: 'User not found'});
    user.wishlist.push (req.body.bookId);
    await user.save ();
    res.json (user);
  } catch (err) {
    console.log(err.message)
    res.status (400).json ({error: err.message});
  }
};

// Remove a book from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById (req.params.userid);
    console.log()
    if (!user) return res.status (404).json ({error: 'User not found'});
    user.wishlist.pull (req.body.bookId);
    await user.save ();
    res.json (user);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};


// In your controllers/userController.js

exports.removeFromLendList = async (req, res) => {
  try {
    const { userid } = req.params;
    const { bookId } = req.body;

    // Find the user by ID
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove the bookId from the lend_books array
    console.log("id", bookId)
    user.lend_books = user.lend_books.filter((book) => book._id.toString() !== bookId);

    // Save the updated user
    await user.save();
    console.log("done", user.lend_books)
    res.status(200).json({ message: 'Book removed from lend list', lend_books: user.lend_books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

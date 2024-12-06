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
    const user = await User.findByIdAndUpdate (req.params.userid, req.body, {
      new: true,
    });
    if (!user) return res.status (404).json ({error: 'User not found'});
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
    console.log("hellow", user, req.body.bookId)
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
    if (!user) return res.status (404).json ({error: 'User not found'});
    user.wishlist.pull (req.body.bookId);
    await user.save ();
    res.json (user);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

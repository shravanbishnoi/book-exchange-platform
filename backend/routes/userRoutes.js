const User = require ('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User (req.body);
    await user.save ();
    res.status (201).json (user);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Get a user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById (req.params.id).populate ([
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

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status (404).json ({error: 'User not found'});
    res.json (user);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete (req.params.id);
    if (!user) return res.status (404).json ({error: 'User not found'});
    res.json ({message: 'User deleted successfully'});
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Add a book to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById (req.params.id);
    if (!user) return res.status (404).json ({error: 'User not found'});
    user.wishlist.push (req.body.bookId);
    await user.save ();
    res.json (user);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Remove a book from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById (req.params.id);
    if (!user) return res.status (404).json ({error: 'User not found'});
    user.wishlist.pull (req.body.bookId);
    await user.save ();
    res.json (user);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

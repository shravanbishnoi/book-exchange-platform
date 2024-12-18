const Book = require ('../models/Book');
const User = require ('../models/User');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const userid = req.body.owner_id;
    const book = new Book (req.body);
    const savedBook = await book.save ();
    const user = await User.findById (userid);
    if (!user) return res.status (404).json ({error: 'User not found'});

    user.lend_books.push (savedBook._id);
    await user.save ();

    res.status (201).json ({user, book: savedBook});
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Get a book by ID
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById (req.params.id);
    if (!book) return res.status (404).json ({error: 'Book not found'});
    res.json (book);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find ();
    res.json (books);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Update book details
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status (404).json ({error: 'Book not found'});
    res.json (book);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete (req.params.id);
    if (!book) return res.status (404).json ({error: 'Book not found'});
    res.json ({message: 'Book deleted successfully'});
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Toggle book availability
exports.toggleAvailability = async (req, res) => {
  try {
    const book = await Book.findById (req.params.id);
    if (!book) return res.status (404).json ({error: 'Book not found'});
    book.availability = !book.availability;
    await book.save ();
    res.json (book);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

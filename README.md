# BookBridge: A Book Exchange Platform

Welcome to **BookBridge**, a platform for book enthusiasts to list, search, lend, and borrow books within their communities. Designed for students, avid readers, and local communities, BookBridge simplifies the process of connecting people through books.

## **Project Overview**

**BookBridge** enables users to:

- List books for lending.
- Search for books by title, author, or genre.
- Add books to their wishlist.
- Borrow books from others through a streamlined transaction system.

---

## **Project Links**

- **GitHub Codebase**: [https://github.com/shravanbishnoi/book-exchange-platform](https://github.com/shravanbishnoi/book-exchange-platform)
- **Deployed Web App**: [https://bookbride-bookexchange.netlify.app/](https://bookbride-bookexchange.netlify.app/)

---

## **Directory Structure**

```
book-exchange-platform/
├── backend                 # Backend code (Node.js, Express, MongoDB Atlas)
├── front-end               # Frontend code (React, Netlify hosting)
├── .gitignore              # Ignored files for version control
├── README.md               # Project documentation
├── package-lock.json       # Dependency lock file
├── package.json            # Node.js package dependencies
```

---

## **Models**

### **User Model** (`models/User.js`)

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    location: { type: String, required: false },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    lend_books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
```

### **Book Model** (`models/Book.js`)

```javascript
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, required: true },
  image_url: { type: String, required: false },
  owner_id: {
    type: String,
    required: true,
  },
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model("Book", bookSchema);
```

### **Transaction Model** (`models/Transaction.js`)

```javascript
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    lender_id: { type: String, ref: "User", required: true }, // Updated to use `String` for user-provided `_id`
    borrower_id: { type: String, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "success", "fail"],
      required: true,
    },
    type: {
      type: String,
      enum: ["borrow", "lend"], // Restrict to specific values
      required: true,
    },
    message: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
```

---

## **Key Features**

1. **Home Page**:

   - Lists all books available for borrowing.
   - Includes a search bar and filter dropdown (title, author, genre).
   - Displays book details (image, title, author, genre, and a borrow button).

2. **Profile Page**:

   - Displays user details.
   - Three tables:
     - Wishlist: Books the user wishes to borrow.
     - Lend Books: Books listed for lending.
     - Transactions: Borrowing and lending history with statuses (success, fail, pending).

3. **Borrow Page**:
   - Form to send a borrowing request to the lender.
   - Captures borrower details and sends an email to the lender.

---

## **Tech Stack**

### **Frontend**

- React.js
- Netlify (for deployment)

### **Backend**

- Node.js
- Express.js
- MongoDB Atlas (Database)

### **Additional Tools**

- Mongoose (for MongoDB schema modeling)
- dotenv (for environment variables)

---

## **Installation Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/shravanbishnoi/book-exchange-platform.git
cd book-exchange-platform
```

### **2. Backend Setup**

```bash
cd backend
npm install

# Add a .env file with the following variables:
MONGO_URI=<your_mongodb_connection_string>
PORT=5000

# Start the backend server
npm start
```

### **3. Frontend Setup**

```bash
cd front-end
npm install

# Start the React development server
npm start
```

---

## **API Endpoints**

### **User Endpoints**

- `POST /api/users` - Create a new user.
- `GET /api/users/:id` - Retrieve a user by ID.
- `PUT /api/users/:id` - Update user details.
- `DELETE /api/users/:id` - Delete a user.

### **Book Endpoints**

- `POST /api/books` - Create a new book.
- `GET /api/books/:id` - Retrieve a book by ID.
- `GET /api/books` - List all books.
- `PUT /api/books/:id` - Update book details.
- `DELETE /api/books/:id` - Delete a book.

### **Transaction Endpoints**

- `POST /api/transactions` - Create a new transaction.
- `GET /api/transactions/:id` - Retrieve a transaction by ID.
- `GET /api/transactions` - List all transactions.
- `PUT /api/transactions/:id` - Update transaction status.

---

## **Contributing**

We welcome contributions! Please fork the repository, create a new branch, and submit a pull request with your changes.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Contact**

For any questions or feedback, please reach out to:

- **Shravan Bishnoi**
- Email: [shravan@example.com](mailto:shravan@example.com)

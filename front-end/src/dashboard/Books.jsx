import React, { useState } from "react";
import {BASE_SERVER_URL, API} from "../Constants";
import {useUser} from "../context/user"
import showSwalAlert from "../utilities/AlertComponents";
const BookListingPage = () => {
  const {current: user} = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("bookName");

  const books = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classics",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      name: "1984",
      author: "George Orwell",
      genre: "Dystopian",
    },
  ];

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredBooks = books.filter((book) => {
    if (filter === "bookName")
      return book.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "author")
      return book.author.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "genre")
      return book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

  console.log(BASE_SERVER_URL + API + "users/" + user?.uid + "/wishlist/")
  const handleAddWishList = async (bookId) => {
    try {
      const response = await fetch(BASE_SERVER_URL + API + "users/" + user?.uid + "/wishlist/", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),

      }).then(response => {
        if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Process response as JSON
      })
    
      .then(res => {
        showSwalAlert ({icon: 'success', title: "Book added to Wishlist", text: "Now you can see in wishlist."});
      }).catch((error) => {
        showSwalAlert ({icon: 'error', title: error.code, text: error.message});
      })
  
      if (!response.ok) {
        throw new Error('Failed to add book to wishlist');
      }
  
      const updatedUser = await response.json();
      console.log('Wishlist updated:', updatedUser.wishlist);
  
      // Optionally update UI with new wishlist
      setWishlist(updatedUser.wishlist);
    } catch (error) {
      console.error('Error adding book to wishlist:', error.message);
    }
  };
  

  return (
    <div className="container mt-5">
      {/* Search and Filter Row */}
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder={`Search by ${filter}`}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="bookName">Book Name</option>
            <option value="author">Author Name</option>
            <option value="genre">Genre</option>
          </select>
        </div>
      </div>

      {/* Book Cards */}
      <div className="row">
        {filteredBooks.map((book) => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={book.image}
                className="card-img-top"
                alt={book.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{book.name}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}
                  <br />
                  <strong>Genre:</strong> {book.genre}
                </p>
              </div>
              <div className="card-footer text-center">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary me-2 flex-fill">
                    Borrow
                  </button>
                  <button className="btn btn-primary flex-fill" onClick={() => handleAddWishList(book.id)}>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListingPage;

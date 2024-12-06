import React, { useState } from "react";
import {BASE_SERVER_URL, API} from "../Constants";
import {useUser} from "../context/user"
import showSwalAlert from "../utilities/AlertComponents";
import { useEffect } from "react";



const BookListingPage = () => {
  const {current: user} = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("bookName");
  const [books, setBooks] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);

  const BASE_API_URL = `${BASE_SERVER_URL}${API}books/`;

  useEffect (() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch (BASE_API_URL);
        if (!response.ok) {
          throw new Error ('Failed to fetch books');
        }
        const data = await response.json ();
        const availableBooks = data.filter (book => book.availability === true);
        setBooks (availableBooks);
      } catch (err) {
        setError (err.message);
      } finally {
        setLoading (false);
      }
    };

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
  
    fetchBooks ();
  }, []);

  const handleSearchChange = e => setSearchQuery (e.target.value);
  const handleFilterChange = e => setFilter (e.target.value);

  const filteredBooks = books.filter (book => {
    if (filter === 'title')
      return book.title.toLowerCase ().includes (searchQuery.toLowerCase ());
    if (filter === 'author')
      return book.author.toLowerCase ().includes (searchQuery.toLowerCase ());
    if (filter === 'genre')
      return book.genre.toLowerCase ().includes (searchQuery.toLowerCase ());
    return true;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            <option value="title">Book Title</option>
            <option value="author">Author Name</option>
            <option value="genre">Genre</option>
          </select>
        </div>
      </div>

      {/* Book Cards */}
      <div className="row">
        {filteredBooks.map (book => (
          <div className="col-md-4 mb-4" key={book._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={book.image_url || 'https://via.placeholder.com/150'}
                className="card-img-top"
                alt={book.title}
                style={{height: '200px', objectFit: 'cover'}}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}
                  <br />
                  <strong>Genre:</strong> {book.genre}
                  <br />
                  <strong>Condition:</strong> {book.condition}
                </p>
              </div>
              <div className="card-footer text-center">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary me-2 flex-fill">
                    Borrow
                  </button>
                  <button className="btn btn-primary flex-fill" onClick={() => handleAddWishList(book._id)}>
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

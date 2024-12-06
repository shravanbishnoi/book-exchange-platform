import React, { useState } from "react";

const BookListingPage = () => {
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
    if (filter === "bookName") return book.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "author") return book.author.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "genre") return book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

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
                <button className="btn btn-primary w-100">Borrow</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListingPage;

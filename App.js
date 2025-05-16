import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import BookList from './components/BookList';
import BorrowHistory from './components/BorrowHistory';
import booksData from './data/books.json';
function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    setBooks(booksData);
    const storedHistory = JSON.parse(localStorage.getItem('borrowHistory')) || [];
    setBorrowedBooks(storedHistory);
  }, []);

  const handleSearch = (term) => setSearchTerm(term);
  const handleCategoryChange = (category) => setSelectedCategory(category);

  const handleBorrow = (book) => {
    const updatedHistory = [...borrowedBooks, book];
    setBorrowedBooks(updatedHistory);
    localStorage.setItem('borrowHistory', JSON.stringify(updatedHistory));
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <h1>📚 Book Library</h1>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      <BookList books={filteredBooks} onBorrow={handleBorrow} />
      <BorrowHistory books={borrowedBooks} />
    </div>
  );
}

export default App;











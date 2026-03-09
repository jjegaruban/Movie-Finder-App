import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import ErrorPage from './pages/ErrorPage';
import SearchResults from './pages/searchResults/SearchResults';
import './App.css';

function App() {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/movies/:type" element={<MovieList />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        
        {/* Optional Back to Top Button */}
        <button 
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </Router>
  );
}

export default App;
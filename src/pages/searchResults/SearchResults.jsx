import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cards from '../../components/card/card';
import './SearchResults.css';
import leftArrow from '../../assets/left_arrow.png';

const SearchResults = () => {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}&page=${page}`
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                
                const data = await response.json();
                setMovies(data.results);
                setTotalResults(data.total_results);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchMovies();
        }
    }, [query, page]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleRetry = () => {
        setPage(1);
        // This will trigger the useEffect again
    };

    if (loading) {
        return (
            <div className="search-loading">
                <div className="spinner"></div>
                <p>Searching for "{query}"...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="search-error">
                <i className="fas fa-exclamation-circle"></i>
                <h2>Oops! Something went wrong</h2>
                <p>{error}</p>
                <button onClick={handleRetry} className="retry-button">
                    <i className="fas fa-redo"></i>
                    Try Again
                </button>
                <button onClick={handleBack} className="back-button">
                    <img src={leftArrow} alt="Back" />
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="search-results">
            {/* Header Section */}
            <div className="search-header">
                <button onClick={handleBack} className="back-button" aria-label="Go back">
                    <img src={leftArrow} alt="" />
                    <span>Back</span>
                </button>
                
                <div className="search-info">
                    <h1 className="search-title">
                        Search Results
                        <span className="search-query">for "{query}"</span>
                    </h1>
                    <p className="search-stats">
                        Found <strong>{totalResults}</strong> {totalResults === 1 ? 'movie' : 'movies'}
                    </p>
                </div>
            </div>

            {/* Results Section */}
            <div className="search-content">
                {movies.length > 0 ? (
                    <>
                        <div className="movies-grid">
                            {movies.map(movie => (
                                <Cards key={movie.id} movie={movie} />
                            ))}
                        </div>
                        
                        {/* Load More / Pagination */}
                        {movies.length < totalResults && (
                            <div className="pagination">
                                <button 
                                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                    disabled={page === 1}
                                    className="pagination-button"
                                >
                                    <i className="fas fa-chevron-left"></i>
                                    Previous
                                </button>
                                <span className="page-info">
                                    Page {page} of {Math.ceil(totalResults / 20)}
                                </span>
                                <button 
                                    onClick={() => setPage(prev => prev + 1)}
                                    disabled={movies.length < 20}
                                    className="pagination-button"
                                >
                                    Next
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">
                            <i className="fas fa-film"></i>
                        </div>
                        <h2>No movies found</h2>
                        <p>We couldn't find any movies matching "{query}"</p>
                        <p className="no-results-suggestion">Try checking spelling or using different keywords</p>
                        <button onClick={handleBack} className="home-button">
                            <i className="fas fa-home"></i>
                            Go Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Cards from '../../components/card/card'; // Assuming you have a Cards component
import './SearchResults.css';
import leftArrow from '../../assets/left_arrow.png'; // Adjust the path as necessary




const SearchResults = () => {
    const { query } = useParams(); // Get the query parameter from the URL
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}`);
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false once data fetching is done
            }
        };
        fetchMovies();
    }, [query]); // Dependency on query to refetch if it changes

    if (loading) {
        return <div>
        <h2>Loading...</h2>
        </div>; // Display loading indicator
    }


    return (
        <div className="movie__list">
            <div>
            <button onClick={() => navigate(-1)} className="back-button">
         <img src={leftArrow} alt="Back" />
          </button>
           </div>
            <h2 className="list__title">Search Results for: "{query}"</h2>
            <div className="list__cards">
                {
                    movies.length > 0 ? (
                        movies.map(movie => (
                            <Cards key={movie.id} movie={movie} /> // Render movie cards directly
                        ))
                    ) : (
                        <p>No results found.</p> // Handle case where no movies are found
                    )
                }
            </div>
        </div>
    );
};

export default SearchResults;




import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then(res => res.json())
        .then(data => {
            setPopularMovies(data.results)
            setLoading(false)
        })
        .catch(error => {
            console.error("Error fetching movies:", error)
            setLoading(false)
        })
    }, [])

    const truncateText = (text, length) => {
        if (!text) return ""
        return text.length > length ? text.substring(0, length) + "..." : text
    }

    return (
        <div className="home">
            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <div className="hero-section">
                        <Carousel
                            showThumbs={false}
                            autoPlay={true}
                            transitionTime={3}
                            infiniteLoop={true}
                            showStatus={false}
                            showIndicators={true}
                            swipeable={true}
                            emulateTouch={true}
                        >
                            {popularMovies.map(movie => (
                                <Link key={movie.id} style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                                    <div className="posterImage">
                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.original_title} loading="lazy" />
                                    </div>
                                    <div className="posterImage__overlay">
                                        <div className="posterImage__title">{movie.original_title}</div>
                                        <div className="posterImage__info">
                                            <span className="posterImage__release">{movie.release_date?.split('-')[0]}</span>
                                            <span className="posterImage__rating">
                                                <i className="fas fa-star" />
                                                {movie.vote_average?.toFixed(1)}
                                            </span>
                                        </div>
                                        <div className="posterImage__description">
                                            {truncateText(movie.overview, 200)}
                                        </div>
                                        <button className="posterImage__button">
                                            Watch Now <i className="fas fa-play" />
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </Carousel>
                    </div>
                    <div className="movie-list-container">
                        <MovieList />
                    </div>
                </>
            )}
        </div>
    )
}

export default Home
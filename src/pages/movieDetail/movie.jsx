import React, { useEffect, useState } from "react"
import "./movie.css"
import { useParams } from "react-router-dom"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, [id])

    const getData = () => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => {
            setMovie(data)
            setLoading(false)
        })
        .catch(error => {
            console.error("Error fetching movie details:", error)
            setLoading(false)
        })
    }

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="movie-loading">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!currentMovieDetail) {
        return (
            <div className="movie-error">
                <h2>Movie not found</h2>
                <p>Sorry, we couldn't find the movie you're looking for.</p>
            </div>
        )
    }

    return (
        <div className="movie">
            {/* Backdrop Section */}
            <div className="movie__backdrop-section">
                <div className="movie__backdrop-overlay"></div>
                <img 
                    className="movie__backdrop" 
                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`}
                    alt={currentMovieDetail.original_title}
                    loading="lazy"
                />
            </div>

            {/* Movie Detail Section */}
            <div className="movie__detail-container">
                <div className="movie__detail-wrapper">
                    {/* Poster */}
                    <div className="movie__poster-wrapper">
                        <img 
                            className="movie__poster" 
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`}
                            alt={currentMovieDetail.original_title}
                            loading="lazy"
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="movie__info">
                        <div className="movie__header">
                            <h1 className="movie__title">{currentMovieDetail.original_title}</h1>
                            {currentMovieDetail.tagline && (
                                <p className="movie__tagline">"{currentMovieDetail.tagline}"</p>
                            )}
                        </div>

                        <div className="movie__stats">
                            <div className="movie__rating">
                                <i className="fas fa-star"></i>
                                <span>{currentMovieDetail.vote_average?.toFixed(1)}</span>
                                <span className="movie__vote-count">({currentMovieDetail.vote_count} votes)</span>
                            </div>
                            <div className="movie__runtime">
                                <i className="far fa-clock"></i>
                                <span>{formatRuntime(currentMovieDetail.runtime)}</span>
                            </div>
                            <div className="movie__release">
                                <i className="far fa-calendar-alt"></i>
                                <span>{formatDate(currentMovieDetail.release_date)}</span>
                            </div>
                        </div>

                        <div className="movie__genres">
                            {currentMovieDetail.genres?.map(genre => (
                                <span key={genre.id} className="movie__genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="movie__overview">
                            <h3>Synopsis</h3>
                            <p>{currentMovieDetail.overview}</p>
                        </div>

                        {/* Useful Links */}
                        <div className="movie__links">
                            <h3>Useful Links</h3>
                            <div className="movie__links-wrapper">
                                {currentMovieDetail.homepage && (
                                    <a 
                                        href={currentMovieDetail.homepage} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="movie__link movie__link--homepage"
                                    >
                                        <i className="fas fa-globe"></i>
                                        Official Website
                                    </a>
                                )}
                                {currentMovieDetail.imdb_id && (
                                    <a 
                                        href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="movie__link movie__link--imdb"
                                    >
                                        <i className="fab fa-imdb"></i>
                                        View on IMDb
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Production Companies */}
            {currentMovieDetail.production_companies?.length > 0 && (
                <div className="movie__production">
                    <h2 className="movie__section-title">Production Companies</h2>
                    <div className="movie__production-grid">
                        {currentMovieDetail.production_companies.map(company => (
                            company.logo_path ? (
                                <div key={company.id} className="movie__production-card">
                                    <div className="movie__production-logo-wrapper">
                                        <img 
                                            src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                            alt={company.name}
                                            className="movie__production-logo"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="movie__production-name">{company.name}</p>
                                </div>
                            ) : (
                                <div key={company.id} className="movie__production-card movie__production-card--no-logo">
                                    <div className="movie__production-placeholder">
                                        <i className="fas fa-building"></i>
                                    </div>
                                    <p className="movie__production-name">{company.name}</p>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Movie
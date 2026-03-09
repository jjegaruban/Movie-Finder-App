import React, { useState, useEffect } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import "./card.css"
import { Link } from "react-router-dom"

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [imageError, setImageError] = useState(false)

    useEffect(() => {
        // Simulate loading time for skeleton
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const handleImageError = () => {
        setImageError(true)
    }

    const formatRating = (rating) => {
        return rating?.toFixed(1) || "N/A"
    }

    const formatYear = (date) => {
        return date ? new Date(date).getFullYear() : "N/A"
    }

    const truncateText = (text, maxLength) => {
        if (!text) return ""
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
    }

    if (isLoading) {
        return (
            <div className="cards-skeleton">
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton height={300} duration={1.5} borderRadius="10px" />
                </SkeletonTheme>
            </div>
        )
    }

    return (
        <Link to={`/movie/${movie.id}`} className="cards-link">
            <div className="cards">
                {/* Movie Poster */}
                <div className="cards__image-container">
                    {!imageError ? (
                        <img
                            className="cards__img"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.original_title || movie.title}
                            onError={handleImageError}
                            loading="lazy"
                        />
                    ) : (
                        <div className="cards__placeholder">
                            <i className="fas fa-film"></i>
                            <span>{movie.original_title?.charAt(0) || "?"}</span>
                        </div>
                    )}
                </div>

                {/* Movie Info Overlay */}
                <div className="cards__overlay">
                    <div className="cards__content">
                        <h3 className="cards__title">
                            {truncateText(movie.original_title || movie.title, 30)}
                        </h3>
                        
                        <div className="cards__info">
                            <span className="cards__year">
                                <i className="far fa-calendar-alt"></i>
                                {formatYear(movie.release_date)}
                            </span>
                            
                            <span className="cards__rating">
                                <i className="fas fa-star"></i>
                                {formatRating(movie.vote_average)}
                            </span>
                        </div>
                        
                        <p className="cards__description">
                            {truncateText(movie.overview, 100)}
                        </p>
                        
                        <div className="cards__badge">
                            {movie.vote_count > 1000 
                                ? `${(movie.vote_count / 1000).toFixed(1)}K votes`
                                : `${movie.vote_count} votes`}
                        </div>
                    </div>
                </div>

                {/* Quick Info Badge */}
                <div className="cards__quick-info">
                    <span className="cards__quick-rating">
                        <i className="fas fa-star"></i>
                        {formatRating(movie.vote_average)}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default Cards
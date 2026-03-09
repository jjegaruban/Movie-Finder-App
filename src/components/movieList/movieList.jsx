import React, { useEffect, useState } from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = () => {
    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { type } = useParams()

    useEffect(() => {
        setPage(1)
        getData(1)
    }, [type])

    useEffect(() => {
        if (page > 1) {
            getData(page)
        }
    }, [page])

    const getData = (pageNum) => {
        setLoading(true)
        const movieType = type ? type : "popular"
        
        fetch(`https://api.themoviedb.org/3/movie/${movieType}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${pageNum}`)
        .then(res => res.json())
        .then(data => {
            if (pageNum === 1) {
                setMovieList(data.results)
            } else {
                setMovieList(prev => [...prev, ...data.results])
            }
            setTotalPages(data.total_pages)
            setLoading(false)
        })
        .catch(error => {
            console.error("Error fetching movies:", error)
            setLoading(false)
        })
    }

    const loadMore = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1)
        }
    }

    const formatTypeName = (type) => {
        if (!type) return "Popular"
        
        const typeMap = {
            "popular": "Popular",
            "now_playing": "Now Playing",
            "upcoming": "Upcoming",
            "top_rated": "Top Rated"
        }
        
        return typeMap[type] || type.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }

    return (
        <div className="movie-list">
            {/* Header Section */}
            <div className="movie-list-header">
                <h2 className="movie-list-title">
                    {formatTypeName(type)} Movies
                </h2>
                <p className="movie-list-count">
                    {movieList.length} {movieList.length === 1 ? 'Movie' : 'Movies'}
                </p>
            </div>

            {/* Movies Grid */}
            {loading && page === 1 ? (
                <div className="movie-list-loading">
                    <div className="spinner"></div>
                    <p>Loading movies...</p>
                </div>
            ) : (
                <>
                    <div className="movies-grid">
                        {movieList.map((movie, index) => (
                            <Cards key={`${movie.id}-${index}`} movie={movie} />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {page < totalPages && (
                        <div className="load-more-container">
                            <button 
                                onClick={loadMore} 
                                className="load-more-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="button-spinner"></div>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        Load More Movies
                                        <i className="fas fa-chevron-down"></i>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Loading More Indicator */}
                    {loading && page > 1 && (
                        <div className="loading-more">
                            <div className="spinner small"></div>
                            <span>Loading more movies...</span>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default MovieList
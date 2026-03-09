import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const [query, setQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search/${query.trim()}`);
            setQuery("");
            if (window.innerWidth <= 768) {
                setIsMenuOpen(false);
            }
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname.includes(path);
    };

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="header-container">
                {/* Logo/Brand */}
                <Link to="/" className="header-logo" onClick={() => setIsMenuOpen(false)}>
                    <span className="logo-text">Movie</span>
                    <span className="logo-accent">Finder</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="header-nav desktop-nav">
                    <Link 
                        to="/movies/popular" 
                        className={`nav-link ${isActive('/popular') ? 'active' : ''}`}
                    >
                        <i className="fas fa-fire"></i>
                        <span>Popular</span>
                    </Link>
                    <Link 
                        to="/movies/top_rated" 
                        className={`nav-link ${isActive('/top_rated') ? 'active' : ''}`}
                    >
                        <i className="fas fa-star"></i>
                        <span>Top Rated</span>
                    </Link>
                    <Link 
                        to="/movies/upcoming" 
                        className={`nav-link ${isActive('/upcoming') ? 'active' : ''}`}
                    >
                        <i className="fas fa-calendar-alt"></i>
                        <span>Upcoming</span>
                    </Link>
                </nav>

                {/* Desktop Search */}
                <form onSubmit={handleSearch} className="header-search desktop-search">
                    <div className="search-wrapper">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search movies..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="search-input"
                        />
                        {query && (
                            <button 
                                type="button" 
                                className="clear-search"
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        className="search-button"
                        disabled={!query.trim()}
                    >
                        Search
                    </button>
                </form>

                {/* Mobile Menu Button */}
                <button 
                    className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Mobile Menu */}
                <div ref={menuRef} className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-menu-header">
                        <Link to="/" className="mobile-logo" onClick={() => setIsMenuOpen(false)}>
                            <span className="logo-text">Movie</span>
                            <span className="logo-accent">Finder</span>
                        </Link>
                        <button 
                            className="close-menu"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mobile-search">
                        <div className="search-wrapper">
                            <i className="fas fa-search search-icon"></i>
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="search-input"
                                autoFocus
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="search-button"
                            disabled={!query.trim()}
                        >
                            Search
                        </button>
                    </form>

                    {/* Mobile Navigation */}
                    <nav className="mobile-nav">
                        <Link 
                            to="/movies/popular" 
                            className={`mobile-nav-link ${isActive('/popular') ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-fire"></i>
                            <span>Popular</span>
                        </Link>
                        <Link 
                            to="/movies/top_rated" 
                            className={`mobile-nav-link ${isActive('/top_rated') ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-star"></i>
                            <span>Top Rated</span>
                        </Link>
                        <Link 
                            to="/movies/upcoming" 
                            className={`mobile-nav-link ${isActive('/upcoming') ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>Upcoming</span>
                        </Link>
                    </nav>

                    <div className="mobile-menu-footer">
                        <p>© 2024 MovieFinder</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
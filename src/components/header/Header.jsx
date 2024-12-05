import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="header">
            <div className="headerLeft">
               
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>

            <div className="headerRight">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="Search for a movie..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        className="searchInput"
                    />
                    <button type="submit" className="searchButton">Search</button>
                </form>
            </div>
        </div>
    );
};

export default Header;

import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/search.svg';
import notifIcon from '../../assets/notification.svg';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="navbar__left">
                <img className="navbar__logo" src={logo} alt="Netflix" />
            </div>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar__links navbar-nav">
                    <Link to={'/'}>
                        <li className="navbar__link nav-item">Home</li>
                    </Link>
                    <Link to={'/movies'}>
                        <li className="navbar__link nav-item">Movies</li>
                    </Link>
                    <Link to={'/tv-shows'}>
                        <li className="navbar__link nav-item">TV Shows</li>
                    </Link>
                    <Link to={'/trending'}>
                        <li className="navbar__link nav-item">Trending</li>
                    </Link>
                </ul>
            </div>
            <div className="navbar__right">
                <button className="navbar__icon">
                    <img src={searchIcon} alt="search" />
                </button>
                <button className="navbar__icon">
                    <img src={notifIcon} alt="notify" />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

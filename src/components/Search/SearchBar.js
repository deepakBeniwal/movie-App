import React, { useEffect, useRef } from 'react';
import './SearchBar.css';

function SearchBar({ isOpen, onClose }) {
    const searchRef = useRef(null);

    // Close the search bar when clicked outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`search-bar ${isOpen ? 'open' : ''}`} ref={searchRef}>
            <div className="search-bar__content">
                <input type="text" placeholder="Search..." />
                <button className="close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default SearchBar;

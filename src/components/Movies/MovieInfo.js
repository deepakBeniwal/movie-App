import React from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import './MovieInfo.css';

function truncateDescription(description, maxChars) {
    if (description.length > maxChars) {
        return description.substring(0, maxChars) + '...';
    }
    return description;
}

function MovieInfo(props) {
    const truncatedDescription = truncateDescription(props.description, 150);

    return (
        <div className="movie-info">
            <h2>{props.title}</h2>
            <br />
            <p>{truncatedDescription}</p>
            <br />

            <button className="watch-button">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaPlay style={{ marginRight: '4px' }} /> Watch Now
                </div>
            </button>

            <button className="info-button">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaInfoCircle style={{ marginRight: '4px' }} /> More Info
                </div>
            </button>
        </div>
    );
}

export default MovieInfo;

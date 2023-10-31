import React from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import './MovieInfo.css';

function truncateDescription(description, maxChars) {
    if (description.length > maxChars) {
        return description.substring(0, maxChars) + '...';
    }
    return description;
}

function splitTitle(title) {
    const words = title.split(' ');
    if (words.length > 3) {
        // If the title has more than three words, split it into two lines
        return (
            <div>
                <div>{words.slice(0, 2).join(' ')}</div>
                <div>{words.slice(2).join(' ')}</div>
            </div>
        );
    }
    return title;
}

function MovieInfo(props) {
    const truncatedDescription = truncateDescription(props.description, 200);
    const title = splitTitle(props.title);

    return (
        <div className="movie-info">
            <h2>{title}</h2>
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

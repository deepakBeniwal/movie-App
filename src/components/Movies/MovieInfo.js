import React from 'react';
import './MovieInfo.css';
import InfoButton from '../UI/InfoButton';
import PlayButton from '../UI/PlayButton';
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
                {PlayButton}
                Watch Now
            </button>

            <button className="info-button">
                {InfoButton}
                More Info
            </button>
        </div>
    );
}

export default MovieInfo;

import React, { useState } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import './MovieInfo.css';
import InfoModal from '../MoreInfo/InfoModal';

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
    console.log(props.movie);
    const [isModalOpen, setModalOpen] = useState(false);

    const truncatedDescription = truncateDescription(props.description, 180);
    const title = splitTitle(props.title);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

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

            <button className="info-button" onClick={openModal}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaInfoCircle style={{ marginRight: '4px' }} /> More Info
                </div>
            </button>

            <InfoModal isOpen={isModalOpen} onRequestClose={closeModal} movie={props.movie} />
        </div>
    );
}

export default MovieInfo;

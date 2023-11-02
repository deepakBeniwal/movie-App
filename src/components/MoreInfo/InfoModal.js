import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './InfoModal.css';
// import CastSlider from './CastSlider';

Modal.setAppElement('#backdrop-root');

const InfoModal = ({ isOpen, onRequestClose, movie }) => {
    // Destructure movie details for easy access
    const { title, overview, rating, backdrop_path, genres, release_date, vote_average, vote_count, videos, cast } = movie; // Include 'cast' in the destructuring

    // Function to format the release date
    const formatReleaseDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const handleModalOpen = () => {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const handleModalClose = () => {
        document.body.style.overflow = 'auto'; // Enable scrolling
        onRequestClose();
    };

    useEffect(() => {
        if (isOpen) {
            handleModalOpen();
        } else {
            handleModalClose();
        }
    }, [isOpen]);

    // Function to generate the video iframe URL
    const generateVideoUrl = (key) => `https://www.youtube.com/embed/${key}`;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Movie Details Modal" className="modal" overlayClassName="overlay">
            <div className="modal-content">
                <div className="backdrop-image" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})` }}>
                    <div className="overlay-details">
                        <h2 className="modal-title">{title}</h2>
                        <p className="modal-description">{overview}</p>
                        <div className="modal-info">
                            <div className="modal-rating">Rating: {rating}</div>
                            <div className="modal-genres">Genres: {genres.map((genre) => genre.name).join(', ')}</div>
                            <div className="modal-release-date">Release Date: {formatReleaseDate(release_date)}</div>
                        </div>
                        <div className="modal-vote">
                            <span className="vote-average">Vote Average: {vote_average}</span>
                            <span className="vote-count">Vote Count: {vote_count}</span>
                        </div>
                        {videos.results && videos.results.length > 0 && (
                            <div className="modal-video">
                                <iframe
                                    title="Trailer"
                                    width="560"
                                    height="315"
                                    src={generateVideoUrl(videos.results[0].key)}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* <CastSlider cast={cast} /> */}
        </Modal>
    );
};

export default InfoModal;

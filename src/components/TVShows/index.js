import React, { useEffect, useState } from 'react';
import { fetchShowDetails } from '../../services/apiHandler';
import '../Movies/Movies.css';
import { useNavigate } from 'react-router';
import SliderComponent from '../Slider/index';

const TVShows = () => {
    const navigate = useNavigate();
    const capitalizeFirstLetter = (string) => {
        return string
            .split('_')
            .map((word) =>
                word
                    .split(' ')
                    .map((innerWord) => innerWord.charAt(0).toUpperCase() + innerWord.slice(1))
                    .join(' ')
            )
            .join(' ');
    };

    const [showByType, setShowByType] = useState({});
    const [loading, setLoading] = useState(true);

    // Define an array of movie types
    const showTypes = ['popular', 'top_rated'];
    useEffect(() => {
        const fetchDataForTypes = async () => {
            const dataByType = {};

            for (const type of showTypes) {
                try {
                    const data = await fetchShowDetails(type);
                    dataByType[type] = data.results;
                } catch (error) {
                    console.error(`Error fetching data for ${type}:`, error);
                }
            }

            setShowByType(dataByType);
            setLoading(false);
        };

        if (showTypes.some((type) => !showByType[type])) {
            fetchDataForTypes();
        }
    }, [showByType]);
    if (loading) {
        return <p>Loading...</p>;
    }
    const handleTVShowClick = () => {
        navigate('/tvshows');
    };

    return (
        <div className="card-container">
            {showTypes.map((type) => (
                <div key={type}>
                    <h2>
                        {capitalizeFirstLetter(type)} Shows{' '}
                        <p className="explore-tag" onClick={handleTVShowClick}>
                            Explore &rarr;
                        </p>
                    </h2>

                    <SliderComponent movies={showByType[type]} />
                </div>
            ))}
        </div>
    );
};

export default TVShows;

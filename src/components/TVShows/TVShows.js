import React, { useEffect, useState } from 'react';
import { fetchShowDetails } from '../../services/apiHandler';
import '../Movies/Movies.css';
import SwiperComponent from '../Slider/Slider';

const TVShows = () => {
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

        fetchDataForTypes();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="card-container">
            {showTypes.map((type) => (
                <div key={type}>
                    <h2>{capitalizeFirstLetter(type)} Shows</h2>
                    <SwiperComponent movies={showByType[type]} />
                </div>
            ))}
        </div>
    );
};

export default TVShows;

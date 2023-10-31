import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/apiHandler';
import './Movies.css';
import SliderComponent from '../Slider';

// Define an array of movie types outside the component
const movieTypes = ['popular', 'top_rated'];

const Movies = () => {
    const [moviesByType, setMoviesByType] = useState({});
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchDataForTypes = async () => {
            const dataByType = {};

            for (const type of movieTypes) {
                try {
                    const data = await fetchMovieDetails(type);
                    dataByType[type] = data.results;
                } catch (error) {
                    console.error(`Error fetching data for ${type}:`, error);
                }
            }

            setMoviesByType(dataByType);
            setLoading(false);
        };

        fetchDataForTypes();
    }, []); // Empty dependency array to run once when the component mounts

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="card-container">
            {movieTypes.map((type) => (
                <div key={type}>
                    <h2>{capitalizeFirstLetter(type)} Movies</h2>
                    <SliderComponent movies={moviesByType[type]} />
                </div>
            ))}
        </div>
    );
};

export default Movies;

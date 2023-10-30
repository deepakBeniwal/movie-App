import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const baseURL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
    baseURL: baseURL,
    params: {
        api_key: apiKey
    }
});

export const fetchMovieDetails = async (movieType) => {
    try {
        const response = await api.get(`/movie/${movieType}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchShowDetails = async (showType) => {
    try {
        const response = await api.get(`/tv/${showType}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

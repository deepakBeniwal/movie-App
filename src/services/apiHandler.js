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


export const fetchMovieChanges = async (startDate, endDate) => {
    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/changes?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const fetchMovieGenres = async () => {
    try {
        const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};
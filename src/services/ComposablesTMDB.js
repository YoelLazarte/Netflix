import { ref } from 'vue';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export function useTMDB() {
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async (endpoint, limit = 15) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`${BASE_URL}${endpoint}?language=es-ES&page=1&api_key=${API_KEY}`);
      
      if(!response.ok){
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json();
      console.log('datos de la api:👌', data.results)
      return data.results.slice(0, limit);
    } catch (error) {
      error.value = error.message;
      console.error('Error fetching data:', error)
      return []
    }finally{
      loading.value = false;
    }

  }

  // Metodos especificos para cada tipo de contenido
  const getNowPlayingMovies = (limit) => fetchData('/movie/now_playing', limit);
  const getPopularMovies = (limit) => fetchData('/movie/popular', limit);
  const getTopRatedMovies = (limit) => fetchData('/movie/top_rated', limit);
  const getUpcomingMovies  = (limit) => fetchData('/movie/upcoming', limit); 
  const getTrendingMovies = (timeWindow = 'day', limit) =>
    fetchData(`/trending/movie/${timeWindow}`, limit);

  // Tv shows
  const getTrendingTVShows = (timeWindow = 'day', limit) =>
    fetchData(`/trending/tv/${timeWindow}`, limit);
  const getPopularTV = (limit) => fetchData('/tv/popular', limit);
  const getTopRatedTV = (limit) => fetchData('/tv/top_rated', limit);
  const getOnAirTVShows  = (limit) => fetchData('/tv/on_the_air', limit);
  const getAiringTodayTVShows   = (limit) => fetchData('/tv/airing_today', limit);

  // metodo generico para endpoints personalizados
  const getCustomEndpoint = (endpoint, limit) => fetchData(endpoint, limit);

  return {
    // loading,
    // error,

    // Movies
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getTrendingMovies,
    // Tv shows
    getTrendingTVShows,
    getPopularTV,
    getTopRatedTV,
    getOnAirTVShows,
    getAiringTodayTVShows,
    // Custom
    getCustomEndpoint,
  }
}  


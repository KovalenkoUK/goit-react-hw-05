import axios from "axios";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWEyMmE5NDRjMmMwOWY1MmUwZGY1MDhiYWJiMjI2MSIsIm5iZiI6MTczODUyNDAyNS44ODYwMDAyLCJzdWIiOiI2NzlmYzU3OTgwMDgyOTg2YzhjYjdiZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.a9v3JTSMtOwhWssbLbutI3e6MGdHnonLVMIe7vb_zaA";
const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
});

export async function fetchTrendingMovies() {
    const response = await axiosInstance.get("/trending/movie/day");
    return response.data.results;
}

export async function searchMovies(query) {
    const response = await axiosInstance.get("/search/movie", {
        params: { query },
    });
    return response.data.results;
}

export async function fetchMovieDetails(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
}

export async function fetchMovieCast(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data.cast;
}

export async function fetchMovieReviews(movieId) {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
    return response.data.results;
}


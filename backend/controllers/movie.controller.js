import { fecthFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    const trendingMovies = await fecthFromTMDB(url);
    // randomly pick one trending movie
    const randomMovie =
      trendingMovies.results[
        Math.floor(Math.random() * trendingMovies.results?.length)
      ];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.log("Error in movie.controller getTrendingMovie" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getMovieTrailers(req, res) {
  try {
    //extract the id from request params
    const { id } = req.params;

    //make a request to TMDB to get trailers for the movie
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const movieTrailers = await fecthFromTMDB(url);

    res.json({ success: true, trailers: movieTrailers.results });
  } catch (error) {
    console.log("Error in movie.controller getMovieTrailers" + error.message);
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getMovieDetails(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const movieDetails = await fecthFromTMDB(url);
    res.status(200).json({ success: true, content: movieDetails });
  } catch (error) {
    console.log("Error in movie.controller getMovieDetails" + error.message);
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getSimilarMovies(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
    const similarMovies = await fecthFromTMDB(url);
    res.json({ success: true, similar: similarMovies.results });
  } catch (error) {
    console.log("Error in movie.controller getSimilarMovies" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getMovieByCategory(req, res) {
  try {
    const { category } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
    const moviesByCategory = await fecthFromTMDB(url);
    res.status(200).json({ success: true, content: moviesByCategory.results });
  } catch (error) {
    console.log("Error in movie.controller getMovieByCategory" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

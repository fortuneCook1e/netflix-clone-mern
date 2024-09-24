import { fecthFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
  try {
    const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
    const trendingTv = await fecthFromTMDB(url);
    // randomly pick one trending Tv
    const randomTv =
      trendingTv.results[
        Math.floor(Math.random() * trendingTv.results?.length)
      ];

    res.json({ success: true, content: randomTv });
  } catch (error) {
    console.log("Error in Tv.controller getTrendingTv" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getTvTrailers(req, res) {
  try {
    //extract the id from request params
    const { id } = req.params;

    //make a request to TMDB to get trailers for the Tv
    const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
    const TvTrailers = await fecthFromTMDB(url);

    res.json({ success: true, trailers: TvTrailers.results });
  } catch (error) {
    console.log("Error in Tv.controller getTvTrailers" + error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ success: false, message: "Tv not found" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getTvDetails(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
    const TvDetails = await fecthFromTMDB(url);
    res.status(200).json({ success: true, content: TvDetails });
  } catch (error) {
    console.log("Error in Tv.controller getTvDetails" + error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ success: false, message: "Tv not found" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getSimilarTv(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;
    const similarTv = await fecthFromTMDB(url);
    res.json({ success: true, similar: similarTv.results });
  } catch (error) {
    console.log("Error in Tv.controller getSimilarTv" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getTvByCategory(req, res) {
  try {
    const { category } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`;
    const TvByCategory = await fecthFromTMDB(url);
    res.status(200).json({ success: true, content: TvByCategory.results });
  } catch (error) {
    console.log("Error in movie.controller getSimilarTv" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

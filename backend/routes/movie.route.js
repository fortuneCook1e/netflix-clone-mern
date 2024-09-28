import express from "express";
import {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMovieByCategory,
} from "../controllers/movie.controller.js";

const router = express.Router();

// controller
router.get("/trending", getTrendingMovie); // we'll only return 1 trending movie randomly
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similars", getSimilarMovies);
router.get("/:category", getMovieByCategory);

export default router;

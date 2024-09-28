import express from "express";
import {
  getTrendingTv,
  getTvTrailers,
  getTvDetails,
  getSimilarTv,
  getTvByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTv); // we'll only return 1 trending movie randomly
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similars", getSimilarTv);
router.get("/:category", getTvByCategory);

export default router;

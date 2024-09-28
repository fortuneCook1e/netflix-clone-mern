import { Info, Play } from "lucide-react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  ORIGINAL_IMG_BASE_URL,
  MOVIE_CATEGORIES,
  TV_CATEGORIES,
} from "../../utils/constants.js";
import { useContentStore } from "../../store/content.store.js";
import MovieSlider from "../../components/MovieSlider.jsx";
import { useState } from "react";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  console.log("trending content:", trendingContent);

  const { contentType } = useContentStore();

  // show loading state while large image is not loaded
  const [imgLoading, setImageLoading] = useState(true);

  // show loading state while trending content is not loaded
  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  }

  return (
    <>
      <div className="relative h-screen text-white ">
        <Navbar />
        {/* show loading state while image is loading */}
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="Hero img"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => setImageLoading(false)}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          {/* make the gradient on the top of the Hero section */}
          <div
            className="bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10"
          />

          {/* some details of the movie */}
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adults ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">{trendingContent?.overview}</p>
          </div>

          {/* 'play' button and 'more info' button */}
          <div className="flex mt-8">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>

            <Link className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center">
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* movie slider */}
      <div className="flex flex-col gap-10 bg-black py-10">
        {/* show slider of movie of tv category depends on current state */}
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((elem) => (
              <MovieSlider key={elem} category={elem} />
            ))
          : TV_CATEGORIES.map((elem) => (
              <MovieSlider key={elem} category={elem} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;

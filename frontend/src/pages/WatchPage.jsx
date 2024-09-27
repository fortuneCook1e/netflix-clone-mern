import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content.store.js";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import {
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../utils/constants.js";
import { formatReleaseDate } from "../utils/dateFunction.js";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams(); // extract id from URI
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const { contentType } = useContentStore();

  const [similarContent, setSimilarContent] = useState([]);

  // arrow on slider
  const [showArrows, setShowArrows] = useState(false);
  // function for arrow on slider
  const sliderRef = useRef(null);
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  //use effect to get the trailers
  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    fetchTrailers();
  }, [contentType, id]);

  // get similar content
  useEffect(() => {
    const fetchSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similars`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    fetchSimilarContent();
  }, [contentType, id]);

  // get content details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [contentType, id]);
  console.log("trailers: ", trailers);
  console.log("similarContent: ", similarContent);

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };
  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  // handle content not found
  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}
          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>

        {/* movie details */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* similar movie */}
        {similarContent.length > 0 && (
          <div
            className="bg-black text-white relative px-5 md:px-20"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
          >
            <h2 className="mb-4 text-2xl font-bold">Similar</h2>

            <div
              className="flex space-x-4 overflow-x-scroll scrollbar-hide"
              ref={sliderRef}
            >
              {similarContent.map((item) => (
                <Link
                  to={`/watch/${item.id}`}
                  className="min-w-[250px] relative group"
                  key={item.id}
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={SMALL_IMG_BASE_URL + item.backdrop_path}
                      alt="Movie image"
                      className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                    />
                  </div>
                  <p className="mt-2 text-center">{item.title || item.name}</p>
                </Link>
              ))}
            </div>

            {showArrows && (
              <>
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                  size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                  onClick={scrollLeft}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                  size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                  onClick={scrollRight}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;

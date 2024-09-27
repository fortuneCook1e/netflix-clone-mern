import { useState } from "react";
import Navbar from "../components/Navbar";
import { useContentStore } from "../store/content.store";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants.js";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found. Make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred while searching");
      }
    }
  };

  console.log("Search results:", results);
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* tab buttons */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => {
              setActiveTab("movie");
              setContentType("movie");
              setResults([]);
              setSearchTerm("");
            }}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => {
              setActiveTab("tv");
              setContentType("tv");
              setResults([]);
              setSearchTerm("");
            }}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => {
              setActiveTab("person");
              setResults([]);
              setSearchTerm("");
            }}
          >
            Actors
          </button>
        </div>

        {/* search input */}
        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder={`Search for ${activeTab}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {/* show the results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4">
          {results.map((item) => {
            if (!item.poster_path && !item.profile_path) return null;
            return (
              <div key={item.id} className="bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <Link className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + item.profile_path}
                      alt={item.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{item.name}</h2>
                  </Link>
                ) : (
                  <Link to={"/watch/" + item.id}>
                    <img
                      src={ORIGINAL_IMG_BASE_URL + item.poster_path}
                      alt={item.name || item.title}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {item.name || item.title}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

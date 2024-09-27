import { User } from "../models/user.model.js";
import { fecthFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  try {
    const { query } = req.params;
    const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;

    const data = await fecthFromTMDB(url);

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    // Update user's search history
    await User.findByIdAndUpdate(req.user._id, {
      // we're able to access the user from the req. because we already set it in protectRoute.js
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in search.controller searchPerson:" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function searchMovie(req, res) {
  try {
    const { query } = req.params;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    const data = await fecthFromTMDB(url);
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    // Update user's search history
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in search.controller searchMovie:" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function searchTv(req, res) {
  try {
    const { query } = req.params;
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;

    const data = await fecthFromTMDB(url);

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    // Update user's search history
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in search.controller searchTv:" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in search.controller getSearchHistory:" + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  try {
    let { createdAt } = req.params; // the id from req is string but the id in databse is integer
    createdAt = new Date(createdAt);

    //id = parseInt(id); // convert this id to integer so that we can compare it with the one in database
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { createdAt: createdAt },
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log(
      "Error in search.controller removeItemFromSearchHistory:" + error.message
    );
    res.status(500).json({ success: false, message: "Server error" });
  }
}

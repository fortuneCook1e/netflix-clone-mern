import { useEffect, useState } from "react";
import { useContentStore } from "../store/content.store.js";
import axios from "axios";

// Why are we not putting this in the content.store.js file?
// --> because the content.store.js is all about maintaining the global state 'contentType'
// --> useGetTrendingContent is not responsible for that

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content);
      console.log("Trending content fetched", res.data.content);
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};
export default useGetTrendingContent;

import { useState, useEffect } from "react";
import BlogEntry from "./BlogEntry";
import { fetchData } from "./api";

export default function Blog({ setCurrentPage }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const url = "https://djangogym.pythonanywhere.com/blog/all";

  useEffect(() => {
    fetchData(
      url,
      setItems,
      setIsLoaded,
      setError
    );
  }, []);

  useEffect(() => {
    setCurrentPage("Blog");
  }, [setCurrentPage]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {items.map((i) => (
          <BlogEntry item={i} />
        ))}
      </>
    );
  }
}

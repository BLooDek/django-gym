import {useState, useEffect }from "react";
import BlogEntry from "./BlogEntry";

export default function Blog({setCurrentPage}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost/blog/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(()=>{
    setCurrentPage('Blog');
  }, [setCurrentPage])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
      //"title": "Nowy post", "id": 7, "author": "admin", "body": "elo", "publish": "2022-03-15 21:51:50"}
    return (
      <>
      {items.map((i) => (
        <BlogEntry item={i} />
      ))}
      </>
    );
  }
}

import { useState, useEffect } from "react";
export default function useFetch(url, method, data) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };
  if (localStorage.getItem("token")) {
    headers.Authorization = `Token ${localStorage.getItem("token")}`;
  }
  useEffect(() => {
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((myData) => {
        setItems(myData);
      })
      .catch((error) => {
        setError && setError(error);

        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    setIsLoaded && setIsLoaded(true);
  }, []);
  return [items, isLoaded, error];
}

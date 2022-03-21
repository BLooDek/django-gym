//fetch data, tell component that is loaded or there was error
export function fetchData(url, setItems, setIsLoaded, setError) {
  fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        setItems(result);
        setIsLoaded(true);       
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
}

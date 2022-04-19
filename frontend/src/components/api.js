export function fetchData(url, setItems, setIsLoaded, setError) {
  fetch(url)
    .then((res) => res.json())
    .then(
      (result) => {
        setItems(result);
      },
      (error) => {
        setError(error);
      }
    );
  setIsLoaded(true);
}

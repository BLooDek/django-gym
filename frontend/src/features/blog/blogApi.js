export function blogFetcher(url, method, setData, setIsLoaded, setError, data) {
  let headers = {
    "Content-Type": "application/json",
  };
  if (localStorage.getItem("token")) {
    headers.Authorization = `Token ${localStorage.getItem("token")}`;
  }

  let options = {
    method: method,
    headers: headers,
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  fetch(url, 
    options,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((myData) => {
      setData && setData(myData);
    })
    .catch((error) => {
      setError && setError(error);

      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  setIsLoaded && setIsLoaded(true);
}

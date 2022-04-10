const calendarUrl = "http://127.0.0.1:8000/calendar/";
export const url = {
  getAll: calendarUrl + "all/",
  edit: calendarUrl + "update/",
  add: calendarUrl + "add/",
  trainers: calendarUrl + "trainers/",
  signOut: calendarUrl + "signout/",
  signUp: calendarUrl + "signup/",
  delete: calendarUrl + "delete/",
};

//TODO - add error handling
export function calendarDataFetch(
  url,
  method,
  setData,
  setIsLoaded,
  setError,
  data
) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (localStorage.getItem("token")) {
    headers.Authorization = `Token ${localStorage.getItem("token")}`;
  }
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
      setData(myData);
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

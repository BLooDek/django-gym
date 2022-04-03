import { setEditDialog, setAddDialog } from "./calendarState";
const calendarUrl = "http://127.0.0.1:8000/calendar/";
const url = {
  getAll: calendarUrl + "all/",
  edit: calendarUrl + "update/",
  add: calendarUrl + "add/",
  trainers: calendarUrl + "trainers/",
};

export function fetchData(setItems, setIsLoaded, setError) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (localStorage.getItem("token")) {
    headers.Authorization = `Token ${localStorage.getItem("token")}`;
  }
  fetch(url.getAll, {
    method: "GET",
    headers: headers,
  })
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
export function editEvent(event, setItems, setIsLoaded, setError, dispatch) {
  fetch(url.edit, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    method: "PATCH",
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        setItems(result);
        setIsLoaded(true);
        dispatch(setEditDialog(false));
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
}

export function addEvent(event, setItems, setIsLoaded, setError, dispatch) {
  fetch(url.add, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        setItems(result);
        setIsLoaded(true);
        dispatch(setAddDialog(false));
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
}

export function fetchTrainers(setTrainers) {
  fetch(url.trainers)
    .then((data) => data.json())
    .then((data) => setTrainers(data));
}

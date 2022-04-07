import { setEditDialog, setAddDialog, setDetailsDialog } from "./calendarState";
import { useState, useEffect } from "react";

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

//TODO delete
function fetcher(url, method, setData, setIsLoaded, setError, data) {
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
      if (setError) {
        setError(error);
      }

      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  if (setIsLoaded) {
    setIsLoaded(true);
  }
}

export function useFetch(url, method, data) {
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
  }, [data]);
  return [items, isLoaded, error, data];
}

export function fetchData(setItems, setIsLoaded, setError) {
  fetcher(url.getAll, "GET", setItems, setIsLoaded, setError);
}

export function editEvent(event, setItems, setIsLoaded, setError, dispatch) {
  fetcher(url.edit, "PATCH", setItems, setIsLoaded, setError, event);
  dispatch(setEditDialog(false));
}

export function addEvent(event, setItems, setIsLoaded, setError, dispatch) {
  fetcher(url.add, "POST", setItems, setIsLoaded, setError, event);
  dispatch(setAddDialog(false));
}

export function fetchTrainers(setTrainers) {
  fetcher(url.trainers, "GET", setTrainers);
}

export function signUpForClass(event, setItems, dispatch) {
  fetcher(url.signUp, "POST", setItems, null, null, event);
  dispatch(setDetailsDialog(false));
}
export function SignOutFromClass(event, setItems, dispatch) {
  fetcher(url.signOut, "POST", setItems, null, null, event);
  dispatch(setDetailsDialog(false));
}

export function deleteEvent(event, setItems, dispatch) {
  fetcher(url.delete, "DELETE", setItems, null, null, event);
  dispatch(setDetailsDialog(false));
}

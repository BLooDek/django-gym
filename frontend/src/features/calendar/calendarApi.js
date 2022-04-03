import {setEditDialog} from "./calendarState"
const calendarUrl = "http://127.0.0.1:8000/calendar/";
const url = {
  getAll: calendarUrl + "all/",
  edit: calendarUrl + "update/"

};

export function fetchData(setItems, setIsLoaded, setError) {
  const headers = {
    "Content-Type": "application/json",
  }
  if(localStorage.getItem('token')){
    headers.Authorization = `Token ${localStorage.getItem('token')}`;
  }
  fetch(url.getAll, {
    method: "GET",
    headers: headers
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
export function editEvent(event, setItems, setIsLoaded, setError, dispatch){
  fetch(url.edit, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      method: "PATCH",
      body: JSON.stringify(event)
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
          dispatch(setEditDialog(false))
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
}
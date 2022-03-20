import React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import '../App.css'



export default function Calendar({setCurrentPage}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost/calendar/all/")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
          
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
    setCurrentPage('Calendar');
  }, [setCurrentPage])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    //"title": "Nowy post", "id": 7, "author": "admin", "body": "elo", "publish": "2022-03-15 21:51:50"}
    return (
      <div className="mx-10 my-10" >
        <FullCalendar
          events={items}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          firstDay={1}
          locale="en"
          weekTextLong={true}
          allDaySlot={false}
          slotMaxTime="21:00:00"
          slotMinTime="07:00:00"
          contentHeight='auto'
          eventBackgroundColor="#6415ff"
        />
        
      </div>
    );
  }
}

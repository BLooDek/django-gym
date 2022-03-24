import React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { fetchData } from "./api";
import "../App.css";

export default function Calendar({ setCurrentPage }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const url = "http://127.0.0.1:8000/calendar/all/";

  useEffect(() => {
    fetchData(url, setItems, setIsLoaded, setError);
  }, []);

  useEffect(() => {
    setCurrentPage("Calendar");
  }, [setCurrentPage]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="mx-10 my-14">
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
          contentHeight="auto"
          eventBackgroundColor="#6415ff"
        />
      </div>
    );
  }
}

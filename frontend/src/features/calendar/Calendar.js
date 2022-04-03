import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchData, editEvent } from "./calendarApi";
import "../../App.css";

export default function Calendar({ setCurrentPage }) {
  const isLoggedIn = useSelector((state) => state.isLogged.value);
  const isAdmin = useSelector(
    (state) => state.isLogged.credentials?.["is_staff"]
  );
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData(setItems, setIsLoaded, setError);
  }, [isLoggedIn]);

  useEffect(() => {
    setCurrentPage("Calendar");
  }, [setCurrentPage]);

  function handleGestures(eventDragInfo) {
    editEvent(
      eventDragInfo.event,
      setItems,
      setIsLoaded,
      setError
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="mx-10 my-14">
        <FullCalendar
          events={items}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          firstDay={1}
          locale="en"
          weekTextLong={true}
          allDaySlot={false}
          slotMaxTime="21:00:00"
          slotMinTime="07:00:00"
          contentHeight="auto"
          eventBackgroundColor="#6415ff"
          editable={isAdmin} //only admin can resize/drag&drop
          eventDrop={handleGestures}
          eventResize={handleGestures}
        />
      </div>
    );
  }
}

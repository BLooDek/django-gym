import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { fetchData, editEvent, addEvent } from "./calendarApi";
import { setAddDialog, setDetailsDialog } from "./calendarState";
import DetailsEventDialog from "./DetailsEventDialog";
import AddEventDialog from "./AddEventDialog";
import EditEventDialog from "./EditEventDialog";
import "../../App.css";

export default function Calendar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLogged.value);
  const isAdmin = useSelector(
    (state) => state.isLogged.credentials?.["is_staff"]
  );
  const [currentEvent, setCurrentEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState();

  useEffect(() => {
    fetchData(setItems, setIsLoaded, setError);
  }, [isLoggedIn]);

  useEffect(() => {
    setCurrentPage("Calendar");
  }, [setCurrentPage]);

  function handleGestures(eventDragInfo) {
    editEvent(eventDragInfo.event, setItems, setIsLoaded, setError, dispatch);
  }
  function handleEdit(data) {
    editEvent(data, setItems, setIsLoaded, setError, dispatch);
  }

  function handleDateSelect(selectInfo) {
    setCurrentEvent(selectInfo);
    dispatch(setAddDialog(true));
  }
  function handleAdd(data) {
    addEvent(data, setItems, setIsLoaded, setError, dispatch);
  }
  function handleClick(eventClickInfo) {
    setCurrentEvent(eventClickInfo.event);
    dispatch(setDetailsDialog(true));
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="mx-10 my-14">
        {currentEvent && (
          <DetailsEventDialog setItems={setItems} eventInfo={currentEvent} />
        )}
        {currentEvent && (
          <AddEventDialog handleAdd={handleAdd} eventInfo={currentEvent} />
        )}
        {currentEvent && <EditEventDialog eventInfo={currentEvent} handleEdit={handleEdit}/>}
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
          selectable={isAdmin} // only admin can select time
          select={handleDateSelect}
          eventClick={handleClick}
        />
      </div>
    );
  }
}

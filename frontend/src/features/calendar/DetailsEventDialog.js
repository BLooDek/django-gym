import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDetailsDialog, setEditDialog } from "./calendarState";
import {
  calendarDataFetch,
  url,
} from "./calendarApi";

export default function DetailsEventDialog({ eventInfo, setItems }) {
  const dispatch = useDispatch();
  const event = JSON.parse(JSON.stringify(eventInfo));
  const isLoggedIn = useSelector((state) => state.isLogged.value);
  const isOpen = useSelector((state) => state.calendarDialog.detailsDialog);
  const isAdmin = useSelector(
    (state) => state.isLogged?.credentials?.["is_staff"]
  );
  function handleSignUp() {
    calendarDataFetch(url.signUp, "POST", setItems, null, null, event);
    dispatch(setDetailsDialog(false));
  }
  function handleSignOut() {
    calendarDataFetch(url.signOut, "POST", setItems, null, null, event);
    dispatch(setDetailsDialog(false));
  }
  function handleDelete() {
    calendarDataFetch(url.delete, "DELETE", setItems, null, null, event);
    dispatch(setDetailsDialog(false));
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className=" fixed inset-0 z-10 overflow-y-auto"
          onClose={() => dispatch(setDetailsDialog(false))}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-2 border-black shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {event?.title}
                </Dialog.Title>
                <div>
                  <span>{new Date(event?.start).toLocaleTimeString()} </span>
                  {" - "}
                  <span>{new Date(event?.end).toLocaleTimeString()} </span>
                </div>
                {event?.extendedProps?.trainer && (
                  <p className="text-xs ">
                    Trainer: {event?.extendedProps?.trainer}
                  </p>
                )}
                {event?.extendedProps?.description && (
                  <p className="text-xl py-2">
                    {event?.extendedProps?.description}
                  </p>
                )}
                Slots: {event?.extendedProps?.members.length} /{" "}
                {event?.extendedProps?.max_members}
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b  lg:w-1/5"></span>

                  <span className="w-1/5 border-b lg:w-1/5"></span>
                </div>
                <div className="flex flex-row">
                  <button
                    onClick={
                      event?.extendedProps?.isParticipant
                        ? handleSignOut
                        : handleSignUp
                    }
                    disabled={
                      !isLoggedIn ||
                      (!event?.extendedProps?.isParticipant &&
                        event?.extendedProps?.members.length >=
                          event?.extendedProps?.max_members)
                    }
                    className="btn-primary"
                  >
                    {event?.extendedProps?.isParticipant
                      ? "Sign out"
                      : "Sign in"}
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        dispatch(setDetailsDialog(false));
                        dispatch(setEditDialog(true));
                      }}
                      className="btn-primary bg-yellow-300"
                    >
                      Edit
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={handleDelete}
                      className="btn-primary bg-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

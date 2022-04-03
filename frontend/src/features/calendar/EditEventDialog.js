import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import EditEventForm from "./EditEventForm";
import { useSelector, useDispatch } from "react-redux";
import { setEditDialog } from "./calendarState";

export default function EditEventDialog({ eventInfo, handleEdit }) {
  const dispatch = useDispatch();
  const event = JSON.parse(JSON.stringify(eventInfo));
  const isOpen = useSelector((state) => state.calendarDialog.editDialog);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className=" fixed inset-0 z-10 overflow-y-auto"
          onClose={() => dispatch(setEditDialog(false))}
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
              <div className=" inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-2 border-black shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit event
                </Dialog.Title>
                <EditEventForm event={event} handleEdit={handleEdit} />
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b  lg:w-1/5"></span>

                  <span className="w-1/5 border-b  lg:w-1/5"></span>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

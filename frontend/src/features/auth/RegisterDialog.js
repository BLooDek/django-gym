import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { setLoginDialog, setRegisterDialog } from "./authDialogState";

export default function RegisterDialog() {
  const isOpen = useSelector((state) => state.authDialog.registerDialog);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className=" fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch(setRegisterDialog(false))}
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
            <div className="shadow-md dark:bg-gray-800 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-2 border-black shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Sign up here
              </Dialog.Title>
              {error && <h2 className="text-red-700">{"⚠ "} {error}</h2>}
              {/* <Register setError={setError} dispatch={dispatch}/> */}
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
              </div>

              <p className="mt-8 text-xs font-light text-center text-gray-400">
                {" "}
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                  onClick={() => {
                    dispatch(setRegisterDialog(false));
                    dispatch(setLoginDialog(true));
                  }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

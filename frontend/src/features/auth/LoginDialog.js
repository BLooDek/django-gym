import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDialog, setRegisterDialog } from "./authDialogState";

export default function LoginDialog() {
  const isOpen = useSelector((state) => state.authDialog.loginDialog);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loginWithPassword, setLoginWithPassword] = useState(true);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className=" fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch(setLoginDialog(false))}
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
            <div className="shadow-md  inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white border-2 border-black shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Sing in
              </Dialog.Title>
              {error && (
                <h2 className="text-red-700">
                  {"⚠ "}
                  {error}
                </h2>
              )}
              {/* {loginWithPassword && (
                <LoginPassword setError={setError} dispatch={dispatch} />
              )}
              {!loginWithPassword && (
                <LoginPassless setError={setError} dispatch={dispatch} />
              )} */}

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b  lg:w-1/5"></span>

                <a
                  href="#"
                  className="text-xs text-center text-gray-500 uppercase hover:underline"
                >
                  OR
                </a>

                <span className="w-1/5 border-b  lg:w-1/5"></span>
              </div>

              {loginWithPassword && (
                <div className="flex items-center mt-6 -mx-2">
                  <button
                    onClick={() => setLoginWithPassword(false)}
                    type="button"
                    className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-200 transform bg-purple-main rounded-md hover:bg-purple-second focus:bg-purple-second focus:outline-none"
                  >
                    <span className="hidden mx-2 sm:inline">
                      Sign in with magic code
                    </span>
                  </button>
                </div>
              )}
              {!loginWithPassword && (
                <div className="flex items-center mt-6 -mx-2">
                  <button
                    onClick={() => setLoginWithPassword(true)}
                    type="button"
                    className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-200 transform bg-purple-main rounded-md hover:bg-purple-second focus:bg-purple-second focus:outline-none"
                  >
                    <span className="hidden mx-2 sm:inline">
                      Sign in with email & password
                    </span>
                  </button>
                </div>
              )}

              <p className="mt-8 text-xs font-light text-center text-gray-600">
                {" "}
                Don't have an account?{" "}
                <a
                  onClick={() => {
                    dispatch(setLoginDialog(false));
                    dispatch(setRegisterDialog(true));
                  }}
                  className="font-medium text-gray-700 hover:underline"
                >
                  Create One
                </a>
              </p>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

import { useSelector, useDispatch } from "react-redux";
import { switchState } from "./loginForm";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { fetchCredentials } from "./authApi";

export default function LoginDialog() {
  const isOpen = useSelector((state) => state.showLoginForm.value);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [key, setKey] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    fetch("http://127.0.0.1:8000/api/v1/users/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.key) {
            console.log("here");
            localStorage.clear();
            localStorage.setItem("token", data.key);
            setError(null);
            fetchCredentials(data.key, setError, dispatch)
          } else {
            setError(data["non_field_errors"][0]);
            //   console.log(data['non_field_errors'][0])
          }
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  };

  

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch(switchState())}
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
                Sing in
              </Dialog.Title>
              {error && <h2>{error}</h2>}
              <form onSubmit={onSubmit} className="mt-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-800 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm text-gray-800 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      Forget Password?
                    </a>
                  </div>

                  <input
                    name="password"
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-rich-black rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 ">
                    Login
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                <a
                  href="#"
                  className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  OR
                </a>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
              </div>

              <div className="flex items-center mt-6 -mx-2">
                <button
                  type="button"
                  className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-200 transform bg-purple-main rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                >
                  <span className="hidden mx-2 sm:inline">
                    Sign in with magic code
                  </span>
                </button>
              </div>

              <p className="mt-8 text-xs font-light text-center text-gray-400">
                {" "}
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
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

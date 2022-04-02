import { Menu, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDialog } from "../features/auth/authDialogState";
import { Fragment } from "react";
import { logoutUser } from "../features/auth/authApi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserMenu() {
  const isLoggedIn = useSelector((state) => state.isLogged.value);
  const dispatch = useDispatch();

  const openLoginDialog = () => {
    dispatch(setLoginDialog(true));
  };
  const signOut = () => {
    logoutUser(dispatch);
  };
  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src={require("../profile.png")}
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-0 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-40 origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg py-1 bg-gray-200 ring-1 ring-black ring-opacity-100 focus:outline-none">
            {isLoggedIn ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-800"
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                    onClick={signOut}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={openLoginDialog}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Sign in
                    </a>
                  )}
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

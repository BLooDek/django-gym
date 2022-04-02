import { Disclosure } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useSelector} from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ currentPage, setCurrentPage }) {
  const isLoggedIn = useSelector((state) => state.isLogged.value);
  const email = useSelector(
    (state) => state.isLogged.credentials?.["email"]
  );

  const navigation = [
    { name: "Blog", href: "/django-gym", current: currentPage === "Blog" },
    {
      name: "Calendar",
      href: "/django-gym/calendar",
      current: currentPage === "Calendar",
    },
    {
      name: "Price List",
      href: "/django-gym/pricelist",
      current: currentPage === "Price List",
    },
    {
      name: "Contact",
      href: "/django-gym/contact",
      current: currentPage === "Contact",
    },
  ];

  return (
    <Disclosure as="nav" className="bg-rich-black">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/django-gym" onClick={() => setCurrentPage("Blog")}>
                  <div className="flex-shrink-0 flex items-center">
                    <p className="font-bold text-white hover:text-purple-main">
                      DjangoGym
                    </p>
                  </div>
                </Link>

                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        className={classNames(
                          currentPage === item.name
                            ? "bg-gray-900 text-purple-main"
                            : "text-gray-300 hover:bg-pewter-blue hover:text-purple-main",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={
                          currentPage === item.name ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isLoggedIn ? <span className="text-white text-lg">Hello {email}</span> : null}
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                  
                <UserMenu />
              </div>
            </div>
          </div>
          

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "./api";


export default function PriceList({ setCurrentPage }) {
  const isLoggedIn = useSelector((state) => state.isLogged.value);
  const isAdmin = useSelector(
    (state) => state.isLogged.credentials?.["is_staff"]
  );
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [switchState, setSwitchState] = useState(true);
  const url = "";

  useEffect(() => {
    setCurrentPage("Price List");
  });

  useEffect(() => {
    fetchData(
      url,
      setItems,
      setIsLoaded,
      setError
    );
  }, [isLoggedIn]);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
<>
{items &&   <div>
         
        <section className="px-6 xl:px-0">
          <div className="mt-10 mx-auto ">
            <div className="flex flex-col lg:items-center justify-center w-full">
              <h1 className="font-semibold text-gray-800 text-3xl md:text-4xl">
                The Right Plan for your health
              </h1>
              <p className="mt-2.5 lg:w-1/2 lg:text-center text-2xl">
                Choose plan to fit your needs
              </p>
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="pt-14">
                <div className="container mx-auto">
                  <div className="xl:w-4/5 w-11/12 mx-auto mb-28">
                    <div
                      className="flex justify-center items-center"
                      role="button"
                    >
                      <p className="mr-3 text-lg text-gray-600 font-bold">
                        Bill Monthly
                      </p>
                      <div className="cursor-pointer w-12 h-6 rounded-full relative shadow-sm">
                        <input
                          defaultChecked
                          type="checkbox"
                          name="toggle"
                          id="toggle2"
                          onChange={() => {
                            setSwitchState(!switchState);
                            console.log(switchState);
                          }}
                          className="focus:outline-none checkbox w-4 h-4 rounded-full bg-purple-main checked:bg-purple-main  transition duration-150 ease-in-out absolute m-1 shadow-sm appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="toggle2"
                          className="toggle-label block w-12 h-6 overflow-hidden rounded-full border border-purple-mabg-purple-main cursor-pointer"
                        />
                      </div>
                      <p className="ml-3 text-lg font-normal text-gray-800">
                        Bill Anually
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-12 justify-between sm:justify-center -mx-6">
                    <div className="w-full xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 mb-4 px-6">
                      <div className="py-5 px-4 bg-white border border-gray-200shadow rounded-lg text-left">
                        <h4 className="text-2xl text-purple-mabg-purple-main font-semibold pb-8">
                          {items[0]["left"]["name"]}
                        </h4>
                        <ul className="flex flex-col mb-6">
                          {items[0]["left"]["perks"].map((i) => (
                            <li className="flex items-center mb-2.5">
                              <img
                                src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                                className="mr-4"
                                alt="check-mark"
                              />
                              <p className="text-gray-800 text-base font-normal">
                                {i}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <p className="text-base text-purple-mabg-purple-main relative pl-3">
                          <span className="font-light text-lg">$</span>
                          <span className="text-2xl font-semibold">
                            {switchState
                              ? items[0]["left"]["price"] * 12 + ".00"
                              : items[0]["left"]["price"]}
                          </span>
                          <span className="text-gray-600 font-light text-lg">
                            /{switchState ? "Year" : "Month"}
                          </span>
                        </p>
                        <button className="mt-5 w-full bg-gray-200 hover:bg-gray-300 focus:outline-none transition duration-150 ease-in-out rounded text-purple-mabg-purple-main px-8 py-3 text-base font-semibold py-3">
                          Choose
                        </button>
                      </div>
                    </div>
                    <div className="w-full xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 mb-4 px-6">
                      <div className="py-5 px-4 bg-purple-main border border-gray-200 shadow h-full rounded-lg text-left ">
                        <h4 className="text-2xl text-white font-semibold pb-8">
                          {items[0]["center"]["name"]}
                        </h4>
                        <ul className="flex flex-col mb-6">
                          {items[0]["center"]["perks"].map((i) => (
                            <li className="flex items-center mb-2.5">
                              <img
                                src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                                className="mr-4"
                                alt="check-mark"
                              />
                              <p className="text-gray-800 text-base font-normal">
                                {i}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <p className="text-base text-white relative pl-3">
                          <span className="font-light text-lg">$</span>
                          <span className="text-2xl font-semibold">
                            {switchState
                              ? items[0]["center"]["price"] * 12 + ".00"
                              : items[0]["center"]["price"]}
                          </span>
                          <span className="font-light text-lg">
                            /{switchState ? "Year" : "Month"}
                          </span>
                        </p>
                        <button className="mt-5 w-full text-purple-mabg-purple-main focus:outline-none transition duration-150 ease-in-out rounded bg-white hover:bg-gray-100 px-8 py-3 text-base font-semibold py-3">
                          Try
                        </button>
                      </div>
                    </div>
                    <div className="w-full xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 mb-4 px-6">
                      <div className="py-5 px-4 bg-white border border-gray-200shadow rounded-lg text-left">
                        <h4 className="text-2xl text-purple-mabg-purple-main font-semibold pb-8">
                          {items[0]["right"]["name"]}
                        </h4>
                        <ul className="flex flex-col mb-6">
                          {items[0]["right"]["perks"].map((i) => (
                            <li className="flex items-center mb-2.5">
                              <img
                                src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                                className="mr-4"
                                alt="check-mark"
                              />
                              <p className="text-gray-800 text-base font-normal">
                                {i}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <p className="text-base text-purple-mabg-purple-main relative pl-3">
                          <span className="font-light text-lg">$</span>
                          <span className="text-2xl font-semibold">
                            {switchState
                              ? items[0]["right"]["price"] * 12 + ".00"
                              : items[0]["right"]["price"]}
                          </span>
                          <span className="font-light text-lg">
                            {" "}
                            /{switchState ? "Year" : "Month"}
                          </span>
                        </p>
                        <button className="mt-5 w-full bg-gray-200 hover:bg-gray-300 focus:outline-none transition duration-150 ease-in-out rounded text-purple-mabg-purple-main px-8 py-3 text-base font-semibold py-3">
                          Choose
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <style
                  dangerouslySetInnerHTML={{
                    __html: "",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <style>
          {` 
          .checkbox:checked {
              right: 0;
              background-color: #6415ff;
          }
          `}
        </style>
      </div>}
      </>

    );
  }
}

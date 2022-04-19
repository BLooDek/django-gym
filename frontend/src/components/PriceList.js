import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "./api";


export default function PriceList({ setCurrentPage }) {
  const isLoggedIn = useSelector((state) => state.isLogged.value);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const [switchState, setSwitchState] = useState(true);
  

  useEffect(() => {
    setCurrentPage("Price List");
  });

  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (<p>coming soon</p>
    );
  
  }

}

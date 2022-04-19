
import { useEffect } from "react";
export default function Contact({setCurrentPage}){
    useEffect(()=>{
        setCurrentPage('Contact');
      }, [setCurrentPage])
    return(<div><p>Contact me: (something better coming soon)</p>
    <p>pawelmichalak98@gmail.com</p></div>)
}
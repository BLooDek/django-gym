
import { useEffect } from "react";
export default function Contact({setCurrentPage}){
    useEffect(()=>{
        setCurrentPage('Contact');
      }, [setCurrentPage])
    return(<div><p>kontakt:</p></div>)
}
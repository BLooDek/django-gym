import React, {useState} from "react";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import Footer4 from "./components/Footer";
import { Calendar, Blog, Contact, PriceList } from "./components/index";
import Navbar from "./components/Navbar";

function App() {
  const [currentPage, setCurrentPage] = useState("Blog");
  return (
    <Router>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <div className="min-h-[62vh] "><Routes >//
          <Route path="/" element={<Blog setCurrentPage={setCurrentPage} />} />
          <Route path="/contact" element={<Contact setCurrentPage={setCurrentPage} />} />
          <Route path="/pricelist" element={<PriceList setCurrentPage={setCurrentPage} />} />
          <Route path="/calendar" element={<Calendar setCurrentPage={setCurrentPage}/>} />
        </Routes></div>
        <Footer4/>
       
    </Router>
  );
}

export default App;
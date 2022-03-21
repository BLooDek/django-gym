import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import Footer4 from "./components/Footer";
import { Calendar, Blog, Contact, PriceList } from "./components/index";
import MyDialog from "./components/MyDialog";

import Navbar from "./components/Navbar";

function App() {
  const [currentPage, setCurrentPage] = useState("Blog");
  return (
    <>
      
      
      <Router>
      {/* <MyDialog /> */}

        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <div className="min-h-[66vh] ">
          <Routes>
            //
            <Route
              path="/django-gym"
              element={<Blog setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/django-gym/contact"
              element={<Contact setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/django-gym/pricelist"
              element={<PriceList setCurrentPage={setCurrentPage} />}
            />
            <Route
              path="/django-gym/calendar"
              element={<Calendar setCurrentPage={setCurrentPage} />}
            />
          </Routes>
        </div>
        <Footer4 />
      </Router>
    </>
  );
}

export default App;

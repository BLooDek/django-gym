import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import { Calendar, Blog, Contact, PriceList } from "./components/index";
import Navbar from "./components/Navbar";
import LoginDialog from "./features/auth/LoginDialog";
import RegisterDialog from "./features/auth/RegisterDialog";

function App() {
  const [currentPage, setCurrentPage] = useState("Blog");
  return (
    <div className="bg-purple-second">
      <Router>
        <LoginDialog />
        <RegisterDialog />
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
        <Footer />
      </Router>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Calendar, Blog, Contact, PriceList } from "./components/index";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LoginDialog from "./features/auth/LoginDialog";
import RegisterDialog from "./features/auth/RegisterDialog";
import { fetchCredentials } from "./features/auth/authApi";


function App() {
  const [currentPage, setCurrentPage] = useState("Blog");
  const dispatch = useDispatch();

  useEffect(() => {
    const key = localStorage.getItem("token");
    if (key !== null) {
      fetchCredentials(key, undefined, dispatch);
    }
  }, []);

  return (
    <div className="bg-purple-second">
      <Router>
        <LoginDialog />
        <RegisterDialog />
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <div className="min-h-[66vh] ">
          <Routes>
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

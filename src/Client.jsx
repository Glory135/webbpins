import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TopBar from "./client/components/topBar/TopBar";
import Footer from "./client/components/footer/Footer";
import Home from "./client/pages/home/Home";
import About from "./client/pages/about/About";
import Contact from "./client/pages/contact/Contact";
import NotFound from "./client/pages/404/Not_Found";

function Client({ setIsAdmin }) {
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const password = localStorage.getItem("webbpins_admin_password");
    const pass = "12345678910";
    if (password === pass) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  return (
    <>
      {admin && (
        <button
          style={{ width: "auto" }}
          onClick={() => {
            navigate("/");
            setIsAdmin(true);
          }}
        >
          Admin login
        </button>
      )}

      <div style={{ position: "sticky", top: 0, left: 0 }}>
        <TopBar />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Client;

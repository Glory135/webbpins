import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "./Admin";
import Client from "./Client";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // admin validation start
    const tok = JSON.parse(localStorage.getItem("webbpins_admin_token"));
    if (tok) {
      const decoded_token = jwt_decode(tok);
      const current_time = new Date().getTime();
      if (decoded_token.exp * 1000 < current_time) {
        localStorage.removeItem("webbpins_admin_token");
      } else {
        setIsAdmin(true);
      }
    }
    // admin validation end
  }, [isAdmin, setIsAdmin, navigate]);

  return (
    <>
      {isAdmin ? (
        <Admin setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
      ) : (
        <Client setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
      )}
    </>
  );
}

export default App;

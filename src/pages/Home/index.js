import { useNavigate } from "react-router-dom";
import useAuth from "../../components/hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
// import ProductList from "../../Product/ProductList";
// import ListTable from "../../Table/ListTable";
import Sidebar from "./Sidebar";
// import NavBar from "../../Navbar";
// import Drawer1 from "./Drawer1";
// import CustomerTableList from "../../Table/CustomerTableList";
import ViewData from "../ViewData";

function Home() {
  let navigate = useNavigate();
  const { logout, auth } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return navigate("/sign-in");

      setUser(user);
    });
  }, [auth, navigate]);

  function handleClose() {
    logout();
    navigate("/sign-in");
    localStorage.clear()
  }
  return (
    <>
{/* <NavBar/> */}
      <div
        style={{
          // backgroundImage: `url(./images/4.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div className="bgcolorsigninpage">
          {/* <Header user={user} logout={handleClose} /> */}

          <div sx={{ height: "50%", maxWidth: "50%", marginTop: "100px" }}>
            <div style={{ marginTop: "0" }}>

               <Sidebar/>
              <ViewData/>
               {/* <CustomerTableList/> */}
               {/* <Drawer1/> */}
             </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

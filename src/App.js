import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import Alert from "./components/Alert";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Testing from "./Testing";
import MyAccount from "./Table/MyAccount";
// import CustomerTableList from "./Table/CustomerTableList";
 import AddData from "./Table/AddData";
 import AdddataButton from "./Table/AdddataButton";
import ViewData from "./pages/ViewData";
 




function App() {
  
  


  return (




    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/Testing" element={<Testing/>} />
            {/* <Route path="/NavBar" element={<NavBar/>} /> */}
            <Route path="/" element={<Home />} />
          <Route path="/MyAccount" element={<MyAccount/>} />
         {/*  <Route path="/CustomerTableList" element={<CustomerTableList/>} />*/}
          <Route path="/AddData" element={<AddData/>} /> 
           <Route path="/AdddataButton" element={<AdddataButton/>} />
           <Route path="/ViewData" element={<ViewData/>} />
         
           </Routes>
        </BrowserRouter>
        <Alert />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
         
              



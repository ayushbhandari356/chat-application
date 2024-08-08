import "./App.css";
import { useAuthContext } from "./context/AuthContexts.jsx";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

import {Toaster} from "react-hot-toast"
import {Routes,Route, Navigate} from 'react-router-dom';

function App() { 

  const {authUser}=useAuthContext()

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Toaster/>
        <Routes>
          <Route path='/' element={authUser?<Home/>:<Navigate to={"/login"}/>}></Route>
          <Route path='/login' element={authUser?<Navigate to ="/"/>: <Login />}></Route>
          <Route path='/signup' element={ authUser?<Navigate to ="/"/>: <Signup />}></Route>
        </Routes>
        
        
    </div>
  );
}

export default App;

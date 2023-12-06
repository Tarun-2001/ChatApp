import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import ChatState from "./Context/Chat/ChatState";
import ChatPage from "./Components/ChatPage";

function App() {
  return (
    <div>
      <ChatState>
      {/* <Navbar></Navbar> */}
      <ChatPage></ChatPage>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </ChatState>
    </div>
  );
}

export default App;

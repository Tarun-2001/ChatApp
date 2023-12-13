import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/button";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ChatState from "./Context/Chat/ChatState";
import SignUp from "./Authentication/SignUp";

function App() {
  return (
    <div>
      
        <ChatState>
        <Routes>
          <Route exact path="/" element={<HomePage/>}></Route>
          <Route exact path="/chat" element={<ChatPage/>}></Route>
        </Routes>
        </ChatState>
    </div>
  );
}

export default App;

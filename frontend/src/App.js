import logo from './logo.svg';
import './App.css';
import { Button } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import LoginPage from './Components/LoginPage';
import SignUp from './Components/SignUp'
import Navbar from './Components/Navbar';

function App() {
  return (
    <div>
       <Navbar></Navbar>
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/signup" element={<SignUp />} />
     
    </Routes>
        </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Navbar';
import NoteState from './Context/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';


function App() {
  const [alert, setalert] = useState(null)
const showAlert = (message, type) => {
  setalert({
    msg:message,
    type: type
  })
  setTimeout(() => 
    setalert(null), 2000)

}
  return (
    <>
      <div>

        <NoteState>
          <Router>
            <Navbar showAlert = {showAlert}/>
            <Alert alert = {alert}  />
            <div className="container">
              <Routes>
                <Route exact path='/' element={<Home showAlert={showAlert} />}></Route>
                <Route exact path='/About' element={<About />}></Route>
                <Route exact path='/login' element={<Login showAlert={showAlert} />}></Route>
                <Route exact path='/signup' element={<Signup showAlert = {showAlert} />}></Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </div>
    </>
  );
}

export default App;

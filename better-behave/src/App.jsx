import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Question from './components/Question'

function App() {

  return (
    <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/question" element={<Question/>} />
          </Routes>
        </Router>
    </div>
  )
}

export default App

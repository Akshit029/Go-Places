import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Login from './Components/LoginPage/Login';
import SignUp from './Components/SignupPage/SignUp';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot' element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;

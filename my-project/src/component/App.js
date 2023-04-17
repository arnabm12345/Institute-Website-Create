import '../App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Signup from './SignUp';
import NotFound from './Page404';
import Authenticated from './Authenticated';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/authenticated" element={<Authenticated/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer/>
    </div>
  </Router>
  );
}

export default App;

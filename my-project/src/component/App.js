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
import ForgotPassword from './ForgotPassword';
import UnitCreation from './UnitCreation';
import ItemCreation from './ItemCreation';
import GroupCreation from './GroupCreation';

function App() {
 
  return (
    <Router>
      <div>
        <Navbar />
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/authenticated" element={<Authenticated />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/authenticated/unit-creation" element={<UnitCreation/>} />
      <Route path="/authenticated/item-creation" element={<ItemCreation/>} />
      <Route path="/authenticated/group-creation" element={<GroupCreation/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
    <Footer/>
    </div>
  </Router>
  );
}

export default App;

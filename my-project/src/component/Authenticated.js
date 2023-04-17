import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import Navbars from './Navbar';

function Authenticated() {
  const [user, setUser] = useState(null);
  const navigate  = useNavigate ();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('return from the Auhenticate file');
        navigate('/login'); // Redirect to login page if user is not logged in
      } 
      
      else {
        fetch('http://localhost:3000/user', {
          headers: { Authorization: `Bearer ${token}` },

        })
          .then((response) => {
            if (response) {
              return response.json();
            } else {
              throw new Error('Failed to fetch user data');
            }
          })
          .then((data) => {
            setUser(data);
            console.log(data);
            /*  if (!response.data.verified) {
              navigate('/unverified'); // Redirect to unverified page if user is not verified
            }*/
          })
          .catch((error) => {
            console.log(error);
            navigate('/login'); // Redirect to login page if there is an error
          });

          
      }
    
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId'); 
    navigate('/login'); // Redirect to login page after logout
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  var h = window.innerHeight;
  var w=window.innerWidth;
  return (

    <div style={{height:`${0.9*h}px`}} >
       
    <Navbar className="navbar navbar-dark bg-dark" bg="light" expand="md" style={{justifyContent:'space-between'}}>
     
      
        <Nav className="ml-auto" >
     
          <NavDropdown title="Administration" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>
          
        
          <NavDropdown title="Master Creation" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>


          
          <NavDropdown title="Admission" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          
          <NavDropdown title="Report" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          
          <NavDropdown title="Fees" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          
          <NavDropdown title="Report" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          
          <NavDropdown title="Asset/stock" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>


          
          <NavDropdown title="Report" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>


          
          <NavDropdown title="Accounts" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>


          
          <NavDropdown title="Reports" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          
          <NavDropdown title="Payroll" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          
          <NavDropdown title="Library" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Others" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="My Account" id="nav-dropdown" style={{fontSize:'small' }}>
            <NavDropdown.Item href="#">Menu Item 1</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 2</NavDropdown.Item>
            <NavDropdown.Item href="#">Menu Item 3</NavDropdown.Item>
          </NavDropdown>

          
    

        

        </Nav>
      
    </Navbar>
        

      <h1>Welcome,{user.Username}</h1>
      <p>You have been verified!</p>
      <button onClick={handleLogout}>Logout</button>

    </div>
  );
}

export default Authenticated;

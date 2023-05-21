import React, { useState, useEffect } from 'react';
import NavbarAuthenticated from './NavbarAuthenticated';
import { useNavigate } from 'react-router-dom';


function Authenticated() {
 

  const [user, setUser] = useState(null);
  const navigate  = useNavigate ();
  

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    if (!token) {
        //console.log('return from the Auhenticate file');
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
          //  console.log(data);
            /*  if (!response.data.verified) {
              navigate('/unverified'); // Redirect to unverified page if user is not verified
            }*/
          })
          .catch((error) => {
           // console.log(error);
            navigate('/login'); // Redirect to login page if there is an error
          });

          
      }
    
  }, [navigate]);

 /* const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId'); 
    navigate('/login'); // Redirect to login page after logout
  };
*/
  if (!user) {
    return <div>Loading...</div>;
  }
  var h = window.innerHeight;
  //var w=window.innerWidth;
  return (

    <div style={{minHeight:`${0.9*h}px`}} >

     <NavbarAuthenticated />
        

      <h1>Welcome,{user.Username}</h1>
      <p>You have been verified!</p>
      

    </div>
  );
}

export default Authenticated;

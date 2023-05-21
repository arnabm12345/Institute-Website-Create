import React from 'react';
import { Link } from 'react-router-dom';
//import { fetchAddress } from '../util/http';
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {
  const [Address, setAddress] = useState(null);
  useEffect(() => {
    async function getAddress() {
      fetchData();
    }
    getAddress();
   // console.log(Address);
    
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/address");
    const result = await response.json();
  // const result1=JSON.parse(result)
  //console.log(typeof(result));
    setAddress(result);

  };

  return (
    <nav className="navbar">
         <Link to="/" >
      <div className="navbar-logo">
        <img src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" alt="Company Logo" />
      </div>
      </Link>
     
      { Address &&
      <div className="navbar-address">
        <span className='text-name'>{Address.address[0].name}</span>
        <br/>
        <span className='text-address'>{Address.address[0].adress} , <span>pin:{Address.address[0].pin}</span></span>
        <br/>
        <span className='text-address'>Phone No. :<span>{Address.address[0].phone}</span>&nbsp; &nbsp;<span>Help Line No. : {Address.address[0].helpline}</span></span>
        
      </div>
      
     }
  </nav>
  );
};

export default Navbar;

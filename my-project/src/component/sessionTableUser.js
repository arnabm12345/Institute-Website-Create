import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate,useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from 'axios';

function SessionTable(){
 
    const [time, setTime] = useState(new Date());
    const location = useLocation();
    const { state } = location;
    useEffect(() => {
      //console.log('location',location);
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000); // update the time every second
  
      return () => clearInterval(interval);
    }, []);
  
    const formattedTime = time.toLocaleString('en-GB').slice(12);


    let date=new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const navigate=useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId'); 
    navigate('/login'); // Redirect to login page after logout
  };

const [data, setData]=useState(null);
  const userId =localStorage.getItem('userId');
 if(!userId){
    navigate('/login');
}
//console.log('UserId',userId);
  useEffect(() => {
    //console.log('session',session);
    async function getData() {
      fetchData();
    }
    getData();
   
   // console.log(data);
    
  }, []);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    const result = await response.json();
   //const result1=JSON.parse(response);
  //console.log(typeof(result));
 // console.log('response',result);
  setData(result);

  };
    return(
        
        <nav class="navbar navbar-light" Style={{backgroundColor: "#fdff00"}}>
            {data &&
          <p style={{color:'blue',fontWeight:'500'}}><span >CAMS 3.0</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>USER:&nbsp;&nbsp;{data.comp_login[0].session_tbl.Username}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>SESSION:{location.state.session}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Date: &nbsp; &nbsp;{`${day}-0${month}-${year}`}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <span>Time:&nbsp;&nbsp;{formattedTime}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span Style={{backgroundColor:'red'}}><Button onClick={handleLogout}>Log Out</Button></span> </p> 
            } 
       </nav>
    
    );
}

export  default SessionTable;
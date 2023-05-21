import React from "react";
import NavbarAuthenticated from "./NavbarAuthenticated";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";

function GroupCreation(){
    const [user, setUser] = useState(null);
    const navigate  = useNavigate ();
    
    const [name, setUnit] = useState('');
    const [units, setUnits] = useState([]);
    const [units1, setUnits1] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [ip, setIpAddress] = useState('');
    const [BackendEditIndex,setBackendEditIndex]=useState(0);
    const [unit,setName]=useState('');
    const location = useLocation();
    const { state } = location;
   const cid=location.state.session;
   
   useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.log('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('http://localhost:3000/group-getAllUnits');
        const data = await response.json();
        setUnits(data.units);
        //console.log('data of the fetched units is',data);
        setUnits1(data.units1);
        //console.log('units of 2 user id is',units1[3].block);
      } catch (error) {
        console.log('Error fetching units:', error);
      }
    };
  
    fetchUnits();
     
  // console.log('units unit is',unit);
  }, []);

  

    // Function to handle unit input change
    const handleUnitChange = (event) => {
      setUnit(event.target.value);
      setName(event.target.value);
    };

    const handleUnitSubmit = (event) => {
        event.preventDefault();
    
        if (name.trim() !== '') {
            const isDuplicate = units.some((item) => item.toLowerCase() === name.toLowerCase());
            if (isDuplicate) {
              alert('Duplicate group name. Please enter a unique name.');
            } 
            else if (editIndex === -1) {
                // try{
                 const response=fetch('http://localhost:3000/group-create', {
                   method: 'POST',
                   headers: {
                  'Content-Type': 'application/json',
                   },
                  body: JSON.stringify({ name, cid,user,ip }),
                 })
                 setUnits([...units, name]);
                 //const data =  response.json();
                 //setUnit('');
                // setUnits([...units, name]);
             //  }
                 
               /*    
                 catch(err ) {
                   alert(err);
                 }
                 finally{
                   setUnit('');
                 }
               */
                 setUnit('');
                 }
                  else {
                   const updatedUnits = [...units];
                   updatedUnits[editIndex] = name;
                   const response=fetch('http://localhost:3000/group-update', {
                   method: 'POST',
                   headers: {
                  'Content-Type': 'application/json',
                   },
                  body: JSON.stringify({ name, cid,user,ip,id:BackendEditIndex }),
                 })
                   setUnits(updatedUnits);
                   setEditIndex(-1);
                   setUnit('');
                 }
                 setUnit('');
               }
      };
    
      // Function to handle unit deletion
      const handleDeleteUnit = async(index) => {
        const response = await fetch(`http://localhost:3000/group-getOneUnitsByName/${units[index]}`);
        const result = await response.json();
        const response1=fetch('http://localhost:3000/group-delete', {
            method: 'POST',
            headers: {
           'Content-Type': 'application/json',
            },
           body: JSON.stringify({ name:units[index],user,cid,ip,id:result.id }),
          })
          setUnits(units.filter((_, i) => i !== index));
       // setUnits(units.filter((unit) => unit[1]=== false));
    /*  units.map(function(name){
        if(name[1] === "false"){
            setUnits([...units,unit]);
           console.log('unit name is @',name[0]);
        }    

    })

        console.log('units1 is',units);*/
      };
    
      // Function to handle unit editing
      const handleEditUnit = async(index) => {
        setUnit(units[index]);
        setEditIndex(index);
        //console.log('The name of the unit is:',units[index]);
        const response = await fetch(`http://localhost:3000/group-getOneUnitsByName/${units[index]}`);
        const result = await response.json();
        console.log('result',result.id);
       // console.log('type of id',typeof result.id);
        setBackendEditIndex(result.id);
      };

    useEffect(() => {
     
      const token = localStorage.getItem('token');
      if (!token) {
       //   console.log('return from the Auhenticate file');
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
             // console.log(data);
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
    return(
        <div style={{minHeight:`${0.9*h}px`}}>
        <NavbarAuthenticated />
        <div>
        
            <div>
      <div>
      <div className="max-w-md mx-auto p-4" >
      <div className="bg-lime-100 px-4 py-2 mb-4 rounded-full text-center">
        <h1 className="text-lg">ADD GROUP</h1>
      </div>
      <form onSubmit={handleUnitSubmit} className="flex mb-4">
        <input
          type="text"
          className="flex-grow mr-2 px-4 py-2 border border-gray-100 rounded-full bg-teal-100"
          placeholder="Enter a group"
          value={name}
          onChange={handleUnitChange}
        />
        

        <button
          type="submit"
          className="bg-blue-200 hover:bg-blue-100 text-red px-4 py-2 rounded-full"
        >
          {editIndex === -1 ? 'Add Group' : 'Update Group'}
        </button>

      </form>
      </div>
      </div>
      <div>
      <div   style={{backgroundColor: "#4d4dff", color: "white", padding: "4px", marginBottom: "4px", textAlign: "center", borderRadius: "35px", textAlign: "center",marginLeft:'10vw',marginRight:'10vw' }}>
        <h1 className="text-lg">LIST OF GROUP</h1>
      </div>
      <div style={{ marginBottom: '20px', marginTop: '20px',marginLeft:'10vw',marginRight:'10vw' }}>
  <table style={{ width: '70%', margin: '0 auto', borderCollapse: 'collapse' }}>
    <thead>
      <tr style={{ borderBottom: '1px solid gray' }}>
        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#a6a6a6', color: 'black' }}>Sl. No</th>
        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#a6a6a6', color: 'black' }}>Group</th>
        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#a6a6a6', color: 'black' ,textAlign: 'right',paddingRight:'10px'}}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {units.map((item, index) => (
        <tr style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }} key={index}>
          <td style={{ padding: '8px', textAlign: 'left' }}>{index + 1}</td>
          <td style={{ padding: '8px', textAlign: 'left' }}>{item}</td>
          <td style={{ padding: '8px', textAlign: 'right' }}>
            <button
              style={{ backgroundColor: 'green', color: 'black', padding: '2px 4px', borderRadius: '10px', marginRight: '4px' }}
              onClick={() => handleEditUnit(index)}
            >
              Edit
            </button>
            <button
              style={{ backgroundColor: 'red', color: 'black', padding: '2px 4px', borderRadius: '10px' }}
              onClick={() => handleDeleteUnit(index)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
    </div>
    </div>
        </div>

    );
}
export  default GroupCreation;
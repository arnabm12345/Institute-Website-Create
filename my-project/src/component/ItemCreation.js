import React from "react";
import NavbarAuthenticated from "./NavbarAuthenticated";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
function ItemCreation(){
    const [user, setUser] = useState(null);
    const navigate  = useNavigate ();
    const [itemName, setItemName] = useState('');
    const [itemGroup, setItemGroup] = useState('');
    const [itemUnit, setItemUnit] = useState('');
    const [itemGroupName, setItemGroupName] = useState('');
    const [itemUnitName, setItemUnitName] = useState('');
    const [items, setItems] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [items1, setItems1] = useState([]);
    const [BackendEditIndex,setBackendEditIndex]=useState(0);


    const [groups,setGroups]=useState([]);
    const [units,setUnits]=useState([]);
    const [ip, setIpAddress] = useState('');
    const location = useLocation();

    //const groups = ['Group A', 'Group B', 'Group C'];
   // const units = ['Unit 1', 'Unit 2', 'Unit 3'];
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
        const response = await fetch(`http://localhost:3000/unit-getAllUnitsBySession/${cid}`);
        const data = await response.json();
        setUnits(data.units);
        //console.log('data of the fetched units is',data);
        //console.log('units of 2 user id is',units1[3].block);
      } catch (error) {
        console.log('Error fetching units:', error);
      }
    };
  
    fetchUnits();
     
  // console.log('units unit is',unit);
  }, []);


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`http://localhost:3000/group-getAllUnitsBySession/${cid}`);
        const data = await response.json();
        setGroups(data.units);
        //console.log('data of the fetched units is',data);
        //console.log('units of 2 user id is',units1[3].block);
      } catch (error) {
        console.log('Error fetching units:', error);
      }
    };
  
    fetchGroups();
     
  // console.log('units unit is',unit);
  }, []);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/item-getAllUnitsBySession/${cid}`);
        const data = await response.json();
       // data.items.map((item)=>setItems([...items,{ name: item[0], group: item[1], unit: item[2] }]));
        setItems(data.items);
        //console.log('data of the fetched units is',data);
        //console.log('units of 2 user id is',units1[3].block);
      } catch (error) {
        console.log('Error fetching units:', error);
      }
    };
  
    fetchItems();
     
  // console.log('units unit is',unit);
  }, []);

    var h = window.innerHeight;

    // Function to handle item name change
    const handleItemNameChange = (event) => {
      setItemName(event.target.value);
    };
  
    // Function to handle item group change
    const handleItemGroupChange = (event) => {
      setItemGroup(event.target.value);
     // setItemGroupName(event.target.value);
     // console.log('group,id',itemGroup);
    };
  
    // Function to handle item unit change
    const handleItemUnitChange = async(event) => {
      setItemUnit(event.target.value);      
      //setItemUnitName(event.target.value);
    };
  
    // Function to handle item submission
    const handleItemSubmit = async(event) => {
      event.preventDefault();


      if (itemName.trim() !== '') {
       const response = await fetch(`http://localhost:3000/unit-getOneUnitsByName/${itemUnit}`);
        const result = await response.json();
        const response1 = await fetch(`http://localhost:3000/group-getOneUnitsByName/${itemGroup}`);
        const result1 = await response1.json();
        setItemGroupName(result1.id);
        setItemUnitName(result.id);
        const isDuplicate = items.some((item) => item[0].toLowerCase() === itemName.toLowerCase() && item[1] ===itemGroup && item[2] ===itemUnit);
            if (isDuplicate) {
              alert('Duplicate Entry. Please enter a unique item.');
            } 
         else  if (editIndex === -1) {
          const response=fetch('http://localhost:3000/item-create', {
            method: 'POST',
            headers: {
           'Content-Type': 'application/json',
            },
            
           body: JSON.stringify({ name:itemName, cid,user,ip,grid:result1.id,uid:result.id}),
          })
        /*  const name=itemName;
          const group=itemGroup;
          const */
          setItems([...items, [itemName, itemGroup, itemUnit]]);
          console.log('items is',items);
        } 
        else {
          const updatedItems = [...items];
          updatedItems[editIndex] = [itemName,itemGroup, itemUnit];
          
          const response=fetch('http://localhost:3000/item-update', {
            method: 'POST',
            headers: {
           'Content-Type': 'application/json',
            },
           body: JSON.stringify({ name:itemName, cid,user,ip,id:BackendEditIndex,grid:result1.id,uid:result.id }),
          })

          setItems(updatedItems);
          setEditIndex(-1);
        }
        setItemName('');
        setItemGroup('');
        setItemUnit('');
      }
    };

    const handleDeleteItem = async(index) => {
      const response = await fetch(`http://localhost:3000/unit-getOneUnitsByName/${items[index][2]}`);
        const result = await response.json();
        const response1 = await fetch(`http://localhost:3000/group-getOneUnitsByName/${items[index][1]}`);
        const result1 = await response1.json();

        const actualresponse=await fetch('http://localhost:3000/item-delete', {
            method: 'POST',
            headers: {
           'Content-Type': 'application/json',
            },
           body: JSON.stringify({ name:items[index][0], cid,user,ip,grid:result1.id,uid:result.id }),
          })


        setItems(items.filter((_, i) => i !== index));
      };
    
      // Function to handle item editing
      const handleEditItem = async(index) => {
        //const { name, group, unit } = items[index];
        const name=items[index][0];
        const group=items[index][1];
        const unit=items[index][2];
        setItemName(name);
        setItemGroup(group);
        setItemUnit(unit);
        const response = await fetch(`http://localhost:3000/unit-getOneUnitsByName/${unit}`);
        const result = await response.json();
        const response1 = await fetch(`http://localhost:3000/group-getOneUnitsByName/${group}`);
        const result1 = await response1.json();
        const actualresponse =await fetch(`http://localhost:3000/item-getOneUnitsByName/${name}/${cid}/${result1.id}/${result.id}`);
        const actualresult = await actualresponse.json();
        setBackendEditIndex(actualresult.id);
        setEditIndex(index);
      
      };
  
    useEffect(() => {
     
      const token = localStorage.getItem('token');
      if (!token) {
         // console.log('return from the Auhenticate file');
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
    return (
        <div style={{minHeight:`${0.9*h}px`}}>
          <NavbarAuthenticated />
          <div>
            <div>
              <div style={{ maxWidth: "md", margin: "auto", padding: "4px" }}>
                <div style={{ backgroundColor: "#4d4dff", color: "white", padding: "4px", marginBottom: "4px", borderRadius: "35px", textAlign: "center",padding:'10px',marginLeft:'10vw',marginRight:'10vw',marginBottom:'15px',marginTop:'15px' }}>
                  <h1 style={{ fontSize: "large" }}>ADD ITEM</h1>
                </div>

        <form onSubmit={handleItemSubmit} style={{ display: 'inline-block', marginBottom: '4px' }}>
          <input
            type="text"
            style={{ flexGrow: 1, marginLeft: '25vw',height:'40px', padding: '4px', border: '1px solid gray', borderRadius: '25px',marginRight:'100px' }}
            placeholder="Item Name"
            value={itemName}
            onChange={handleItemNameChange}
          />
          <div>
          <select
            style={{ flexGrow: 2, marginLeft: '25vw',width:'20vw', padding: '4px', border: '1px solid gray', borderRadius: '25px' }}
            value={itemGroup}
            onChange={handleItemGroupChange}
          >
            <option value="">Select Group</option>
            {groups.map((group, index) => (
              <option key={index} value={group[0]}>{group[0]}</option>
            ))}
          </select>
          </div>
          <div style={{marginLeft: '25vw',marginTop:'8px',}}>
          <select
            style={{ flexGrow: 1,  padding: '4px', border: '1px solid gray', borderRadius: '15px',width:'20vw' }}
            value={itemUnit}
            onChange={handleItemUnitChange}
          >
            <option value="">Select Unit</option>
            {units.map((unit, index) => (
              <option key={index} value={unit[0]}>{unit[0]}</option>
            ))}
          </select>
          </div>
          <div style={{marginLeft: '25vw',marginTop:'8px'}}>
          <button
            type="submit"
            style={{ backgroundColor: 'green', color: 'white', padding: '4px', borderRadius: '10px', border: 'none' }}
          >
            {editIndex === -1 ? 'Add Item' : 'Update Item'}
          </button>
          </div>
        </form>
              </div>
            </div>
            <div>
              <div style={{ backgroundColor: "#4d4dff", color: "white", padding: "4px", marginBottom: "4px", textAlign: "center", borderRadius: "35px", textAlign: "center",marginLeft:'10vw',marginRight:'10vw' }}>
                <h1 style={{ fontSize: "large" }}>LIST OF ITEMS</h1>
              </div>
              <div style={{ marginBottom: '20px', marginTop: '20px' }}>
      <table style={{ width: '70%', margin: '0 auto', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#a6a6a6', color: 'black', padding: '8px', textAlign: 'left' }}>Sl. No</th>
        <th style={{ backgroundColor: '#a6a6a6', color: 'black', padding: '8px', textAlign: 'left' }}>Name</th>
        <th style={{ backgroundColor: '#a6a6a6', color: 'black', padding: '8px', textAlign: 'left' }}>Group</th>
        <th style={{ backgroundColor: '#a6a6a6', color: 'black', padding: '8px', textAlign: 'left' }}>Unit</th>
        <th style={{ backgroundColor: '#a6a6a6', color: 'black', padding: '8px', textAlign: 'right' }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
          <td style={{ padding: '8px', textAlign: 'left' }}>{index + 1}</td>
          <td style={{ padding: '8px', textAlign: 'left' }}>{item[0]}</td>
          <td style={{ padding: '8px', textAlign: 'left' }}>{item[1]}</td>
          <td style={{ padding: '8px', textAlign: 'left' }}>{item[2]}</td>
          <td style={{ padding: '8px', textAlign: 'right' }}>
            <button
              style={{ backgroundColor: 'green', color: 'black', padding: '2px 4px', borderRadius: '10px', marginRight: '8px' }}
              onClick={() => handleEditItem(index)}
            >
              Edit
            </button>
            <button
              style={{ backgroundColor: 'red', color: 'black', padding: '2px 4px', borderRadius: '10px' }}
              onClick={() => handleDeleteItem(index)}
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

      
    );
}
export  default ItemCreation;
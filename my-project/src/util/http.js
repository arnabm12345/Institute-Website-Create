import axios from 'axios';

export async function fetchAddress() {
    //const address = [];
    const response = await fetch('http://localhost:3000/address')
    .then(res =>res.json())
    .then(resData =>{
       // console.log(resData);
       return resData})
    .catch(err=> console.log(err));
 
   // console.log(address);
    /*const address = [];
  
    
        const addressObj = {
          id: response.address[0].id,
          name: response.address[0].name,
          address: response.address[0].adress,
          number: response.address[0].phone,
          pin:response.address[0].pin,
          helpline:response.address[0].helpline,
        };
        address.push(addressObj);
     console.log(address);
      return address;*/
    
  }
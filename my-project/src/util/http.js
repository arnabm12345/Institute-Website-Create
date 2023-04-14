import axios from 'axios';

export async function fetchAddress() {
    const response = await axios.get('http://localhost:3000/address');
  
    const address = [];
  
    for (const key in response.address) {
      const addressObj = {
        id: key,
        name: response.data.name,
        address: response.data.adress,
        number: response.data.phone,
        pin:response.data.pin,
        helpline:response.data.helpline,
  
      };
      address.push(addressObj);
    }
  
    return address;
  }
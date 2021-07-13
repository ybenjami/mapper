const axios = require('axios');

async function retreveUnsecure(endpoint) {
  try{
    const json = await axios.get(endpoint);
    return json;
  }catch(error){
      console.log('Error with Endpoint', error);
  }
   
}

module.exports = {retreveUnsecure}
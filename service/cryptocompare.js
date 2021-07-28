const axios = require('axios');
const { API_URL } = require('../config');




const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
  });

const cryptocompare = {

    fetch: ({ fsyms, tsyms }) => {

      return new Promise( (resolve, reject) => {
        instance.get( `fsyms=${fsyms}&tsyms=${tsyms}`)
          .then( response => { 
            res = JSON.parse(response.body);
            resolve(res)
          })
          .catch( (err) => {
            reject(err)
          })
      
      })
    }
}

module.exports = cryptocompare;

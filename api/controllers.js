
const cryptocompare = require('../service/cryptocompare');
const rabbitMQ = require('../service/rabbitMQ');
const cron = require('node-cron');
const currencies = require('../models/currency.controller');

const controllers = { 
    get_currency_data:  (req, res) => {

      var { fsyms, tsyms } = req.params;

      /* schedule api call every 10 secondes
      we use the message broker (RabbitMQ) to run
      api call and database writing in background
      */
      cron.schedule("*/10 * * * * *", () => {
        rabbitMQ("updateData", JSON.stringify({fsyms, tsyms}))
      })


      /* make a request to the external
      cryptocompare API
      */
      const data = cryptocompare.fetch({ fsyms, tsyms })
      console.log(data)
          // .then( (data) => {
          //   /* for the first call it will stores data in the database 
          //   then we're going to use rabbit for running api call and saving to database
          //   */
          //   currencies.createOrupdate({ fsyms, tsyms, data}).then( () => console.log("saved succefully ..."))
          //   res.json(data);

          // })
          // .catch( (err) => {
          //   /* if error retrieve from the database */
          //   currencies.findAll({ }).then( data => res.send(data))
          // })
            
    }
}


module.exports = controllers;
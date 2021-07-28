const io = require('../Socket/socket');
const amqp = require('amqplib/callback_api');
const { RABBIT_URL : rabbitURL } = require('../config');
const cryptocompare = require('../service/cryptocompare');
const currencies = require('../models/currency.controller');


/*
the used worker for creating API every 10 secondes to store it to database
then use wbesockets to send a message continaing the updated data to the client 
or another microservice
*/


amqp.connect( rabbitURL, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        var queue = "updateData";

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for a schudeled job message in %s. To exit press CTRL+C", queue);

        channel.consume(queue, (data) => {
            const { fsyms, tsyms } = JSON.parse(data.content.toString());
            console.log(" [x] Received Currencies:");

            // fetch data, save to db and then send message to client/microservice
            cryptocompare
                .fetch({ fsyms, tsyms })
                .then( data => {
                    currencies.createOrupdate({ fsyms, tsyms, data })
                              .then( () => {
                                   //Socket Trigger all clients/Microservice
                                    io.socket.emit("updatedStock", data);
                              })
                })
            
        }, {
            noAck: true
        });
    });
});
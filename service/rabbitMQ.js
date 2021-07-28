const amqp = require('amqplib/callback_api');

const { RABBIT_URL: rabbitUrl} = require('../config');

const sendRabbitMQ = function sendRabbitMQ(queueName, data) {
    amqp.connect(rabbitUrl, (error0, connection) => {
        if (error0) {
            throw error0;
        }

        connection.createChannel( (error1, channel) => {
            if (error1) {
                throw error1;
            }

            var queue = queueName;

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(data));

            console.log(" [x] Sent %s", data);
        });
        setTimeout(function () {
            connection.close();
            //process.exit(0);
        }, 500);
    });
}

module.exports = sendRabbitMQ;

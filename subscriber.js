const amqp = require('amqplib/callback_api');

/**
 * Create a channel and consume the queue message
 */

amqp.connect(`amqp://admin:admin123@<yourhost>:5672/`, (err, connection) => {
  if (err) {
    throw err;
  }

  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    let queueName = 'greeting';

    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.consume(queueName, (message) => {
      console.log(`Recieved : ${message.content.toString()}`);
      channel.ack(message);
    });
  });
});

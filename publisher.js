const amqp = require('amqplib/callback_api');

/**
 * Create a channel and send message queue
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
    let message = 'Hello, this is Pradeep Raj';

    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.sendToQueue(queueName, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  });
});

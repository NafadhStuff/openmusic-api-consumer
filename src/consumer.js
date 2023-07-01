require('dotenv').config();
const amqp = require('amqplib');
const PlaylistService = require('./PlaylistService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlist', {
    durable: true,
  });

  channel.consume('export:playlist', listener.listen, { noAck: true });
};

init();

// querynya nnti
const getget = async () => {
  const userPlaylist = new PlaylistService();
  const res = await userPlaylist.getPlaylist('playlist-0rs9so7Vo5DDd2Wt');
  console.log(res);
}

// getget();
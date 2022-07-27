const Buffer = require('buffer').Buffer
const Email = require('./email')
const queue = 'email-task'
const open = require('amqplib').connect('amqp://localhost:5672')

const publish = (data) => {
open.then(connection => connection.createChannel()).then(channel => channel.assertQueue(queue).then(() => {
    console.log("[*] Mesajınız gönderildi");
    for (let index = 0; index < 20; index++) {
        channel.sendToQueue(queue,Buffer.from(JSON.stringify({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔" + index, // Subject line
            text: "Hello world?" + index, // plain text body
            html: "<b>Hello world?</b>", // html body
        })))
    }
}))
}

const consume = (data) => {
open.then(connection => connection.createChannel()).then(channel => channel.assertQueue(queue).then(() => {
    console.log("[*] Mesajlarınız dinleniyor");
    return channel.consume(queue,message => {
        var data = JSON.parse(message.content.toString())
        Email.send(data)
        console.warn("[*] Mesaj gönderiliyor: " + data.to);
        channel.ack(message)
    })
}))
}

module.exports = {
    publish,
    consume
}

require('make-runnable')
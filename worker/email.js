const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "37be1ae848087f",
        pass: "4ce64089d263a2"
    },
    pool: true,
    maxConnections: 1,
    rateDelta: 20000,
    rateLimit: 5,
});

module.exports.send = async (data) => {
    return await transport.sendMail(data)
}

console.log(12)
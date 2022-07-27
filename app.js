const express = require('express')
const app = express()
const http = require('http').createServer(app)
require('dotenv').config()


http.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port : ${process.env.APP_PORT}`);
})
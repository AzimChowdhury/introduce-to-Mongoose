const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const app = require('./app');


// database connection
mongoose.connect(process.env.DB_LOCAL).then(() => {
    console.log('database connected successfully'.yellow.bold)
})



// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server running on the port ${port}`.yellow.bold)
})
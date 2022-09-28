const express = require('express');
const cors = require('cors');
const app = express()


app.use(express.json())
app.use(cors())



// routes
const productRoute = require('./Routes/product.routes');


// schema -> model -> query


app.get('/', (req, res) => {
     res.send('server running')
})

app.use('/api/v1/product', productRoute)


module.exports = app
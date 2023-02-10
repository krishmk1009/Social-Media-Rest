const express = require('express');
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const app = express();
const PORT = 3000

dotenv.config();

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true ,useUnifiedTopology: true}, () => {
    console.log("connected succesfully")
})
app.listen(PORT, () => {
    console.log("app is listening on port 3000")
})
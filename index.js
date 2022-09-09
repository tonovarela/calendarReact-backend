const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.static('public'));


//Authentication
app.use('/api/auth',require("./routes/auth"))




//CRUD Eventos Calendar





app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}!`);
});
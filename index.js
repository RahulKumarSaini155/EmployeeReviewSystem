const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./config/mongoose');

app.get('/', (req, res)=>{
    return res.send('hello');
})

app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log('Server is connected on PORT: ', PORT);
});
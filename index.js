const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');

app.use(express.urlencoded());

// ejs engine
app.set('view engine', 'ejs');
app.set('views', './views');
// layout
app.use(expressLayout);
// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set static files
app.use(express.static('./assets'));

app.use('/', require('./routes'));

app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log('Server is connected on PORT: ', PORT);
});

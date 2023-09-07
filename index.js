const express = require('express');

const PORT = 8000;
const app = express();
const db = require('./config/mongoose');
app.use(express.json());
app.use(express.urlencoded({'extended':true}));

app.use('/api',require('./routes/index'));



app.listen(PORT, (err) =>{

    if(err){
        console.log('Surver running faild',err);
    }else{
        console.log(`surver running on port no ${PORT}`);
    }

})

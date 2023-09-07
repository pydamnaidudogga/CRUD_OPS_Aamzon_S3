import express from 'express';

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());




app.listen(PORT, (err) =>{

    if(err){
        console.log('Surver running faild',err);
    }else{
        console.log(`surver running on port no ${PORT}`);
    }

})

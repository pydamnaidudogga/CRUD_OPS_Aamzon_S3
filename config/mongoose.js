const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect('mongodb+srv://mushidipallivillage:zMYgy533UZeBVpKr@cluster0.t8jychy.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to db'));

db.once('open', ()=>{
   console.log('connected to db is success');
})
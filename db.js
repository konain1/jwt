
const express = require('express')
const app = express();

app.use(express.json())
let url = 'mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/fbDB'

const mongoose = require('mongoose');
const { string } = require('zod');
mongoose.connect(url);


const User = mongoose.model('facebook', { name: String ,email:String ,password:String});


app.post('/singup',async (req,res)=>{

    const { username,email,password} = req.body

    const existUser = await User.findOne({email:email})

    if(existUser){
        res.status(403).json({msg:"user already exists"})
    }
    const user = new User({ name: username,email:email,password:password });

    user.save().then(() => console.log('saved!'));

    res.json({msg:'db is created'})
})

app.listen(4005)

const express = require('express')

const app = express();

const jwt = require('jsonwebtoken')


const userData = [
    {
        userEmail: 'konain@gmail.com',
        password: '123',
        user: 'konain'
    },
    {
        userEmail: 'konain1@gmail.com',
        password: '1234',
        user: 'konain1'
    },
    {
        userEmail: 'konain@gmail2.com',
        password: '12345',
        user: 'konain2'
    }
];


function userExists(email, pass) {
    for (let i = 0; i < userData.length; i++) {
        if (email === userData[i].userEmail && pass === userData[i].password) {
            return true;
        }
    }
    return false;
}

app.use(express.json())

app.post('/singup',(req,res)=>{

    const email = req.body.userEmail;
    const password = req.body.password;

    if(!userExists(email,password)){
        return res.json({msg:'invalid email password'})
    }


    // check the exists user 
    let token = jwt.sign({userEmail:email},password)
    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

    res.json({token,})


})

app.get('/userdata',(req,res)=>{
    const token = req.headers.authorization;

   
        const decode = jwt.verify(token,'1234')
    
        const user = decode.userEmail
        console.log(user)
        res.json({msg:userData.filter((value)=>{
            if(user == value.userEmail){
                return true
            }
           
        })
    })
    
   

})
app.listen(4002)
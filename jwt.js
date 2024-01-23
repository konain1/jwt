const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');

const All_USERS = [
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

function userExists(username, password) {
    for (let i = 0; i < All_USERS.length; i++) {
        if (username === All_USERS[i].user && password === All_USERS[i].password) {
            return true;
        }
    }
    return false;
}

// Middleware to parse the request body as JSON
app.use(express.json());

app.post('/signin', (req, res) => {
    const { user, password } = req.body;

    if (!userExists(user, password)) {
        res.status(403).json({ msg: 'Invalid user or password' });
        return;
    }
    
    let token = jwt.sign({username:user},password)

    return res.json({token,})
    
});

app.get('/users',(req,res)=>{


    // manually token is filled on headers
    const token = req.headers.authorization;
    try {
        const decode = jwt.verify(token,'1234')
        const user = decode.username
        
        res.json({msg:All_USERS.filter((value)=>{
            if(value.user != user){
                return true
            }
        })})

    } catch (error) {
        res.json(({msg:'token invalid'}))
    }

   
})

app.listen(3040, () => {
    console.log('Server is running on port 3040');
});

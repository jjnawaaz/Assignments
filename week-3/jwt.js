const express = require("express")
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

const USERS = []


const secretKey = "xxjunayeshaxx"

const generateJWT = (user) => {
    const payload = { username: user.username }
    return jwt.sign(payload, secretKey , { expiresIn: "1h"})
}

const authenticateJWT = (req, res, next)=>{
    const token = req.headers.authorization
    if(token){
    jwt.verify(token, secretKey, (err, user)=>{
        if(err){
            res.sendStatus(403)
        }
        req.user = user;
        next();
    })
} else {
    res.sendStatus(403)
}
}

app.post('/signup',(req,res)=>{
   const { username , password } = req.body
   if(!username || !password){
    res.send("Please Enter Login Information Correctly")
   }
   const isUser = USERS.find( user => user.username == username)
   if(isUser){
    return res.send("User already exists")
   }

   const user = {
        username: username,
        password: password
   }

   USERS.push(user)

   return res.status(200).json({
    message: "User successfully created",
    user: user
   })
})



app.get('/login',(req, res)=>{
    const { username , password } = req.body
    if(!username || !password){
        res.send("Please Enter Login Information Correctly")
       }
    const isUser = USERS.find( user => user.username == username && user.password == password)
   if(isUser){
    const token = generateJWT(isUser)
    return res.status(200).json({
        message: "User Successfully Logged In",
        token: token
    })
   }
   return res.status(400).json({
    message:"Invalid credentials please check again"
   })
})


app.get("/jwt",authenticateJWT,(req, res)=>{
    res.status(200).json({
        "message": "JWT Worked"
    })
})

app.listen(3000,()=>{
    console.log("Server Started")
})
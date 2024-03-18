// npm start to run nodemon server
const express = require("express")
const app = express()
const mongoose = require('mongoose')
app.use(express.json())



mongoose.connect('haha no you wont :p',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB Atlas connected"))
.catch(err => console.log('MongoDb Atlas Error:',err))


const { Schema, model } = mongoose;
const userSchema = new Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user', lowercase: true} 
})

const User = model('User', userSchema); 




app.get('/users', async (req,res)=>{
    
    const allUsers = await User.find({})
    res.status(200).json({
        message: "List of All Users",
        user: allUsers
    })
})

app.post('/signup', async (req, res) =>{
    const { username , password, role } = req.body
   try {
    if(!username || !password){
       return res.send("Please provide all details")
    }
    const isUser = await User.findOne({username})
    if(isUser){
        return res.status(403).json({
            message: "User already Exists"
        })
    }

    const newUser = new User({ username , password, role })
    await newUser.save();
    res.status(200).json({
        message: "User created Successfully",
        user: newUser
    }) }
    catch(error){
        console.log("Error:", error)
    }
})


//Admin Route 

app.get('/admin', async (req, res)=>{
    const { username , password } = req.body 
    if(!username || !password){
        return res.send("Please provide all details")
    }
    const isAdmin = await User.findOne({ username , password})
    if(isAdmin.role == 'admin'){
        return res.status(200).json({
            message: "Accessed Admin Page"
        })
    }
   return res.status(403).json({
    message: "User Invalid"
   })

})



app.listen(3000,()=>{
    console.log("Server Started")
})

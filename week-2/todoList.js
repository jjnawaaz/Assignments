const express = require("express")
const app = express()

app.use(express.json())

const users = []

app.post("/todos",(req, res) => {
    const { title , completed , description } = req.body
    if(!title || !completed || !description) {
        return res.status(400).send("Please enter the details correctly")
       }
    const todo = {
        id: users.length + 1,
        title: title,
        completed: completed,
        description: description
    }

    users.push(todo)

    res.status(200).json(todo)
    })

app.get("/todos",(req, res) => {
    const { username , password } = req.headers
    if(!username || !password){
        return res.status(400).send("Enter all the fields")
    }

    if(username !== "admin" || password !== "12345"){
        return res.status(400).send("Invalid credentials")
    }

    const userdata = users
    res.status(200).json(userdata)
})

app.get("/todos/:id", (req, res)=>{
    const id  = parseInt(req.params.id)
    
    if(!id){
        return res.status(400).send("Send Id")
    }

    for ( let i = 0; i <= users.length; i++) {
        if(users[i].id == id){
            return res.status(200).json(users[i])
        } 
    }
        return res.status(400).send("Invalid ID") 
})


app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    if(!id){
        return res.status(400).send("Please enter ID")
    }

    const { title , completed , description } = req.body
     if(!title || !completed || !description ){
        return res.status(400).send("Please Enter all the fields to update")
     }
     
     let findIndex = users.findIndex( user => user.id === id)
     let updateUser = null;
     
     if(findIndex !== -1){
        updateUser = {
            id: id,
            title: title,
            completed: completed,
            description: description
         }
         users.splice(findIndex, 1, updateUser)
     }
     else {
        return res.status(400).send("User not found")
     }

     return res.status(200).json(updateUser)
})

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    if(!id){
        return res.status(400).send("Please Enter the Id to delete")
    }
    const indexToDelete = users.findIndex(user => user.id === id)
    if(indexToDelete !== -1){
        users.splice(indexToDelete, 1)
        return res.status(200).json({ message: "Todo item successfully deleted"})
    } else {
        return res.status(400).send(" ID invalid ")
    }
   
})

app.listen(3000, () => {
    console.log("Started Server in port 3000")
})
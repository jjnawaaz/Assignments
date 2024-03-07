const express = require('express')
const app = express()

const users = []

app.use(express.json())

// Made a post API to signup 
app.post('/signup', (req, res) => {
 const { username, email , password } = req.body
 if(!username || !email || !password) {
  return res.status(400).send("Please enter the details correctly")
 }

const isExistinguser = users.find( user => user.username === username)
if(isExistinguser){
  return res.status(400).send("User exists try to sign in")
}

const userId = users.length + 1;
const user1 = {
  userId: userId,
  username,
  email,
  password
}

users.push(user1)
console.log(users)
res.status(200).send({
  user1
})

})

app.post('/signin', (req, res) => {
  const { email, password } = req.body
  if(!email || !password){
    return res.status(400).send("Please enter both email and Password")
  }
  
  for( let i = 0; i<=users.length; i++) {
    if(users[i].email === email && users[i].password === password){
      console.log(users[i].email)
      console.log(users[i].password)
      return res.status(200).json(users[i])
    }
    else {
      return res.status(400).send("Invalid credentials") 
    }
  }



})

app.get('/data', (req, res) => {
  
  const { username , password } = req.headers
  console.log(username)
  console.log(password)
  
  if (!username || !password) {
    return res.status(401).send('Unauthorized: Missing credentials');
  }

  if (username !== 'admin' || password !== 'password' ){
    return res.status(401).send('Invalid credentials')
  }
   
  const userData = users;
  res.status(200).json(userData)

});


app.listen(3000,() => {
    console.log("server started at port 3000")
})
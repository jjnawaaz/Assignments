/* 

To Create a SignUp API we have to do the following steps
1. Use app.use(express.json()) - IT IS A MIDDLEWARE WHICH TELLS EXPRESS THAT OUR DATA SHOULD BE PARSED IN THE FORM OF JSON OBJECTS
2. Make a variable to store our Incoming data from client
3. Make a SignUp API which is a post request which has two arguments A PATH_NAME and Function to execute   
4. Now initialize an object with required fields and set it = to req.body
5. Check if the entered JSON is in correct format
6. Check if the signup user already exists
7. Create a new object with the fields and push it into users array Like in this example
8. if cannot push show an error 
9. use res.send() to send message if the task is successful or not 

*/



const users = []
let user1 = {
    id: Math.random(),
    name: "Junaid",
    email: "dummy@gmail.com",
    password: "12345",
}

users.push(user1)
console.log(users)

const isExistinguser = users.find(user => user.email === "dummy@gmail.com")
if(isExistinguser){
   return console.log("User already Exists")
    
} 

console.log("program executed")
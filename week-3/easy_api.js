const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];



// Admin Authentication

const adminAuthentication = (req, res, next) => {
    const { username, password } = req.headers
    if(!username && !password) {
        return res.status(400).json({
            message: "Please Enter Username and Password"
        })
    }
    const isAdmin = ADMINS.find( user => user.username === username && user.password === password )
    if(isAdmin){
        next();
    } else {
        return res.status(403).json({
            message: "Invalid Credentials"
        })
    }
}


// User Authentication 
const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers
  if(!username || !password ){
    return res.status(403).json({
      message: "Please Enter Username and Password"
    })
  }

  const user = USERS.find( user => user.username === username && user.password === password )
  if(user){
    next();
  } else {
    return res.status(403).json({
      message: "Invalid Email or Password"
    })
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
    /* 
    First username and password I should get from request.body 
    check if that username already exists if yes return message admin exists
    make admin object and set it to the values you got from req.body
    push it into the admins array 
    use id as array.length + 1
    return success
    */ 
    const { username, password } = req.body
    const check_user = ADMINS.find( user => user.username === username)
    if(check_user) {
        return res.status(400).send("User Already Exists")
    }

    const admin_object = {
        id: ADMINS.length + 1,
        username: username,
        password: password
    }

    ADMINS.push(admin_object)
    return res.status(200).json({
        message: "Admin Successfully Created",
        admin: admin_object
    })

});

app.post('/admin/login',adminAuthentication, (req, res) => {
  // logic to log in admin
  res.status(403).json({
    message: "Successfully Logged In"
  })
}
);

app.post('/admin/courses',adminAuthentication, (req, res) => {
  // logic to create a course
  const { name, description } = req.body 
  if(!name || !description){
    res.status(400).json({
        message: "Please Enter Courses name and description"
    })
  }

  const course = {
    id: Date.now(),
    name: name,
    description: description
  }

  COURSES.push(course)
  res.status(200).json({
    message: "Successfully added the course",
    course: course
  })
});

app.put('/admin/courses/:id',adminAuthentication, (req, res) => {
  // logic to edit a course
  const id = parseInt(req.params.id)
  const { name, description } = req.body
  if(!id) {
    return res.status(400).json({
        message: "Please enter the id of the course to search"
    })
  }
  let found = COURSES.find( user => user.id === id)
  let index = COURSES.indexOf(found)
  if(found){
    const updateCourse = {
        id: Date.now(),
        name: name,
        description: description
    }
    COURSES[index] = updateCourse
    return res.status(200).json({
      message: "Successfully updated the course",
      course: updateCourse
    })
    }
  else{
    return res.status(400).json({
        message: "Entered course isnt available please check ID or add it to new course"
    })
  }
});

app.get('/admin/courses',adminAuthentication, (req, res) => {
  // logic to get all courses
  return res.status(200).json({
    message: "Successfully fetched courses",
    courses: COURSES
  })
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const { username, password } = req.body
  if(!username || !password){
    return res.status(400).json({
      message: "Please enter username as well as password"
    })
  }

  const find = USERS.find(user => user.username === username) 
  if(find){
    return res.status(400).json({
      message: "User already exists"
    })
  }
  const user = {
    id: USERS.length + 1,
    username: username,
    password: password,
    purchasedCourses: []
  }

USERS.push(user)
return res.status(200).json({
  message: "Successfully created User",
  user: user
})
});

app.post('/users/login',userAuthentication, (req, res) => {
  // logic to log in user
  return res.status(200).json({
    message: "User Successfully Logged In"
  })
});

app.get('/users/courses', userAuthentication, (req, res) => {
  // logic to list all courses
  return res.status(200).json({
    message: "List of all the courses",
    courses: COURSES
  })
});

app.post('/users/courses/:id', userAuthentication,(req, res) => {
  // logic to purchase a course
  const username = req.headers.username
  if(username){
    const userIndex = USERS.findIndex( a => a.username === username)
    const id = parseInt(req.params.id)
    const check_course = COURSES.find( a => a.id === id)
    if(check_course){
        USERS[userIndex].purchasedCourses.push(check_course)
        return res.status(200).json({
          message: "Purchased The Course Successfully",
          user: USERS[userIndex]
        })
    } else {
        return res.status(400).json({
          message: "Course not found"
        })
    }
}
});

app.get('/users/purchasedCourses',userAuthentication, (req, res) => {
  // logic to view purchased courses\
  const { username } = req.headers
  const findUser = USERS.find( user => user.username === username)
  if(findUser){
    const findIndex = USERS.findIndex( user => user.username === username )
    return res.status(200).json({
      message: "List of purchased Courses",
      user: findUser.pu
    })
  } else{
    return res.status(400).json({
      message: "User Not Found"
    })
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
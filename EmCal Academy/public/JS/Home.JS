class UserAccount {
    constructor(username, email, role = "student") {
      this.username = username;
      this.email = email;
      this.role = role; // Possible roles: 'student', 'teacher', 'admin'
      this.enrolledCourses = [];
      this.profile = {
        bio: "",
        avatar: "",
      };
    }
  
    // Method to enroll in a course
    enrollInCourse(courseName) {
      if (!this.enrolledCourses.includes(courseName)) {
        this.enrolledCourses.push(courseName);
        console.log(`${this.username} has enrolled in ${courseName}`);
      } else {
        console.log(`${this.username} is already enrolled in ${courseName}`);
      }
    }
  
    // Method to update profile
    updateProfile(bio, avatar) {
      this.profile.bio = bio || this.profile.bio;
      this.profile.avatar = avatar || this.profile.avatar;
      console.log(`Profile updated for ${this.username}`);
    }
  
    // Method to display user info
    displayUserInfo() {
      console.log(`Username: ${this.username}`);
      console.log(`Email: ${this.email}`);
      console.log(`Role: ${this.role}`);
      console.log(`Enrolled Courses: ${this.enrolledCourses.join(", ") || "None"}`);
      console.log(`Bio: ${this.profile.bio}`);
      console.log(`Avatar URL: ${this.profile.avatar}`);
    }
  
    // Method to check if the user is an admin
    isAdmin() {
      return this.role === "admin";
    }
  }
  
  // Example Usage
  const user1 = new UserAccount("john_doe", "john@example.com");
  user1.enrollInCourse("Math 101");
  user1.updateProfile("I love learning new things!", "https://example.com/avatar.jpg");
  user1.displayUserInfo();
  
  const admin = new UserAccount("admin_user", "admin@example.com", "admin");
  console.log(`Is Admin? ${admin.isAdmin()}`);
  const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key", // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
  })
);

// Simulated database
const users = {}; // { username: { password: "password", email: "email@example.com" } }

// Route: Home
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to Educational Website</h1>
    <a href="/signup">Sign Up</a> | <a href="/login">Log In</a>
  `);
});

// Route: Signup
app.get("/signup", (req, res) => {
  res.send(`
    <h1>Sign Up</h1>
    <form action="/signup" method="POST">
      <p>Username: <input type="text" name="username" required /></p>
      <p>Password: <input type="password" name="password" required /></p>
      <p>Email: <input type="email" name="email" required /></p>
      <button type="submit">Sign Up</button>
    </form>
  `);
});

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  if (users[username]) {
    return res.send("Username already exists. Please choose a different one.");
  }

  users[username] = { password, email };
  req.session.user = { username, email };
  res.redirect("/account");
});

// Route: Login
app.get("/login", (req, res) => {
  res.send(`
    <h1>Log In</h1>
    <form action="/login" method="POST">
      <p>Username: <input type="text" name="username" required /></p>
      <p>Password: <input type="password" name="password" required /></p>
      <button type="submit">Log In</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users[username];
  if (!user || user.password !== password) {
    return res.send("Invalid username or password. Please try again.");
  }

  req.session.user = { username, email: user.email };
  res.redirect("/account");
});

// Route: User Account
app.get("/account", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const { username, email } = req.session.user;
  res.send(`
    <h1>Welcome, ${username}</h1>
    <p>Email: ${email}</p>
    <a href="/logout">Log Out</a>
  `);
});

// Route: Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
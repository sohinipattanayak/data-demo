const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});
// Connect to MongoDB database
mongoose.connect(
  "mongodb+srv://sohinipattanayak:Shivam2321@cluster0.yov5msh.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define a User model schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Route for handling POST requests to add a new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, age, sex } = req.body;
    const user = new User({ name, age, sex });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

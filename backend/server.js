const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Student = require("./models/Student");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Home route
app.get("/", (req, res) => {
    res.send("MERN Student API is running");
});

// Get all students
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching students"
        });
    }
});

// Add student
app.post("/api/students", async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            course: req.body.course,
            email: req.body.email
        });

        const savedStudent = await student.save();

        res.status(201).json(savedStudent);

    } catch (error) {
        res.status(500).json({
            message: "Error adding student"
        });
    }
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting student"
        });
    }
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
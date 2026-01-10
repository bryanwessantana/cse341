const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8080;

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. MongoDB Connection
const mongoURI = "mongodb+srv://bsantana:BryanSant18@cluster0.0vhzwj7.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("✅ Successfully connected to MongoDB!");
        seedDatabase(); // Calls the function to populate the database if empty
    })
    .catch(err => console.error("❌ Database connection error:", err));

// 3. Schema definition matching the Frontend IDs/fields
const ProfileSchema = new mongoose.Schema({
    professionalName: String,
    base64Image: String,
    nameLink: { firstName: String, url: String },
    primaryDescription: String,
    workDescription1: String,
    workDescription2: String,
    linkTitleText: String,
    linkedInLink: { text: String, link: String },
    githubLink: { text: String, link: String }
});

const Profile = mongoose.model('Profile', ProfileSchema);

// 4. Seed function to populate the DB with required fields for displayAllData(data)
async function seedDatabase() {
    try {
        await Profile.deleteMany({});

        const count = await Profile.countDocuments();

        if (count === 0) {
            await Profile.create({
                professionalName: "Bryan Santana",
                base64Image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", 
                nameLink: { firstName: "Bryan", url: "https://www.google.com" },
                primaryDescription: " - Full Stack Developer in training.",
                workDescription1: "Working with Node.js and modern web technologies.",
                workDescription2: "Student at BYU-Idaho, focused on Web Services.",
                linkTitleText: "Connect with me:",
                linkedInLink: { text: "LinkedIn", link: "https://www.linkedin.com/in/bryansantana/" },
                githubLink: { text: "GitHub", link: "https://github.com/bryanwessantana" }
            });
            console.log("✨ Initial data created successfully!");
        }
    } catch (error) {
        console.error("❌ Error creating initial data:", error);
    }
}

// 5. REST Endpoint - GET /professional
app.get('/professional', async (req, res) => {
    try {
        const data = await Profile.findOne();
        if (!data) {
            return res.status(404).json({ message: "No data found." });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// 6. Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/professional`);
    console.log(`📡 Use this URL in your frontend fetch calls.`);
});
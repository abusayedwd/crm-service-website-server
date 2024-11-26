


const mongoose = require('mongoose');
const User = require('../app/v1/models/User');
const { AboutUs } = require('../app/v1/models/AboutUs');




require('dotenv').config();

// Sample user data
const usersData = [
  {
    name: "damir",
    email: "info@lenbec.com",
    phoneNumber: "01735566789",
    password: "$2a$10$dgwflQ4jc/aUtXeKBzMuxewCVGJnHWPWE0PxEyGAj1AKoIIo3BWyy",
    role: "admin",
    status: "active",
    oneTimeCode: null,
    isVerified: true,
    isAdmin: true,
    isDeleted: false,
  },
  {
    name: "Testing Admin",
    email: "admin@gmail.com",
    phoneNumber: "01735566789",
    password: "$2a$10$dgwflQ4jc/aUtXeKBzMuxewCVGJnHWPWE0PxEyGAj1AKoIIo3BWyy",
    role: "admin",
    status: "active",
    oneTimeCode: null,
    isVerified: true,
    isAdmin: true,
    isDeleted: false,
  },
];





// Sample About Us data
const aboutUsData = [
  {
    aboutUsText: "This is the About Us information for our application."
  }
];



// Function to drop the entire database
const dropDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log("------------> Database dropped successfully! <------------");
  } catch (err) {
    console.error("Error dropping database:", err);
  }
};

// Function to seed users
const seedUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(usersData);
    console.log("Users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  }
};



// Function to seed About Us data
const seedAboutUs = async () => {
  try {
    await AboutUs.deleteMany();
    await AboutUs.insertMany(aboutUsData);
    console.log("About Us data seeded successfully!");
  } catch (err) {
    console.error("Error seeding About Us data:", err);
  }
};


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1);
  });

// Call seeding functions
const seedDatabase = async () => {
  try {
    await dropDatabase();
    await seedUsers();
   
    await seedAboutUs();
 

    console.log("--------------> Database seeding completed <--------------");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.disconnect().then(() => {
      console.log("Disconnected from MongoDB");
    }).catch(err => {
      console.error("Error disconnecting from MongoDB:", err);
    });
  }
};

// Execute seeding
seedDatabase();

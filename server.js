const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactsRoutes");
const errorHandler = require("./middleware/errorHandler");
const userRoutes=require("./routes/userRoutes")
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose connection closed due to application termination');
    process.exit(0);
  });
});

app.use(bodyParser.json());
app.use("/api/contacts",contactRoute);
app.use("/api/users",userRoutes);
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome Here!!");
});

const uri = "mongodb+srv://rakshithmnayak:Rakshith123@cluster0.oprthho.mongodb.net/shopifydata?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const formDataSchema = new mongoose.Schema({
  sampledata: String,
});

const FormData = mongoose.model("FormData", formDataSchema);

app.post("/form", async (req, res) => {
  try {
    const formData = req.body;
    const newFormData = new FormData(formData);
    const savedFormData = await newFormData.save();
    console.log("Form data stored in MongoDB:", savedFormData);
    res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.error("Error storing form data in MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/formdata", async (req, res) => {
  try {
    const data = await FormData.find({});
    console.log("Form data fetched:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error storing form data in MongoDB:", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
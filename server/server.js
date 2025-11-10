const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const myRouter = require("./routes/myRouter");
const connectDB = require("./config/connectDB");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", myRouter);

app.listen(port, () => {
  try {
    connectDB().then(() => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
});

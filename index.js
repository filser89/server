const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// setup express server

const app = express();
app.use(express.json());
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// setup routers

app.use("/snippet", require("./routers/snippetRouter"));

// connect to mongoDB
mongoose.connect(
  process.env.MDB_CONNECT_STR,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      j: true,
    },
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully connected to MongoDB");
  }
);

// dzGlh46eKRHSk3y7
// mongodb+srv://filser89:<password>@filser89.mclda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

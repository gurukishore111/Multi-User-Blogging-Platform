//Packages
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/users");
//routes
const blogRouter = require("./routes/blog");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const tagRouter = require("./routes/tag");
//To take env variables
const app = express();
app.use(cors());
require("dotenv").config();

//app

//middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

//routes middleware:
app.use("/api", blogRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", tagRouter);

//cors

//Database -->used locally

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connected..."));

//port

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server Listening in the port ${PORT}`));

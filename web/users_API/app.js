const express = require("express");
const { port, callback } = require("./modules/port.module.js");
require("dotenv").config();
const method = require("method-override");
const cors = require("cors");
const corsOptions = require("./cors/corsOptions");
const credentials = require("./middlewares/credentials");

const cookieParser = require("cookie-parser");
const app = express();


app.listen(port, callback);

app.use(express.urlencoded({ extended: false })); //req.body y el req.query
app.use(express.json()); //permite procesar info que viene en formato json
app.use(method("m")); //permite poner en la url ?m=DELETE - PUT

//middleware for cookies
app.use(cookieParser());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
app.use(cors(corsOptions));

//APIS
app.get("/", (req, res) => {
  res.json({ message: "Express chatbot_users_API is running" });
});

app.use("/api/auth", require("./routes/auth/auth.routes"));
app.use("/api/activate", require("./routes/activate/activation.routes"));

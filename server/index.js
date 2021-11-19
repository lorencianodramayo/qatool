// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

//imports
const routes = require("./routes/api");
//ports
const PORT = process.env.PORT || 8080;

//database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected!!!!");
});

//express init
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));
//connect to api
app.use("/api", routes);
//for deployment
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

//logger
app.listen(PORT, console.log(`Server is starting at ${PORT}`));

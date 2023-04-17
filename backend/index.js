const connectToMongoose = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

connectToMongoose();

app.use("/api/auth", require("./route/auth"));
app.use("/api/notes", require("./route/notes"));

app.listen("5000", () => { });

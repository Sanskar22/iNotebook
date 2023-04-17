const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true";

const connectToMongoose = () => {
  mongoose.connect("mongodb://localhost:27017/inotebookDB", {
    useNewUrlParser: true,
  });
};
module.exports = connectToMongoose;

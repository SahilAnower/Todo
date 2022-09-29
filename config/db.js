const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db =
  process.env.MONGO_URI ||
  "mongodb+srv://Sahil_Anower:Jamesbond007@todocluster.ttg4po7.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

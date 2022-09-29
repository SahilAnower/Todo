require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routers/auth");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { checkAuth } = require("./utils/checkAuth");
const todoRoutes = require("./routers/todo");
const userRoutes = require("./routers/user");

connectDB();

// const corsOptions = {
//     origin: "*",
//     credentials: true,
//     optionSuccessStatus: 200,
// }

app.use(express.json({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      return callback(null, true);
    },
  })
);
app.use(morgan("tiny"));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/", authRoutes);
app.use("/user", checkAuth, userRoutes);
app.use("/user/todo", checkAuth, todoRoutes);

app.get("/", (req, res) => res.send(`Server up and running on Port ${PORT}`));

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message, stack: err.stack });
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("todo_frontend/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "todo_frontend", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

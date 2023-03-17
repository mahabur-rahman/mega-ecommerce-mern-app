const express = require("express");
const app = express();
const colors = require("colors");

// error
const errorMiddleware = require("./middleware/error");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// env config
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

// ROUTES
const productRoute = require("./routes/productRoute");

// connect to db
const connectedDB = require("./db/connect");
connectedDB();

app.use(express.json());
app.use("/api/v1", productRoute);

// Middleware for Errors
app.use(errorMiddleware);

// listen app
const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

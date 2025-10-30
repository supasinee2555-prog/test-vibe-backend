import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middleware/errorHandler";
import { userRouter } from "./routes/userRoutes";
import { expenseRouter } from "./routes/expenseRoutes";
import { categoryRouter } from "./routes/categoryRoutes";

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/categories", categoryRouter);

// Error handling
app.use(errorHandler);

// Database connection and server startup
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1);
  });
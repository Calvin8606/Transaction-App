import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173" })); // Vite's default port
app.use(express.json());

// routes
// app.use("/api/transactions", transactionsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
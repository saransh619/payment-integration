import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.config.js";
import dotenv from "dotenv";
import paymentRoutes from "./routes/PaymentRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;

connectDB();

// Middleware
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("eSewa Payment Integration");
});

app.use("/api", paymentRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

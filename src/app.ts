import express from "express";
import morgan from "morgan";
import setupSwagger from "../config/swagger";   
import errorHandler from "../src/api/v1/middleware/errorHandler";
import loanRoutes from "./api/v1/routes/loanRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes"
import userRoutes from "./api/v1/routes/userRoutes"

const app = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));
app.use(express.json());



app.use(express.json()); 

// Health check endpoint
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});


// Use the loanRoutes for loan endpoints
app.use("/api/v1/loans", loanRoutes); 

app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1/users", userRoutes);

// Set up Swagger for API documentation
setupSwagger(app);

/*
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
*/
app.use(errorHandler);

export default app;

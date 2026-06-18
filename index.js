import app from "./app.js";
import connectToDatabase from "./config/db.js";

const PORT = 5000;

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is currently running on port ${PORT}`);

  try {
    await connectToDatabase();
    console.log("✅ Connected to database successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
});
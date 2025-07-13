#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

console.log("🚀 Setting up Node.js Auth Server...\n");

// Check if .env file exists
const envPath = path.join(__dirname, ".env");
const envExamplePath = path.join(__dirname, "env.example");

if (fs.existsSync(envPath)) {
  console.log("⚠️  .env file already exists. Skipping environment setup.");
} else {
  console.log("📝 Creating .env file...");

  try {
    // Read the example file
    const envExample = fs.readFileSync(envExamplePath, "utf8");

    // Generate a secure JWT secret
    const jwtSecret = crypto.randomBytes(64).toString("hex");

    // Replace the placeholder with a real secret
    const envContent = envExample.replace(
      "your-super-secret-jwt-key-change-this-in-production",
      jwtSecret
    );

    // Write the .env file
    fs.writeFileSync(envPath, envContent);

    console.log("✅ .env file created successfully!");
    console.log("🔐 JWT secret generated automatically");
  } catch (error) {
    console.error("❌ Error creating .env file:", error.message);
    process.exit(1);
  }
}

// Check if MongoDB is running (optional)
console.log("\n📊 Checking MongoDB connection...");
const { MongoClient } = require("mongodb");

async function checkMongoDB() {
  try {
    const client = new MongoClient("mongodb://localhost:27017", {
      serverSelectionTimeoutMS: 5000,
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB is running and accessible");
    await client.close();
  } catch (error) {
    console.log("⚠️  MongoDB is not running or not accessible");
    console.log("💡 Please start MongoDB or update MONGODB_URI in .env file");
    console.log(
      "   For local development: brew services start mongodb-community"
    );
    console.log("   Or use MongoDB Atlas: https://cloud.mongodb.com");
  }
}

checkMongoDB().then(() => {
  console.log("\n🎉 Setup completed!");
  console.log("\n📋 Next steps:");
  console.log("1. Start the server: npm run dev");
  console.log("2. Test the API: curl http://localhost:3000/health");
  console.log(
    "3. Register a user: curl -X POST http://localhost:3000/api/auth/register \\"
  );
  console.log('   -H "Content-Type: application/json" \\');
  console.log(
    '   -d \'{"username":"test","email":"test@example.com","password":"Test123"}\''
  );
  console.log("\n📖 For more information, see README.md");
});

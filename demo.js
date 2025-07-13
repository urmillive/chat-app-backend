#!/usr/bin/env node

const axios = require("axios");

const BASE_URL = "http://localhost:3000/api";

// Colors for console output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

const log = (color, message) => {
  console.log(`${color}${message}${colors.reset}`);
};

const demo = async () => {
  log(colors.blue, "\n🚀 Node.js Auth Server Demo\n");

  try {
    // Test 1: Health Check
    log(colors.yellow, "1. Testing health endpoint...");
    const health = await axios.get("http://localhost:3000/health");
    log(colors.green, `✅ Health check: ${health.data.message}`);

    // Test 2: User Registration
    log(colors.yellow, "\n2. Testing user registration...");
    const registerData = {
      username: "demouser",
      email: "demo@example.com",
      password: "DemoPass123",
      profile: {
        firstName: "Demo",
        lastName: "User",
      },
    };

    const register = await axios.post(
      `${BASE_URL}/auth/register`,
      registerData
    );
    const token = register.data.data.token;
    log(
      colors.green,
      `✅ User registered: ${register.data.data.user.username}`
    );
    log(colors.green, `   Token received: ${token.substring(0, 20)}...`);

    // Test 3: User Login
    log(colors.yellow, "\n3. Testing user login...");
    const login = await axios.post(`${BASE_URL}/auth/login`, {
      email: "demo@example.com",
      password: "DemoPass123",
    });
    log(colors.green, `✅ Login successful: ${login.data.message}`);

    // Test 4: Get User Profile (Protected Route)
    log(colors.yellow, "\n4. Testing protected route...");
    const profile = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    log(
      colors.green,
      `✅ Profile retrieved: ${profile.data.data.user.username}`
    );

    // Test 5: Update User Profile
    log(colors.yellow, "\n5. Testing profile update...");
    const update = await axios.put(
      `${BASE_URL}/auth/profile`,
      {
        profile: {
          firstName: "Updated",
          lastName: "Demo",
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    log(colors.green, `✅ Profile updated: ${update.data.message}`);

    // Test 6: Validation Error
    log(colors.yellow, "\n6. Testing validation...");
    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        username: "a",
        email: "invalid-email",
        password: "123",
      });
    } catch (error) {
      log(
        colors.green,
        `✅ Validation working: ${error.response.data.errors.length} errors caught`
      );
    }

    // Test 7: Unauthorized Access
    log(colors.yellow, "\n7. Testing unauthorized access...");
    try {
      await axios.get(`${BASE_URL}/auth/me`);
    } catch (error) {
      log(
        colors.green,
        `✅ Unauthorized access blocked: ${error.response.data.message}`
      );
    }

    log(colors.blue, "\n🎉 All tests completed successfully!");
    log(colors.blue, "\n📋 Available endpoints:");
    log(colors.blue, "   POST /api/auth/register - Register new user");
    log(colors.blue, "   POST /api/auth/login - Login user");
    log(
      colors.blue,
      "   GET  /api/auth/me - Get user profile (requires token)"
    );
    log(
      colors.blue,
      "   PUT  /api/auth/profile - Update profile (requires token)"
    );
    log(
      colors.blue,
      "   PUT  /api/auth/password - Change password (requires token)"
    );
    log(colors.blue, "   GET  /api/users - Get all users (admin only)");
  } catch (error) {
    log(colors.red, `❌ Demo failed: ${error.message}`);
    if (error.response) {
      log(colors.red, `   Status: ${error.response.status}`);
      log(
        colors.red,
        `   Data: ${JSON.stringify(error.response.data, null, 2)}`
      );
    }
  }
};

// Check if server is running
const checkServer = async () => {
  try {
    await axios.get("http://localhost:3000/health");
    return true;
  } catch (error) {
    return false;
  }
};

const main = async () => {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    log(
      colors.red,
      "❌ Server is not running. Please start it with: npm run dev"
    );
    process.exit(1);
  }

  await demo();
};

main();

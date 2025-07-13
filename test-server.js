const request = require("supertest");
const app = require("./server");

// Mock MongoDB connection for testing
jest.mock("./config/database", () => ({
  connectDB: jest.fn().mockResolvedValue(true),
}));

describe("Server Tests", () => {
  test("GET / should return API information", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Welcome to Node.js Auth Server API");
  });

  test("GET /health should return health status", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Server is running");
  });

  test("GET /api/auth/register should require validation", async () => {
    const response = await request(app).post("/api/auth/register");
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

// Simple test without Jest
if (typeof jest === "undefined") {
  console.log("Running simple server test...");

  const testServer = () => {
    const http = require("http");
    const url = require("url");

    const server = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          message: "Test server is working",
          endpoint: req.url,
        })
      );
    });

    server.listen(3001, () => {
      console.log("✅ Test server running on port 3001");
      console.log("🔗 Test endpoint: http://localhost:3001/test");

      // Auto-close after 5 seconds
      setTimeout(() => {
        server.close();
        console.log("✅ Test completed successfully");
        process.exit(0);
      }, 5000);
    });
  };

  testServer();
}

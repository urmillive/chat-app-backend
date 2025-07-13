const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const {
  validateRegistration,
  validateLogin,
  validatePasswordUpdate,
  validateProfileUpdate,
} = require("../middleware/validation");

// Public routes
router.post("/register", validateRegistration, authController.register);
router.post("/login", validateLogin, authController.login);
router.post("/refresh", authController.refreshToken);

// Protected routes
router.get("/me", authenticateToken, authController.getProfile);
router.put(
  "/profile",
  authenticateToken,
  validateProfileUpdate,
  authController.updateProfile
);
router.put(
  "/password",
  authenticateToken,
  validatePasswordUpdate,
  authController.changePassword
);
router.post("/logout", authenticateToken, authController.logout);

module.exports = router;

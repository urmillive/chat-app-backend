const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  authenticateToken,
  requireAdmin,
  requireModerator,
} = require("../middleware/auth");

// All routes require authentication
router.use(authenticateToken);

// Admin only routes
router.get("/", requireAdmin, userController.getAllUsers);
router.get("/search", requireAdmin, userController.searchUsers);
router.get("/:id", requireAdmin, userController.getUserById);
router.put("/:id/role", requireAdmin, userController.updateUserRole);
router.put("/:id/deactivate", requireAdmin, userController.deactivateUser);
router.put("/:id/activate", requireAdmin, userController.activateUser);
router.delete("/:id", requireAdmin, userController.deleteUser);

module.exports = router;

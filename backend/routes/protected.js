const express = require('express');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}`,
    user: req.user,
  });
});

module.exports = router;

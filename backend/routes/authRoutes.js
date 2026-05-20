const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentProfile, getAllTeamMembers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getCurrentProfile);
router.get('/team', protect, getAllTeamMembers);

module.exports = router;
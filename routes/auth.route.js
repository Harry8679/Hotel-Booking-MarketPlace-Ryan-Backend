const express = require('express');
const { home, register } = require('../controllers/auth.controller');
const router = express.Router();

router.get('/auth', home);
router.post('/register', register);

module.exports = router;

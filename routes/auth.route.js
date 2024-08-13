const express = require('express');
const { home } = require('../controllers/auth.controller');
const router = express.Router();

router.get('/auth', home);

module.exports = router;

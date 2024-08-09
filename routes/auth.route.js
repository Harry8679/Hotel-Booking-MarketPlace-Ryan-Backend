const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Test 2');
});

module.exports = router;

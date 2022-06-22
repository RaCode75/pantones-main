const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/pantones');
});

module.exports = router;
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("hey this is the honmepage of users")
})
module.exports = router;
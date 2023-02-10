const router = require("express").Router();
const User = require("../models/user")

router.post('/register', async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        emailId: req.body.emailId,
        password: req.body.password,
    })

    try {
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;
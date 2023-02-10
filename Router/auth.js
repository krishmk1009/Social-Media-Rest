const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcrypt")

//register
router.post('/register', async (req, res) => {

    try {
        //generate password using hash
        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(req.body.password, salt)

        //create user
        const newUser = new User({
            userName: req.body.userName,
            emailId: req.body.emailId,
            password: hashedPassword,
        })

        //save user
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;
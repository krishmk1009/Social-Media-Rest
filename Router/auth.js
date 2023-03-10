const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcrypt")

//register
router.post('/register', async (req, res) => {

    try {
        //generate password using hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

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

//login
/*
Json:
{
   
   "emailId": "demkmo@gmail",
   "password": "mkmkmk"
}

*/

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("not valid password")

        res.status(200).json(user)

    }
    catch (err) {
        console.log(err)
    }

})

module.exports = router;
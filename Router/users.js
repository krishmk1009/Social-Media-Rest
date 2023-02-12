const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.send("hey this is the honmepage of users")
})


//update a user
router.put('/:id', async (req, res) => {
    if (req.body.userId == req.params.id) {
        if (req.body.password) {
            try {

                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            catch (err) {
                res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.send("account has been updated")
        }
        catch (err) {
            res.send(err)
        }
    }

    else {
        res.send("you cannot update the user")
    }

})

//delete user

router.delete('/:id', async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmine) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted succesfully")
        }
        catch (err) {
            res.send(err)
        }
    }
    else {
        res.status(500).json("you cannot delete the user")
    }
})

//get a user

router.get('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        const { password, updatedAt, ...other } = user._doc
        res.send(other)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

//follow user




module.exports = router;
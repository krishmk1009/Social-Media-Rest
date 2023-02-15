const router = require('express').Router();
const Post = require("../models/post")

router.get('/', (req, res) => {
    res.send("hii this is post routers")
})

//create a post 

router.post('/', async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }
    catch (err) {
        res.status(401).json(err)
    }
})

//update a post
// http://localhost:3000/api/posts/63e8a3904f0ab29ec95760b2   -- should be id of post and in json (is should be of user)
router.put('/:id', async (req, res) => {
    try {
        const userPost = await Post.findById(req.params.id);
        if (userPost.userId === req.body.userId) {

            await userPost.updateOne({ $set: req.body })
            res.status(200).json("updated succesfully")
        }
        else {
            res.status(403).json("you cannot update the post")
        }

    }

    catch (err) {
        res.status(404).json(err)
    }
})


//delete
// http://localhost:3000/api/posts/63e8a3904f0ab29ec95760b2   -- should be id of post and in json (is should be of user)
router.delete('/:id', async (req, res) => {
    try {
        const userPost = await Post.findById(req.params.id);
        if (userPost.userId === req.body.userId) {

            await userPost.delete()
            res.status(200).json("deleted succesfully")
        }
        else {
            res.status(403).json("you cannot delete the post")
        }

    }

    catch (err) {
        res.status(404).json(err)
    }
})

//like
// http://localhost:3000/api/posts/63ece8df28cbce256935a1e2/like
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } })
                res.status(200).json("liked a post")
            }
            else {
                await post.updateOne({ $pull: { likes: req.body.userId } })
                res.status(200).json("disliked a post")
            }
        } else {
            res.status(404).json("Post not found")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//get a post
// http://localhost:3000/api/posts/63ece8df28cbce256935a1e2
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.status(200).json(post)
        }
        else {
            res.status(403).json("post not found")
        }

    }
    catch (err) {
        res.status(200).json(err)
    }
})

//fetch all post

router.get('/timeline/all', async (req, res) => {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id })
    const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
            Post.find({ userId: friendId })
        })
    );
    res.status(200).json(err)
})
module.exports = router
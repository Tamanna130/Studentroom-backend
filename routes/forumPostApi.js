const express = require('express')
const router = express.Router()
const postVerification = require("../middlewares/postVerification")


const Post = require ('../models/discussion_forum/Post')
router.post('/api/post/create',postVerification, async (req, res) => {
    try {
        const post = new Post(req.body)
        await post.save()
        res.status(200).send(post)
    } catch (err) {
        res.status(500).send({error:err.message})
    }
    
})


router.get('/api/post/all', async (req, res) => {
    try {
        const allPost = await Post.find()
        res.send(allPost)
    } catch (err) {
        res.status(500).send(err)
    }
    
})
module.exports = router
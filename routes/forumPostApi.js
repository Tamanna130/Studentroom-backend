const express = require('express')
const router = express.Router()
const Post = require ('../models/discussion_forum/Post')
router.post('/api/post/create', async (req, res) => {
    try {
        const post = new Post(req.body)
        await post.save()
        res.status(200).send({ message: "Forum Post Created" })
    } catch (err) {
        res.status(500).send(err)
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
const express = require('express')
const router = express.Router()
const postVerification = require("../middlewares/postVerification")
const Post = require ('../models/Post')

const loginVerification = require("../middlewares/checkLogin")
router.use('/api',loginVerification)
router.post('/create', async (req, res) => {
    try {
        const post = new Post(req.body)
        await post.save()
        res.status(200).send(post)
    } catch (err) {
        console.log(err)
        res.status(500).send({error:err.message})
    }
    
})


router.get('/all', async (req, res) => {
    try {
        const allPost = await Post.find()
        res.send(allPost)
    } catch (err) {
        console.log(err)
        if(err == "Authentication failure!") {
            res.status(401).send({error:err})
        } else {
            res.status(500).send(err)
        }
    }
    
})
module.exports = router
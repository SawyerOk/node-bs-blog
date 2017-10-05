const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');
const {Post} = require('./../server/models/posts');

router.get('/', (req,res)=>{
    res.send('admin');
});

router.post('/delete/:id', (req, res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).redirect('404Error');
    }
    Post.findByIdAndRemove(id)
        .then( post =>{
            if(!post) {
                return res.send('Post not foud');
            }
           res.send('post was deleted');
        })
});


module.exports = router;
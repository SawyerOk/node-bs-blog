const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');
const {Post} = require('./../models/posts');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.json());

router.get('/', (req,res)=>{
    res.render('index', {
        adminRule : 'yes'
    });
});

function checkId(req){
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).redirect('404Error');
    }
    return id
};

function postNotFound(post){
    if(!post) {
        return res.send('Post not foud');
    }
}

router.get('/posts', (req,res)=>{
    Post.find()
        .then( posts=>{
            res.render('posts', {
                posts,
                adminRule : 'true'
            })
        })
        .catch(e =>{
            res.send('error');
        })
});


router.post('/delete/:id', (req, res)=>{
    const id = checkId(req);
    Post.findByIdAndRemove(id)
        .then( post =>{
           postNotFound(post);
           res.send('post was deleted');
        })
        .catch(e=>{
            res.send('error');
        })
});

router.get('/posts/:id', (req,res)=>{
   const id = checkId(req);
   Post.findById(id)
    .then( post =>{
        postNotFound(post);
        res.render('single-post', {
            adminRule : 'yes',
            post
        })
    })
    .catch(e=>{
        res.send('error');
    });
});

router.post('/update/:id',urlencodedParser, (req, res)=>{
    let id = checkId(req);
    let title = req.body.title; 
    let text = req.body.text;

    Post.findByIdAndUpdate(id, {$set: {title, text}},{new : true} )
        .then(post=> {
            console.log(post);
            res.send(`${post} succes`);
        })
        .catch(e=>{
            res.send('error');
        });

});


module.exports = router;
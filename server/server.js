require ('./config/config');

const express = require('express');
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const moment = require('moment');
const {ObjectID} = require('mongodb');


const {Post} = require('./models/posts');


const port = process.env.PORT;

const app = express();

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// const content = require('./../routes/content');
const env = process.env.NODE_ENV || 'development';

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

//View engine
app.set('views', path.join(__dirname, './../views'));
app.engine('handlebars', exphbs({defaultLayout : 'layout'}));
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, '/../public')));




app.post('/createPost',urlencodedParser, (req, res)=>{
    console.log(req.body);
	
    
    const post = new Post({
        title : req.body.title, 
        text : req.body.text,
        createdAt : moment().valueOf()
    });

    post.save()
        .then( post => {
            if(env === 'test'){
                res.send({post});
            } else {
                res.redirect('posts');

            }
            
        }, (e) => {
            res.status(400).send(e);
        });
});

app.get('/posts/:id', (req,res)=> {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).render('404Error');
    }
   
    
    Post.findById(id)
        .then( post => {
            if(!post) {
                return res.status(404).render('404Error');
            }
            if(env === 'test'){
                res.send({post});
            } else {
                res.render('single-post', {post});

            }  
            
           
        })
        .catch((e)=>{
            res.status(400).render('400Error');
        });


});

app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/create', (req, res)=>{
    res.render('createPost');
});

app.get('/createPost', (req,res)=>{
    res.render('createPost');
});

app.get('/posts', (req,res)=>{
    Post.find()
        .then( posts => {
            // testing
            
            if(env === "test"){
                res.send({posts});
            } else {
                res.render('posts', {posts} );

            }
        }, (e)=>{
            res.status(400).send(e);
        });
}); 

app.listen(port, ()=>{
    console.log(`Started at ${port}`);
    console.log(process.env.MONGOLAB_URI);
})

module.exports = {app};
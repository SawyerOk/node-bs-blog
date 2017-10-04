require ('./config/config');

const express = require('express');
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

const {Post} = require('./models/posts');

const port = process.env.PORT;

const app = express();

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// const content = require('./../routes/content');

app.use(bodyParser.json());

//View engine
app.set('views', path.join(__dirname, './../views'));
app.engine('handlebars', exphbs({defaultLayout : 'layout'}));
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, '/../public')));



app.post('/posts', (req, res)=>{
    const post = new Post({
        title : req.body.title, 
        text : req.body.text,
        createdAt : req.body.completedAt
    });

    post.save()
        .then( post => {
            res.send(post);
        }, (e) => {
            res.status(400).send(e);
        });
});

app.get('/posts/:title', (req,res)=> {
    const title = req.params.title;
   
    
    Post.findOne({ title })
        .then( post => {
            if(!post) {
                return res.status(404).send();
            }       
        
            res.send({post});
        })
        .catch((e)=>{
            res.status(400).send();
        });


});

app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/posts', (req,res)=>{
    Post.find()
        .then( posts => {
            // testing
            //res.send({posts});
            
            res.render('content', {posts} );
        }, (e)=>{
            res.status(400).send(e);
        });
}); 

app.listen(port, ()=>{
    console.log(`Started at ${port}`);
})

module.exports = {app};
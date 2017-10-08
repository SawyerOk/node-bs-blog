const JWT = require('jsonwebtoken');

const User = require ('./../models/user');
const {JWT_SECRET} = require('./../config');

signToken = user => {
    return JWT.sign({
        sub: user._id
    }, JWT_SECRET);
}

module.exports = {
    signUp : (req,res,next) => {
        const {email, password} = req.value.body;
        User.findOne({email})
        .then( user=>{
            if(user) {
                throw new Error('Email is used');
            } else {
                const newUser = new User({email, password});
                newUser.save();
                return(newUser);
            }
        })
        .then((newUser)=>{
            const token = signToken(newUser);
            res.status(200).send('success');
        })
        .catch( e=>{
            res.status(400).send(`${e}`);
        } );
    },

    secret : (req,res,next)=> {
        console.log('I manage sercret');
        res.json({secret : 'resource'});
    },

    signIn : (req,res,next) => {
        res.send('Log In');
    }
}
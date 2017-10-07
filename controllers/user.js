const User = require ('./../models/user');

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
            }
        })
        .then(()=>{
            res.status(200).send('User has benn saved');
        })
        .catch( e=>{
            res.status(400).send(`${e}`);
        } );
    }
}
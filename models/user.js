const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required: true
    },
    password : {
        require : true,
        type : String
    }
});

//Before saving, it creates and saves hashpassword instead plain password 
userSchema.pre('save', function(next){
    bcrypt.genSalt(10)
        .then((salt)=>{
            let newPass =bcrypt.hash(this.password, salt);
            return newPass;
        })
        .then((hashPassword)=>{
            this.password = hashPassword;
            next();
        })
        .catch(e=>{ 
            next(e);
        })
});

//If passwords are different, sends false.
userSchema.methods.validPassword = function(newPassword) {
    return bcrypt.compare(newPassword, this.password)
        .then(flag=>{
            if(!flag) return false;
            return this;
        })
        .catch(e=>{
            res.send(e);
        });
}



const User = mongoose.model('user', userSchema);

module.exports = User;
const Joi = require('joi');

module.exports = {
    validateBody : (schema) => {
        return (req,res,next) =>{
            console.log('Body : ', req.body);
            const result = Joi.validate(req.body, schema);

            if(result.error){
                console.log('Error in Joi');
                return res.status(400).send(result.error);
            }

            if(!req.value) { 
                req.value = {};
            }
            req.value['body'] = result.value;
            next();

        }
    },

    schemas : {
        authSchema : Joi.object().keys({
            email : Joi.string().email().required(),
            password : Joi.string().required()
        })
    }
}
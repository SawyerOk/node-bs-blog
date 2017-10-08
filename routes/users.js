const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('./../passport');
const bodyParser = require('body-parser');

const { validateBody, schemas } = require('./../helpers/routeHelpers');
const UserController = require('./../controllers/user');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(bodyParser.json());


router.route('/signup')
    .post(urlencodedParser, validateBody(schemas.authSchema), UserController.signUp);
    // .post(urlencodedParser, (req,res)=>{
    //     res.send(req.body);
    // });


router.route('/secret')
    .get(passport.authenticate('jwt', {session : false}), UserController.secret);

router.route('/signin')
    // .post(validateBody(schemas.authSchema), passport.authenticate('local', {session : false}), UserController.signIn);
    // .post( (req,res)=>{
    //     res.send('It is work');
    // })
    .post(urlencodedParser, validateBody(schemas.authSchema), passport.authenticate('local', { session: false }), UserController.signIn);


module.exports = router;
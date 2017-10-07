const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('./../helpers/routeHelpers');
const UserController = require('./../controllers/user');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

module.exports = router;
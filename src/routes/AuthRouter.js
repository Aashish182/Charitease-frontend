const { signupValidation, loginValidation } = require('./AuthValidation');
const { signup, login } = require('./AuthController');

const router = require('express').Router();

router.post('/login',loginValidation, login);

router.post('/signup',signupValidation, signup);

module.exports = router;
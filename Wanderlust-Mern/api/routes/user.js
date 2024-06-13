const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl, validateUserRegister, verifyJWT } = require('../middleware.js');
const { validateUserLogin } = require('../middleware.js');
const userController = require('../controllers/userController.js');


// <==============================   LOGIN & LOGOUT  ROUTE    ======================================================>
router.route("/login")
    // .get(userController.loginForm)

    .post(saveRedirectUrl,validateUserLogin, 
        passport.authenticate('local', { failureFlash: false }),
        userController.login
    );

// router.get('/logout', userController.logout);
router.post('/logout', verifyJWT, userController.logout);

// <==============================   SIGNUP  ROUTE    ======================================================>
router.route("/register")
    // .get(userController.signupForm)

    .post(validateUserRegister, wrapAsync(userController.signup));

module.exports = router;
const express = require('express');
const router = express.Router();
const { isLoggedin, isOwner, validateList, verifyJWT } = require('../middleware.js');
const listController = require('../controllers/listController.js');
const multer  = require('multer');

const { storage }  = require('../cloudConfing.js');
// const upload = multer({ storage });

// const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files


const upload = multer({ storage });

router.route("/add")
    .get(isLoggedin, listController.add)
    
    // .delete( upload.single("image"), validateList, listController.create)
    .post( verifyJWT, upload.single("image"), validateList, listController.create);
    // .post(isLoggedin, upload.single("list[image]"), validateList, listController.create);

router.route("/:id")
    .get(listController.show)
    
    // .delete(isLoggedin, isOwner, listController.destroy);
    .delete( verifyJWT, listController.destroy);

router.route("/:id/edit")
    .get(isLoggedin, isOwner, listController.edit)
    
    // .put(isLoggedin, isOwner, upload.single("list[image]"), validateList, listController.update);
    .put( verifyJWT, upload.single("image"), validateList, listController.update);

module.exports = router;
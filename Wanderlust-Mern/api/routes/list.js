const express = require('express');
const router = express.Router();
const { isLoggedin, isOwner, validateList } = require('../middleware.js');
const listController = require('../controllers/listController.js');
const multer  = require('multer');

// const { storage }  = require('../cloudConfing.js');
// const upload = multer({ storage });

// const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname); // File naming convention
    }
});

const upload = multer({ storage });

router.route("/add")
    .get(isLoggedin, listController.add)
    
    // .post(isLoggedin, upload.single("list[image]"), validateList, listController.create);
    .post( upload.single("image"), validateList, listController.create);

router.route("/:id")
    .get(listController.show)
    
    .delete(isLoggedin, isOwner, listController.destroy);

router.route("/:id/edit")
    .get(isLoggedin, isOwner, listController.edit)
    
    // .put(isLoggedin, isOwner, upload.single("list[image]"), validateList, listController.update);
    .put( upload.single("image"), validateList, listController.update);

module.exports = router;
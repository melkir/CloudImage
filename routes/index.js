var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/profile', upload.single('image'), function (req, res, next) {
    // req.file is the `image` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads'});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', message: '', imagePath: ''});
});

router.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file is the `image` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    res.render('index', {
        title: 'Image uploaded',
        message: 'File upload successfully',
        imagePath: req.file.filename
    });
});

module.exports = router;

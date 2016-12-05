var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads'});
var jimp = require("jimp");

var image;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', message: '', imagePath: ''});
});

router.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file is the `image` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    image = req.file;
    res.render('index', {
        title: 'Image uploaded',
        message: 'File upload successfully',
        imagePath: image.filename
    });
});

router.get('/grayscale', function (req, res, next) {
    transformGrayScale(res);
});

router.get('/brightness', function (req, res, next) {
    var value = parseFloat(req.query.brightnessValue);
    transformBrightness(res, value);
});

function transformGrayScale(res) {
    jimp.read(image.path).then(function (newImage) {
        newImage.greyscale().write(image.path + ".jpg");
        res.render('index', {
            title: 'Image transform',
            message: 'Image process successfully',
            imagePath: image.filename + ".jpg"
        })
    }).catch(function (err) {
        console.error(err);
    })
}

function transformBrightness(res, value) {
    jimp.read(image.path).then(function (newImage) {
        newImage.brightness(value).write(image.path + ".jpg");
        res.render('index', {
            title: 'Image transform',
            message: 'Image process successfully',
            imagePath: image.filename + ".jpg"
        })
    }).catch(function (err) {
        console.error(err);
    })
}

function transformRounded(res, value) {

}

function transformCropRounder(res, value) {
    jimp.read(image.path).then(function (newImage) {
        newImage.crop(value, value, value, value).write(image.path + ".jpg");
        res.render('index', {
            title: 'Image transform',
            message: 'Image process successfully',
            imagePath: image.filename + ".jpg"
        })
    }).catch(function (err) {
        console.error(err);
    })
}

module.exports = router;

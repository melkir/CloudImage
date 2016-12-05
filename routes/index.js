"use strict";

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const jimp = require("jimp");

let image;

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express', message: 'Select an image', imagePath: ''});
});

router.post('/upload', upload.single('image'), function (req, res) {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  if (req.file == null) return;
  console.log(req.file);
  image = req.file;
  res.render('index', {
    title: 'Express',
    message: 'File upload successfully',
    imagePath: image.filename
  });
});

router.get('/grayscale', function (req, res) {
  transformGrayScale().then(path => {
    res.render('index', {
      title: 'Express',
      message: 'Image transformed successfully',
      imagePath: path
    })
  }).catch(err => {
    console.error(err);
  });
});

router.get('/brightness', function (req, res) {
  const value = parseFloat(req.query.value);
  transformBrightness(value).then(path => {
    res.render('index', {
      title: 'Express',
      message: 'Image transformed successfully',
      imagePath: path
    }).catch(err => {
      console.error(err);
    })
  });
});

function transformGrayScale() {
  return new Promise(function (resolve, reject) {
    jimp.read(image.path).then(newImage => {
      newImage.greyscale().write("uploads/" + image.originalname);
      resolve(image.originalname);
    }).catch(err => {
      reject(err);
    });
  });
}

function transformBrightness(value) {
  return new Promise(function (resolve, reject) {
    jimp.read(image.path).then(function (newImage) {
      newImage.brightness(value).write("uploads/" + image.originalname);
      resolve(image.originalname);
    }).catch(function (err) {
      reject(err);
    });
  })
}

module.exports = router;

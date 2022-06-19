var express = require('express');
var router = express.Router();
// const multer = require('multer');
// const os = require('os');
const { signup, signin } = require('./controller');
const upload = require('../../config/cloudinaryConfig');

router.post('/signup', upload.any(), signup); //multer({ dest: os.tmpdir() }).single('image')
router.post('/signin', signin);

module.exports = router;

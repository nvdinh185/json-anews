const express = require('express');
const router = express.Router();

const newsController = require('../controllers/NewsController');

router.get('/', newsController.getListNews);
router.get('/newsbycat', newsController.getListNewsByCat);
router.get('/newsbyid', newsController.getListNewsById);

module.exports = router;

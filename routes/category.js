const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');

router.get('/', categoryController.getListCats);
router.get('/catbyid', categoryController.getCatDetail);

module.exports = router;

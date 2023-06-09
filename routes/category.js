const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');

router.get('/', categoryController.getListCats);
router.get('/catbyid', categoryController.getCatById);

module.exports = router;

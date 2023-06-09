const Category = require("../model/category.js");

class CategoryController {

    // [GET] /cat
    async getListCats(req, res) {
        try {
            const listCats = await Category.find();
            res.status(200).json(listCats);
        } catch (err) {
            res.status(500).json(err);
        } finally {
            // db.close();
        }
    }

    // [GET] /cat/catbyid
    async getCatById(req, res) {
        var id = req.query.id;
        try {
            const catById = await Category.findOne({ id });
            res.status(200).json(catById);
        } catch (err) {
            res.status(500).json(err);
        } finally {
            // db.close();
        }
    }
}

module.exports = new CategoryController();

const News = require("../model/news.js");

class NewsController {

    // [GET] /news
    async getListNews(req, res) {
        try {
            const listNews = await News.find();
            res.status(200).json(listNews);
        } catch (err) {
            res.status(500).json(err);
        } finally {
            // db.close();
        }
    }

    // [GET] /news/newsbycat
    async getListNewsByCat(req, res) {
        var catId = req.query.cid;
        try {
            const listNewsByCat = await News.find({ cat_id: catId });
            res.status(200).json(listNewsByCat);
        } catch (err) {
            res.status(500).json(err);
        } finally {
            // db.close();
        }
    }

    // [GET] /news/newsbyid
    async getNewsById(req, res) {
        var id = req.query.id;
        try {
            const newsById = await News.findOne({ id });
            res.status(200).json(newsById);
        } catch (err) {
            res.status(500).json(err);
        } finally {
            // db.close();
        }
    }
}

module.exports = new NewsController();

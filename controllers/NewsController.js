const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/news.db';

class NewsController {

    // [GET] /news
    async getListNews(req, res) {
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const listNews = await new Promise((resolve, reject) => {
                db.all(`SELECT * FROM news`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listNews);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            db.close();
        }
    }

    // [GET] /news/newsbycat
    async getListNewsByCat(req, res) {
        var catId = req.query.cid;
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const listNewsByCat = await new Promise((resolve, reject) => {
                db.all(`SELECT * FROM news WHERE cat_id = ${catId}`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listNewsByCat);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            db.close();
        }
    }

    // [GET] /news/newsbyid
    async getNewsById(req, res) {
        var id = req.query.id;
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const news = await new Promise((resolve, reject) => {
                db.each(`SELECT * FROM news WHERE id = ${id}`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(news);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            db.close();
        }
    }
}

module.exports = new NewsController();

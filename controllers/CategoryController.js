const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/news.db';

class CategoryController {

    // [GET] /cat
    async getListCats(req, res) {
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const listNews = await new Promise((resolve, reject) => {
                db.all(`SELECT * FROM category`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).json(listNews);
        } catch (err) {
            res.status(500).json(err);
        } finally {
            db.close();
        }
    }

    // [GET] /cat/catbyid
    async getCatDetail(req, res) {
        var id = req.query.id;
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const news = await new Promise((resolve, reject) => {
                db.each(`SELECT * FROM category WHERE id = ${id}`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).json(news);
        } catch (err) {
            res.status(500).json(err);
        } finally {
            db.close();
        }
    }
}

module.exports = new CategoryController();

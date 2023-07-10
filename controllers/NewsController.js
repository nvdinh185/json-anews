const mysql = require('mysql');

const configDB = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "anews"
};

class NewsController {

    // [GET] /news
    async getListNews(req, res) {
        try {
            var conn = mysql.createConnection(configDB);

            const listNews = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM news`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listNews);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /news/newsbycat
    async getListNewsByCat(req, res) {
        var catId = req.query.cid;
        try {
            var conn = mysql.createConnection(configDB);

            const listNewsByCat = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM news WHERE cat_id = ${catId}`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(listNewsByCat);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /news/newsbyid
    async getNewsById(req, res) {
        var id = req.query.id;
        try {
            var conn = mysql.createConnection(configDB);

            const news = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM news WHERE id = ${id}`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).send(news[0]);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [POST] /news/contact
    async postContact(req, res) {
        const { name, phone, web, gender, content, file } = req.form_data;
        function generateUuid() {
            return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        try {
            var conn = mysql.createConnection(configDB);

            await new Promise((resolve, reject) => {
                conn.query(`INSERT INTO contact (name, phone, web, gender, picture, content) VALUES (?, ?, ?, ?, ?, ?)`,
                    [name, phone, web, gender, file, content], function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
            })
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        } finally {
            conn.end();
        }
    }
}

module.exports = new NewsController();

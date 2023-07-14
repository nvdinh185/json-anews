const formidable = require('formidable');
const fs = require('fs');

class Middleware {

    uploadFile(req, res, next) {
        const dirUpload = 'uploads';
        if (!fs.existsSync(dirUpload)) fs.mkdirSync(dirUpload);
        const form = new formidable.IncomingForm();
        form.uploadDir = dirUpload;
        form.parse(req, (err, fields, files) => {
            var formData = {};
            if (err) {
                res.sendStatus(500);
            } else {
                // for (var key in fields) {
                //     formData[key] = fields[key];
                // }
                formData = fields;
                var isSelectedFile = !(Object.entries(files).length === 0 && files.constructor === Object);
                var key = "file";
                // Nếu có chọn file thì xử lý upload file
                if (isSelectedFile) {
                    var fileName = files[key].name.split('.')[0];
                    var ext = files[key].name.split('.')[1];
                    // đường dẫn thực file upload lên
                    var newPath = `${dirUpload}/${fileName}_${Date.now()}.${ext}`;
                    var oldPath = files[key].path;
                    // đổi tên file
                    fs.renameSync(oldPath, newPath);

                    formData[key] = newPath.slice(8);
                } else {
                    formData[key] = '';
                }
                // console.log(formData);
                req.form_data = formData;
                next();
            }
        })
    }
}

module.exports = new Middleware();
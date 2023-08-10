$("#contact").addClass('active');
var form = $('.frmContact');

form.on("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    for (const el of e.target) {
        if (el.files) {
            formData.append("file", el.files[0]);
        } else if (el.name) {
            formData.append(el.name, el.value);
        }
    }
    var errorElement = $('#error');
    try {
        var results = await axios({
            method: "POST",
            url: "http://localhost:3000/news/contact",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        //handle success
        console.log('results: ', results);
        errorElement.replaceWith('<p style="color: green; font-style: italic; background-color: yellow">Gửi liên hệ thành công!</p>');

    } catch (err) {
        errorElement.replaceWith('<p style="color: red; font-style: italic; background-color: yellow">Xảy ra lỗi!</p>');
    }
})
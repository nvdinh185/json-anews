$("#contact").addClass('active');
var form = $('.frmContact');

form.on("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    for (const el of e.target) {
        if (el.files) {
            formData.append("file", el.files[0]);
        } else {
            formData.append(el.name, el.value);
        }
    }

    var msgElement = $('#msg');
    try {
        var results = await axios({
            method: "POST",
            url: "http://localhost:3000/news/contact",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        //handle success
        console.log('results: ', results);
        msgElement.replaceWith(`<p style="background-color: yellow; color: green; font-style: italic;">Thêm liên hệ thành công!</p>`);

    } catch (error) {
        console.log(error);
        msgElement.replaceWith(`<p style="background-color: yellow; color: red; font-style: italic;">Xảy ra lỗi ${error}</p>`);
    }
})
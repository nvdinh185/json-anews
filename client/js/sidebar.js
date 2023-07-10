async function getData() {
    const listCatElement = $("#list-cat");
    try {

        var listCat = await axios.get('http://localhost:3000/cat');

        listCat = listCat.data;

        listCat.forEach(function (cat) {
            const liElement = $('<li></li>');
            liElement.html(`
                <a href="danhmuc.html?cid=${cat.id}">${cat.name}</a>
            `);

            listCatElement.append(liElement);

        })
    } catch (error) {
        console.log(error);
        listCatElement.append(`<li style="color: red; font-style: italic;">Xảy ra lỗi ${error}</li>`);
    }
}

getData();
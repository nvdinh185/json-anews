const ulElement = $("#list-news");

async function getData() {
    var listNews = await axios.get('http://localhost:3000/news');
    listNews = listNews.data;

    listNews.forEach(function (news) {
        const liElement = $('<li></li>');
        liElement.html(`
            <h2>
                <a href="chitiet.html?did=${news.id}" title="">${news.description}</a>
            </h2>
            <div class="item">
                <p>${news.detail}</p>
                <div class="clr"></div>
            </div>
        `);

        ulElement.append(liElement);

    })

    const listCatElement = $("#list-cat");

    var listDanhMuc = await axios.get('http://localhost:3000/categories');

    listDanhMuc = listDanhMuc.data;

    listDanhMuc.forEach(function (news) {
        const liElement = $('<li></li>');
        liElement.html(`
                <a href="danhmuc.html?cid=${news.id}">${news.name}</a>
            `);

        listCatElement.append(liElement);

    })
}

getData();
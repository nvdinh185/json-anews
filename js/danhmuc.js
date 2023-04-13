function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var cId = getParameterByName('cid');

async function getData() {
    const ulElement = $("#list-news-by-cat");

    var listNews = await axios.get('http://localhost:3000/news');
    listNews = listNews.data;

    var listNewsByCat = listNews.filter(function (news) {
        return news.catId === cId;
    })

    listNewsByCat.forEach(function (news) {
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

    const listCatElement = $("#list-danhmuc");

    var listDanhMuc = await axios.get('http://localhost:3000/categories');

    listDanhMuc = listDanhMuc.data;

    listDanhMuc.forEach(function (news) {
        const liElement = $('<li></li>');
        liElement.html(`
                <a href="danhmuc.html?cid=${news.id}">${news.name}</a>
            `);

        listCatElement.append(liElement);

    })

    var catName = listDanhMuc.find(function (it) {
        return it.id === cId;
    }).name;

    var h3 = $('#cat-name');

    h3.text('Tin tức :: ' + catName);
}

getData();
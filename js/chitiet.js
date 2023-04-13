function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var dId = getParameterByName('did');

async function getData() {

    const detailElement = $("#detail");

    var newsById = await axios.get(`http://localhost:3000/news/${dId}`);

    newsById = newsById.data;

    detailElement.html(`
            <h3>${newsById.description}</h3>
            <div class="main-content">
                <p>${newsById.detail}</p>
            </div>
        `);

    const listCatElement = $("#list-cat");

    var listCat = await axios.get('http://localhost:3000/categories');

    listCat = listCat.data;

    listCat.forEach(function (news) {
        const liElement = $('<li></li>');
        liElement.html(`
                <a href="danhmuc.html?cid=${news.id}">${news.name}</a>
            `);

        listCatElement.append(liElement);

    })
}

getData();
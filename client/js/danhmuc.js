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
    try {
        var listNewsByCat = await axios.get(`http://localhost:3000/news/newsbycat?cid=${cId}`);
        listNewsByCat = listNewsByCat.data;

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

        var catById = await axios.get(`http://localhost:3000/cat/catbyid?id=${cId}`);

        catById = catById.data;

        var catName = catById.name;

        var h3 = $('#cat-name');

        h3.text('Tin tức :: ' + catName);
    } catch (err) {
        console.log('Lỗi ' + err);
        ulElement.append(`<p style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!<p/>`);
    }
}

getData();
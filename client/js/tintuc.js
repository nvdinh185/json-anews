$("#news").addClass('active');

async function getData() {
    const ulElement = $("#list-news");

    try {
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
    } catch (err) {
        console.log('Lỗi ' + err);
        ulElement.html(`<li style='color: red; font-style: italic;'>Xảy ra lỗi khi lấy dữ liệu!</li>`);
    }
}

getData();
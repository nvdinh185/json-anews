async function getData() {
    try {
        const listCatElement = $("#list-cat");

        var listCat = await axios.get('http://localhost:3000/acategories');

        listCat = listCat.data;

        listCat.forEach(function (news) {
            const liElement = $('<li></li>');
            liElement.html(`
                <a href="danhmuc.html?cid=${news.id}">${news.name}</a>
            `);

            listCatElement.append(liElement);

        })
    } catch (error) {

    }
}

getData();
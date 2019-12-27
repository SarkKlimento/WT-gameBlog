let userId;

function load(page) {
    $.ajax({
        type: "POST",
        url: 'php/news.php',
        dataType: 'json',
        data: {page: page}
    }).done(data => {
        console.log('done');
        console.log(data);
    }).fail(data => {
        console.log('fail');
        console.log(data)
    }).always(data => {
        console.log('alvays');
        console.log(data);
    });

    userId = 'someId';
    document.cookie = "userId=" + userId;

    if (userId && userId.length > 0) {
        $("#login-click-button").addClass("display-none");
        $("#lc-click-button").removeClass("display-none");
    } else {
        $("#login-click-button").removeClass("display-none");
        $("#lc-click-button").addClass("display-none");
    }

    let news = {
        values: [
            {
                name: "Some name",
                iconPath: "https://compass-ssl.xbox.com/assets/dc/48/dc486960-701e-421b-b145-70d04f3b85be.jpg?n=Game-Hub_Content-Placement-0_New-Releases-No-Copy_740x417_02.jpg",
                date: "12.12.12",
                index: "id"
            },
            {
                name: "Some name",
                iconPath: "https://compass-ssl.xbox.com/assets/dc/48/dc486960-701e-421b-b145-70d04f3b85be.jpg?n=Game-Hub_Content-Placement-0_New-Releases-No-Copy_740x417_02.jpg",
                date: "12.12.12",
                index: "id"
            },
            {
                name: "Some name",
                iconPath: "https://compass-ssl.xbox.com/assets/dc/48/dc486960-701e-421b-b145-70d04f3b85be.jpg?n=Game-Hub_Content-Placement-0_New-Releases-No-Copy_740x417_02.jpg",
                date: "12.12.12",
                index: "id"
            },
            {
                name: "Some name",
                iconPath: "https://compass-ssl.xbox.com/assets/dc/48/dc486960-701e-421b-b145-70d04f3b85be.jpg?n=Game-Hub_Content-Placement-0_New-Releases-No-Copy_740x417_02.jpg",
                date: "12.12.12",
                index: "id"
            },
            {
                name: "Some name",
                iconPath: "https://compass-ssl.xbox.com/assets/dc/48/dc486960-701e-421b-b145-70d04f3b85be.jpg?n=Game-Hub_Content-Placement-0_New-Releases-No-Copy_740x417_02.jpg",
                date: "12.12.12",
                index: "id"
            }
        ],
        nextPage: true,
        prevPage: false
    };

    news.values.forEach(value => createNewsElement(value));
    $("#prev-page-nav").prop('disabled', news.prevPage);
    $("#next-page-nav").prop('disabled', news.nextPage);
}

function createNewsElement(value) {
    if (value && value.name && value.iconPath && value.date && value.index) {
        let elements = "<a  href=\"pages/newsPage.html?id={index}\" class=\"col-12 col-sm-12 col-lg-6 col-xl-3 container news-block\"><div class=\"container news-spacing\"><div class=\"row\"><img src=\"{iconPath}\" /></div><div class=\"row news-header\"><p>{header}</p></div><div class=\"row\"><span class='text-right'>{footer}</span></div></div></div>";
        elements = elements.replace("{header}", value.name);
        elements = elements.replace("{iconPath}", value.iconPath);
        elements = elements.replace("{index}", value.index);
        elements = elements.replace("{footer}", value.date);
        $("#body-content").append($(elements));
    }
}

function createBanner() {
    const bannerData = {
        iconPath: "https://compass-ssl.xbox.com/assets/dc/48/dc486960-701e-421b-b145-70d04f3b85be.jpg?n=Game-Hub_Content-Placement-0_New-Releases-No-Copy_740x417_02.jpg",
        bannerRows: [
            {
                text: "some Text",
                index: "someIndex"
            },
            {
                text: "some Text",
                index: "someIndex"
            },
            {
                text: "some Text",
                index: "someIndex"
            },
            {
                text: "some Text",
                index: "someIndex"
            },
            {
                text: "some Text",
                index: "someIndex"
            },
            {
                text: "some Text",
                index: "someIndex"
            }
        ]
    };

    let elements = "<div class=\"col-lg-2 col-5\">{bannerRows}</div><div class=\"col\"><img src=\"{iconPath}\"/></div>";
    let bannerRows = "";

    bannerData.bannerRows.forEach(value => bannerRows += createBannerRow(value));
    elements = elements.replace("{iconPath}", bannerData.iconPath);
    elements = elements.replace("{bannerRows}", bannerRows);
    $("#banner-content").append($(elements));
}

function createBannerRow(value) {
    let element = "<a class=\"banner-row-link\" href='pages/newsPage.html?id={index}'><p class=\"banner-row\">{text}</p></a>";
    element = element.replace("{index}", value.index);
    return element.replace("{text}", value.text);
}

function modalChange(value) {
    if (value === 'login') {
        $("#email-field").addClass("display-none");
        $("#reg-text").addClass("display-none");
        $("#login-text").removeClass("display-none");
    } else {
        $("#email-field").removeClass("display-none");
        $("#reg-text").removeClass("display-none");
        $("#login-text").addClass("display-none");
    }
}

load(getURLParameter("page", 1));
createBanner();

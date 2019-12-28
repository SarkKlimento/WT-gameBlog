let userId;
let currentPage;

function load(page) {
    $.ajax({
        type: "POST",
        url: 'php/news.php',
        dataType: 'json',
        data: {type: "news", page: page}
    }).done(data => {
        currentPage = page;
        loadFromData(data);
    }).fail(data => {
        console.log('fail');
        console.log(data)
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
}

function loadFromData(news) {
    if (news && news.news) {
        $("#body-content").empty();
        news.news.forEach(value => createNewsElement(value));
        $("#prev-page-nav").prop('disabled', !news.prevPage);
        $("#next-page-nav").prop('disabled', !news.nextPage);
    }
}

function createNewsElement(value) {
    if (value && value.name && value.iconPath && value.postDate && value.id) {
        let elements = "<a  href=\"pages/newsPage.html?id={index}\" class=\"col-12 col-sm-12 col-lg-6 col-xl-3 container news-block\"><div class=\"container news-spacing\"><div class=\"row\"><img src=\"{iconPath}\" /></div><div class=\"row news-header\"><p>{header}</p></div><div class=\"row\"><span class='text-right'>{footer}</span></div></div></div>";
        elements = elements.replace("{header}", value.name);
        elements = elements.replace("{iconPath}", value.iconPath);
        elements = elements.replace("{index}", value.id);
        elements = elements.replace("{footer}", value.postDate);
        $("#body-content").append($(elements));
    }
}

function createBanner() {
    $.ajax({
        type: "POST",
        url: 'php/news.php',
        dataType: 'json',
        data: {type: "banner"}
    }).done(data => {
        loadBannerFromData(data);
    }).fail(data => {
        console.log('fail');
        console.log(data)
    });
}

function loadBannerFromData(bannerData) {
    let elements = "<div class=\"col-lg-2 col-5\">{bannerRows}</div><div class=\"col\"><img src=\"{iconPath}\"/></div>";
    let bannerRows = "";

    bannerData.bannerRows.forEach(value => bannerRows += createBannerRow(value));
    elements = elements.replace("{iconPath}", bannerData.iconPath);
    elements = elements.replace("{bannerRows}", bannerRows);
    $("#banner-content").append($(elements));
}

function createBannerRow(value) {
    let element = "<a class=\"banner-row-link\" href='pages/newsPage.html?id={index}'><p class=\"banner-row\">{text}</p></a>";
    element = element.replace("{index}", value.newsId);
    return element.replace("{text}", value.name);
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

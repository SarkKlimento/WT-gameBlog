let userId;
let userName;
let currentPage;
let operation;

function load(page) {
    operation = "reg";

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
    console.log(document.cookie);
    userId = document.cookie.replace("userId=", '');

    if (userId && userId.length > 0) {
        loadUser();
        $("#login-click-button").addClass("display-none");
        $("#lc-click-button").removeClass("display-none");
    } else {
        $("#user").addClass("display-none");
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

function loadUser() {
    $.ajax({
        type: "POST",
        url: 'php/news.php',
        dataType: 'json',
        data: {type: "userName", userId: userId}
    }).done(data => {
        $("#user").removeClass("display-none");
        userName = data;
        $("#userNameDisplay").prop('innerText', userName);
    }).fail(data => {
        console.log('fail');
        console.log(data)
    });
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
    operation = value;

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

function login() {
    const userN = $("#username").val();
    const userP = $("#password").val();
    const userE = $("#email").val();

    if ((operation === "reg" && userE && userN && userP) || (operation === "login" && userP && userN)) {
        $.ajax({
            type: "POST",
            url: 'php/user.php',
            dataType: 'json',
            data: {operation: operation, userName: userN, email: userE, password: userP}
        }).done(data => {
            if (data && data.length > 0) {
                userId = data;
                document.cookie = "userId=" + userId + ";path=/;";

                loadUser();
                $("#login-click-button").addClass("display-none");
                $("#lc-click-button").removeClass("display-none");
                $('#loginModal').modal('hide');
            }
        }).fail(data => {
            console.log('fail');
            console.log(data)
        });
    }
}

function logout() {
    userId = '';
    document.cookie = "userId=" + userId+ ";path=/;";
    userName = '';
    $("#user").addClass("display-none");
    $("#login-click-button").removeClass("display-none");
    $("#lc-click-button").addClass("display-none");
}

load(getURLParameter("page", 1));
createBanner();

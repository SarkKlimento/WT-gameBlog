let userId;
let newsIdRef;
let userName;
let operation;

function load(newsId) {
    operation = "reg";
    newsIdRef = newsId;
    $.ajax({
        type: "POST",
        url: '../php/newsPage.php',
        dataType: 'json',
        data: {index: newsId}
    }).done(data => {
        loadFromData(data);
    }).fail(data => {
        console.log('fail');
        console.log(data)
    });
    userId = document.cookie.replace("userId=", '');

    console.log(userId);
    if (!userId || userId.length === 0) {
        $("#commentSendSection").addClass("display-none");
        $("#user").addClass("display-none");
        $("#login-click-button").removeClass("display-none");
        $("#lc-click-button").addClass("display-none");
    } else {
        $("#user").removeClass("display-none");
        $("#commentSendSection").removeClass("display-none");
        loadUser();
        $("#login-click-button").addClass("display-none");
        $("#lc-click-button").removeClass("display-none");
    }
    $("#newsId").val(newsId);
}

function loadUser() {
    $.ajax({
        type: "POST",
        url: '../php/news.php',
        dataType: 'json',
        data: {type: "userName", userId: userId}
    }).done(data => {
        userName = data;
        $("#userName").val(userName);
        $("#userNameDisplay").prop('innerText', userName);
    }).fail(data => {
        console.log('fail');
        console.log(data)
    });
}

function loadFromData(data) {
    $("#main-image").prop('src', data.iconPath);
    $("#header-text").prop('innerText', data.header);
    $("#body-text").prop('innerText', data.body);
    if (data.comments) data.comments.forEach(value => createCommentBlock(value));
}

function createCommentBlock(value) {
    if (value.userName && value.body && value.creationDate) {
        let elements = "<div class=\"container row comment-block\"><div class=\"row user-name\"><p class=\"full\">{userName}</p></div><div class=\"row comment-body\"><p class=\"full\">{comment}</p></div><div class=\"row full\"><p class=\"text-right\">{commentDate}</p></div></div>";
        elements = elements.replace("{userName}", value.userName);
        elements = elements.replace("{comment}", value.body);
        elements = elements.replace("{commentDate}", value.creationDate);
        $("#comments").append($(elements));
    }
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
            url: '../php/user.php',
            dataType: 'json',
            data: {operation: operation, userName: userN, email: userE, password: userP}
        }).done(data => {
            if (data && data.length > 0) {
                userId = data;
                document.cookie = "userId=" + userId + ";path=/;";

                $('#loginModal').modal('hide');
                load(newsIdRef);
            }
        }).fail(data => {
            console.log('fail');
            console.log(data)
        });
    }
}


function logout() {
    userId = '';
    document.cookie = "userId=" + userId + ";path=/;";
    userName = '';
    $("#user").addClass("display-none");
    $("#login-click-button").removeClass("display-none");
    $("#lc-click-button").addClass("display-none");
    $("#commentSendSection").addClass("display-none");
}

load(getURLParameter("id", ""));
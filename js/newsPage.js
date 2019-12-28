let userId;

function load(newsId) {
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

load(getURLParameter("id", ""));
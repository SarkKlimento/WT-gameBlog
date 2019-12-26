let userId;

function load(newsId) {
    userId = document.cookie.replace("userId=", '');
    console.log(userId);
    const data = {
        iconPath: "https://compass-ssl.xbox.com/assets/dc/48/dc486960-701e-421b-b145-70d04f3b85be.jpg?n=Game-Hub_Content-Placement-0_New-Releases-No-Copy_740x417_02.jpg",
        header: "Amaithing news",
        body: "Some am body",
        comments: [
            {
                userName: "User",
                comment: "Some comment ksksks",
                commentDate: "07.07.2019"
            },
            {
                userName: "User",
                comment: "Some comment ksksks",
                commentDate: "07.07.2019"
            },
            {
                userName: "User",
                comment: "Some comment ksksks",
                commentDate: "07.07.2019"
            },
            {
                userName: "User",
                comment: "Some comment ksksks",
                commentDate: "07.07.2019"
            }
        ]
    };

    $("#main-image").prop('src', data.iconPath);
    $("#header-text").prop('innerText', data.header);
    $("#body-text").prop('innerText', data.body);
    data.comments.forEach(value => createCommentBlock(value));
}

function createCommentBlock(value) {
    if (value.userName && value.comment && value.commentDate) {
        let elements = "<div class=\"container row comment-block\"><div class=\"row user-name\"><p class=\"full\">{userName}</p></div><div class=\"row comment-body\"><p class=\"full\">{comment}</p></div><div class=\"row full\"><p class=\"text-right\">{commentDate}</p></div></div>";
        elements = elements.replace("{userName}", value.userName);
        elements = elements.replace("{comment}", value.comment);
        elements = elements.replace("{commentDate}", value.commentDate);
        $("#comments").append($(elements));
    }
}

load(getURLParameter("id", ""));
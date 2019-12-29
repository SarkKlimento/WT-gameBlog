<?php
header('Content-Type: text/html; charset=utf-8');
require "Database.php";

class NewsWrapper
{
    public $news;
    public $nextPage = false;
    public $prevPage = false;
}

class BannerWrapper
{
    public $iconPath;
    public $bannerRows;
}

switch ($_POST["type"]) {
    case "news":
        loadNews();
        break;
    case "banner":
        loadBanner();
        break;
    case "userName":
        getUserName();
        break;
}

function getUserName() {
    $userId = $_POST["userId"];

    echo json_encode(Database::query("SELECT * FROM users WHERE id='${userId}'")[0]["userName"]);
}

function loadNews()
{
    $wrapper = new NewsWrapper();
    $offset = ($_POST["page"] - 1) * 10;
    $wrapper->prevPage = $_POST["page"] != 1 ? true : false;

    $wrapper->news = Database::query("SELECT * FROM news ORDER BY id DESC LIMIT 10 OFFSET ${offset}");
    $count = Database::query( "SELECT COUNT(*) FROM `news`");

    $wrapper->nextPage = $_POST["page"] * 10 < $count[0]["COUNT(*)"];

    echo json_encode($wrapper);
}

function loadBanner()
{
    $wrapper = new BannerWrapper();
    $wrapper->bannerRows = Database::query("SELECT * FROM bannerItems ORDER BY id DESC LIMIT 10");
    $wrapper->iconPath = Database::query("SELECT * FROM banners ORDER BY createdDate DESC LIMIT 1")[0]["iconPath"];

    echo json_encode($wrapper);
}
?>

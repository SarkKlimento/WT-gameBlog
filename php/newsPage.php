<?php
header('Content-Type: text/html; charset=utf-8');
require "Database.php";

class NewsWrapper
{
    public $iconPath;
    public $header;
    public $body;
    public $comments;
}

$id = $_POST["index"];

$wrapper = new NewsWrapper();
$result = Database::query("SELECT * FROM `news` WHERE id=${id}");
$wrapper->iconPath = $result[0]["iconPath"];
$wrapper->header = $result[0]["name"];
$wrapper->body =$result[0]["description"];
$wrapper->comments = Database::query( "SELECT * FROM `comments` WHERE newsId=${id} ORDER BY creationDate");

echo json_encode($wrapper);
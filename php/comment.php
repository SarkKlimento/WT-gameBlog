<?php
require "Database.php";

$userName = $_POST["userName"];
$newsId = $_POST["newsId"];
$commentBody = $_POST["commentBody"];
$creationDate = date("Y/m/d");

try {
    $query = "INSERT INTO `comments`(`userName`, `creationDate`, `body`, `newsId`) VALUES ('${userName}','${creationDate}','${commentBody}','${newsId}' )";
    Database::query($query);
} catch (Exception $exception) {
}

header("Location: ../pages/newsPage.html?id=${newsId}");
exit();
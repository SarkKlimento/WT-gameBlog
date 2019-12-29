<?php
require "Database.php";
$operation = $_POST["operation"];
$userName = $_POST["userName"];
$email = $_POST["email"];
$password = $_POST["password"];

switch ($operation) {
    case "login":
        login($userName, $password);
        break;
    case "reg":
        reg($userName, $password, $email);
        break;
}

function login($userName, $password)
{
    $sqlQuery = "SELECT id FROM users WHERE userName='${userName}' AND password='${password}'";
    $result = Database::query($sqlQuery);

    echo json_encode($result[0]["id"]);
}

function reg($userName, $password, $email)
{
    $creationDate = date("Y/m/d");
    $sqlQuery = "INSERT INTO `users`(`userName`, `email`, `creationDate`, `password`) VALUES ('${userName}','${email}','${creationDate}','${password}')";
    $result = Database::query($sqlQuery);

    login($userName, $password);
}
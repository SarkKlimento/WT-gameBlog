<?php


class Database
{
    public static function query($sqlQuery)
    {
        $servername = "localhost";
        $username = "root";
        $password = "123";

        try {
            $conn = new PDO("mysql:host=$servername;dbname=game_blog", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->exec("set names utf8");
            $stmt = $conn->prepare($sqlQuery);
            $stmt->execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

            return $stmt->fetchAll();
        } catch (PDOException $e) {
            return "Connection failed: " . $e->getMessage();
        }
    }
}
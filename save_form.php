<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


$request = $_REQUEST;

echo "<pre>";
print_r($_REQUEST);
echo "</pre>";

$banner_setting = file_put_contents('popup/popup.json',json_encode($request,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
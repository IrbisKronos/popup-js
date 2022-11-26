<?php
/*error_reporting(E_ALL);
ini_set("display_errors", 1);*/
function cors()
{
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }
}
cors();
$uploaddir = '/popup/popupImg';
echo "<pre>";
print_r($_FILES);
echo "</pre>";
$info = pathinfo($_FILES['banner']['name']);
echo "<pre>";
print_r($info);
echo "</pre>";
$ext = $info['extension'];
$filepath = $uploaddir.'banner.'.$ext;
if(move_uploaded_file( $_FILES['banner']['tmp_name'], $filepath))
    echo json_encode(['status' => 'success']);
else
    echo json_encode(['status' => 'error', 'message' => "Not uploaded because of error #".$_FILES["banner"]["error"]]);
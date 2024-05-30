<?php
function getAccessToken() {
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.baubuddy.de/index.php/login",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode(["username" => "365", "password" => "1"]),
        CURLOPT_HTTPHEADER => [
            "Authorization: Basic QVBJX0V4cGxvcmVyOjEyMzQ1NmlzQUxhbWVQYXNz",
            "Content-Type: application/json"
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        die("cURL Error #: $err");
    } else {
        $data = json_decode($response, true);
        return $data["oauth"]["access_token"];
    }
}

function fetchData($access_token) {
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://api.baubuddy.de/dev/index.php/v1/tasks/select",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $access_token",
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        die("cURL Error #: $err");
    } else {
        return json_decode($response, true);
    }
}

$access_token = getAccessToken();
$data = fetchData($access_token);

header('Content-Type: application/json');
echo json_encode($data);


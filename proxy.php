<?php

// ==============================
// CORS
// ==============================
header("Access-Control-Allow-Origin: https://siege.eurpps.com");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, api-key");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ==============================
// Debugging (remove in production)
// ==============================
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ==============================
// Get query parameters
// ==============================
$type = $_GET['type'] ?? '';
$name = $_GET['nameOnPlatform'] ?? '';
$platform = $_GET['platformType'] ?? '';
$family = $_GET['platform_families'] ?? '';

// ==============================
// Validate required params
// ==============================
if (
    empty($type) ||
    empty($name) ||
    empty($platform)
) {
    http_response_code(400);

    echo json_encode([
        "error" => "Missing required parameters",
        "required" => [
            "type",
            "nameOnPlatform",
            "platformType"
        ]
    ]);

    exit();
}

// ==============================
// Get API key from request header
// ==============================
$apiKey = $_SERVER['HTTP_API_KEY'] ?? '';

if (empty($apiKey)) {
    http_response_code(401);

    echo json_encode([
        "error" => "Missing API key"
    ]);

    exit();
}

// ==============================
// Build R6Data URL
// ==============================
$query = http_build_query([
    "type" => $type,
    "nameOnPlatform" => $name,
    "platformType" => $platform,
    "platform_families" => $family
]);

$url = "https://api.r6data.eu/api/stats?" . $query;

// ==============================
// cURL Request
// ==============================
$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => [
        "api-key: $apiKey",
        "Accept: application/json"
    ]
]);

$response = curl_exec($ch);

// ==============================
// cURL Error Handling
// ==============================
if (curl_errno($ch)) {

    http_response_code(500);

    echo json_encode([
        "error" => "cURL Error",
        "message" => curl_error($ch)
    ]);

    curl_close($ch);
    exit();
}

// ==============================
// Forward HTTP status
// ==============================
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
http_response_code($status);

// ==============================
// Forward content type
// ==============================
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

if ($contentType) {
    header("Content-Type: $contentType");
} else {
    header("Content-Type: application/json");
}

curl_close($ch);

// ==============================
// Return API response
// ==============================
echo $response;
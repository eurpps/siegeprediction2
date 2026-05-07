<?php
// Allow your frontend
header("Access-Control-Allow-Origin: https://siege.eurpps.com");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, api-key");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validate input
$type = $_GET['type'] ?? '';
$name = $_GET['nameOnPlatform'] ?? '';
$platform = $_GET['platformType'] ?? '';
$family = $_GET['platform_families'] ?? '';

if (!$type || !$name) {
    http_response_code(400);
    echo json_encode(["error" => "Missing parameters"]);
    exit();
}

// Build API URL (adjust if needed)
$url = "https://r6data.eu/api/?" . http_build_query([
    "type" => $type,
    "nameOnPlatform" => $name,
    "platformType" => $platform,
    "platform_families" => $family
]);

// Initialize cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// 🔐 Put your API key here (NOT in JS)
$clientKey = $_SERVER['HTTP_API_KEY'] ?? '';

$headers = [
    "api-key: $clientKey"
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Execute
$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => curl_error($ch)]);
    curl_close($ch);
    exit();
}

// Forward content type
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
if ($contentType) {
    header("Content-Type: $contentType");
}

curl_close($ch);
echo $response;
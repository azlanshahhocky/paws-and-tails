<?php
$secretKey = "6Ldo6t0qAAAAALWCvEemqPzW2TTCfEMwHyfljT-X";
$responseKey = $_POST['g-recaptcha-response'];
$userIP = $_SERVER['REMOTE_ADDR'];

$url = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$userIP";
$response = file_get_contents($url);
$responseData = json_decode($response);

if ($responseData->success) {
    // CAPTCHA is valid, proceed with form processing
    echo "Thank you for your submission!";
} else {
    // CAPTCHA is invalid
    echo "Invalid CAPTCHA. Please try again.";
}
?>
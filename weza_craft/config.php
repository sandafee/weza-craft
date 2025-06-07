<?php
// Database configuration (for future use)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'weza_craft');

// Site configuration
define('SITE_NAME', 'Weza Craft');
define('SITE_DESCRIPTION', 'African Artisan Marketplace');
define('SITE_URL', 'http://localhost/weza_craft');

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Session configuration
session_start();

// Time zone
date_default_timezone_set('Africa/Nairobi');

// Currency
define('CURRENCY', 'KSh');

// Version
define('SITE_VERSION', '1.0.0');

// Global database connection variable
$conn = null;

// Initialize database connection
try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Log the error for debugging
    error_log("Database connection failed: " . $e->getMessage());
    
    // Check if it's a connection refused error
    if (strpos($e->getMessage(), 'refused') !== false) {
        die("
            <div style='margin: 20px; padding: 20px; border: 1px solid #ff6b6b; border-radius: 5px; font-family: Arial, sans-serif;'>
                <h2 style='color: #ff6b6b;'>Database Connection Error</h2>
                <p>Could not connect to the MySQL server. Please ensure that:</p>
                <ol>
                    <li>XAMPP is running properly</li>
                    <li>MySQL service is started in XAMPP Control Panel</li>
                    <li>Port 3306 is not being used by another application</li>
                </ol>
                <p><strong>Steps to fix:</strong></p>
                <ol>
                    <li>Open XAMPP Control Panel</li>
                    <li>Click 'Start' button next to MySQL</li>
                    <li>If that doesn't work, try clicking 'Stop' then 'Start'</li>
                    <li>Refresh this page after starting MySQL</li>
                </ol>
                <p>If the problem persists, please check XAMPP error logs for more details.</p>
            </div>
        ");
    } else {
        // For other database errors
        die("Database Error: " . $e->getMessage());
    }
}

// Helper functions
function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function redirect($url) {
    header("Location: " . SITE_URL . "/" . $url);
    exit();
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}

function formatPrice($price) {
    return CURRENCY . ' ' . number_format($price, 2);
}

// Function to check if database is connected
function isDatabaseConnected() {
    global $conn;
    return $conn !== null;
}
?> 
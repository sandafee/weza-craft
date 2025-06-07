<?php
require_once 'config.php';

class Auth {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function register($data) {
        $name = sanitize($data['name']);
        $email = sanitize($data['email']);
        $password = password_hash($data['password'], PASSWORD_DEFAULT);

        try {
            $stmt = $this->conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$name, $email, $password]);
            return true;
        } catch(PDOException $e) {
            return false;
        }
    }

    public function login($email, $password) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];
                return true;
            }
            return false;
        } catch(PDOException $e) {
            return false;
        }
    }

    public function logout() {
        session_destroy();
        session_start();
        return true;
    }

    public function getCurrentUser() {
        if (!isLoggedIn()) {
            return null;
        }

        try {
            $stmt = $this->conn->prepare("SELECT id, name, email, created_at FROM users WHERE id = ?");
            $stmt->execute([getCurrentUserId()]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            return null;
        }
    }
}

// Initialize Auth
$auth = new Auth($conn);

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'register':
                if ($auth->register($_POST)) {
                    $_SESSION['message'] = 'Registration successful! Please login.';
                    redirect('login.php');
                } else {
                    $_SESSION['error'] = 'Registration failed. Please try again.';
                }
                break;

            case 'login':
                if ($auth->login($_POST['email'], $_POST['password'])) {
                    $_SESSION['message'] = 'Welcome back, ' . $_SESSION['user_name'] . '!';
                    redirect('index.php');
                } else {
                    $_SESSION['error'] = 'Invalid email or password.';
                }
                break;

            case 'logout':
                $auth->logout();
                $_SESSION['message'] = 'You have been logged out.';
                redirect('index.php');
                break;
        }
    }
}
?> 
<?php
require_once 'config.php';
require_once 'cart.php';
require_once 'auth.php';

// Ensure user is logged in
if (!isLoggedIn()) {
    $_SESSION['error'] = 'Please login to proceed with checkout.';
    redirect('login.php');
}

class Checkout {
    private $conn;
    private $cart;

    public function __construct($conn, $cart) {
        $this->conn = $conn;
        $this->cart = $cart;
    }

    public function createOrder($user_id, $shipping_address) {
        try {
            $this->conn->beginTransaction();

            // Create order
            $stmt = $this->conn->prepare("
                INSERT INTO orders (user_id, total_amount, shipping_address, status)
                VALUES (?, ?, ?, 'pending')
            ");
            $total = $this->cart->getTotal();
            $stmt->execute([$user_id, $total, json_encode($shipping_address)]);
            $order_id = $this->conn->lastInsertId();

            // Create order items
            $stmt = $this->conn->prepare("
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES (?, ?, ?, ?)
            ");

            foreach ($this->cart->getItems() as $item) {
                $stmt->execute([
                    $order_id,
                    $item['id'],
                    $item['quantity'],
                    $item['price']
                ]);
            }

            $this->conn->commit();
            return $order_id;
        } catch (PDOException $e) {
            $this->conn->rollBack();
            return false;
        }
    }

    public function processPayment($order_id, $payment_data) {
        try {
            // This is a simplified payment process
            // In production, integrate with a payment gateway like Stripe, PayPal, etc.
            
            // Update order status
            $stmt = $this->conn->prepare("
                UPDATE orders 
                SET status = 'paid',
                    payment_details = ?,
                    updated_at = NOW()
                WHERE id = ?
            ");
            
            $stmt->execute([json_encode($payment_data), $order_id]);
            
            // Clear the cart after successful payment
            $this->cart->clear();
            
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getOrder($order_id) {
        try {
            $stmt = $this->conn->prepare("
                SELECT o.*, u.name as user_name, u.email as user_email
                FROM orders o
                JOIN users u ON o.user_id = u.id
                WHERE o.id = ?
            ");
            $stmt->execute([$order_id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }
}

// Initialize Checkout
$checkout = new Checkout($conn, $cart);

// Handle checkout process
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'create_order':
                $shipping_address = [
                    'name' => sanitize($_POST['name']),
                    'email' => sanitize($_POST['email']),
                    'address' => sanitize($_POST['address']),
                    'city' => sanitize($_POST['city']),
                    'country' => sanitize($_POST['country']),
                    'postal_code' => sanitize($_POST['postal_code']),
                    'phone' => sanitize($_POST['phone'])
                ];

                $order_id = $checkout->createOrder(getCurrentUserId(), $shipping_address);
                
                if ($order_id) {
                    $_SESSION['order_id'] = $order_id;
                    redirect('payment.php');
                } else {
                    $_SESSION['error'] = 'Failed to create order. Please try again.';
                }
                break;

            case 'process_payment':
                $order_id = $_SESSION['order_id'] ?? null;
                if (!$order_id) {
                    $_SESSION['error'] = 'Invalid order.';
                    redirect('cart.php');
                }

                $payment_data = [
                    'method' => sanitize($_POST['payment_method']),
                    'transaction_id' => uniqid('TXN'),
                    'amount' => $cart->getTotal(),
                    'currency' => 'KES',
                    'status' => 'completed',
                    'timestamp' => date('Y-m-d H:i:s')
                ];

                if ($checkout->processPayment($order_id, $payment_data)) {
                    $_SESSION['message'] = 'Payment processed successfully!';
                    redirect('order-confirmation.php?order_id=' . $order_id);
                } else {
                    $_SESSION['error'] = 'Payment processing failed. Please try again.';
                }
                break;
        }
    }
}

// Get cart items for display
$cart_items = $cart->getItems();
$cart_total = $cart->getTotal();

// If cart is empty, redirect to cart page
if (empty($cart_items)) {
    $_SESSION['error'] = 'Your cart is empty.';
    redirect('cart.php');
}
?> 
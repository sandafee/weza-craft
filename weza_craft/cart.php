<?php
require_once 'config.php';

class Cart {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }
    }

    public function addItem($product_id, $quantity = 1) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$product_id]);
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$product) {
                return false;
            }

            if (isset($_SESSION['cart'][$product_id])) {
                $_SESSION['cart'][$product_id]['quantity'] += $quantity;
            } else {
                $_SESSION['cart'][$product_id] = [
                    'id' => $product['id'],
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'quantity' => $quantity,
                    'image' => $product['image']
                ];
            }
            return true;
        } catch(PDOException $e) {
            return false;
        }
    }

    public function updateQuantity($product_id, $quantity) {
        if ($quantity <= 0) {
            unset($_SESSION['cart'][$product_id]);
        } else {
            $_SESSION['cart'][$product_id]['quantity'] = $quantity;
        }
        return true;
    }

    public function removeItem($product_id) {
        if (isset($_SESSION['cart'][$product_id])) {
            unset($_SESSION['cart'][$product_id]);
            return true;
        }
        return false;
    }

    public function getItems() {
        return $_SESSION['cart'];
    }

    public function getTotal() {
        $total = 0;
        foreach ($_SESSION['cart'] as $item) {
            $total += $item['price'] * $item['quantity'];
        }
        return $total;
    }

    public function clear() {
        $_SESSION['cart'] = [];
        return true;
    }

    public function getItemCount() {
        $count = 0;
        foreach ($_SESSION['cart'] as $item) {
            $count += $item['quantity'];
        }
        return $count;
    }
}

// Initialize Cart
$cart = new Cart($conn);

// Handle cart actions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cart_action'])) {
    $product_id = $_POST['product_id'] ?? null;
    $quantity = $_POST['quantity'] ?? 1;

    switch ($_POST['cart_action']) {
        case 'add':
            if ($cart->addItem($product_id, $quantity)) {
                $_SESSION['message'] = 'Item added to cart successfully!';
            } else {
                $_SESSION['error'] = 'Failed to add item to cart.';
            }
            break;

        case 'update':
            if ($cart->updateQuantity($product_id, $quantity)) {
                $_SESSION['message'] = 'Cart updated successfully!';
            } else {
                $_SESSION['error'] = 'Failed to update cart.';
            }
            break;

        case 'remove':
            if ($cart->removeItem($product_id)) {
                $_SESSION['message'] = 'Item removed from cart successfully!';
            } else {
                $_SESSION['error'] = 'Failed to remove item from cart.';
            }
            break;

        case 'clear':
            $cart->clear();
            $_SESSION['message'] = 'Cart cleared successfully!';
            break;
    }

    // Redirect back to cart page if it's an AJAX request
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
        strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        echo json_encode([
            'success' => true,
            'message' => $_SESSION['message'] ?? '',
            'cart_count' => $cart->getItemCount(),
            'cart_total' => formatPrice($cart->getTotal())
        ]);
        exit;
    }

    // Regular form submission redirect
    redirect('cart.php');
}
?> 
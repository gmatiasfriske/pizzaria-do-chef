// cart.js
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addItem(id, name, price) {
        const existingItem = this.items.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id,
                name,
                price,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(id);
            }
        }
        this.saveCart();
        this.updateCartUI();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }
}

// Inicializar o carrinho
const cart = new ShoppingCart();
document.addEventListener('DOMContentLoaded', function() {
    // Image Scroll Animation
    const heroImages = document.querySelectorAll('.hero-image-container img');
    let currentIndex = 0;

    function showImage(index) {
        heroImages.forEach(img => img.classList.remove('active'));
        heroImages[(index + heroImages.length) % heroImages.length].classList.add('active');
    }

    function nextImage() {
        currentIndex++;
        showImage(currentIndex);
    }

    setInterval(nextImage, 3000); // Change image every 3 seconds

    // Product Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const cartItemCountElement = document.querySelector('.cart-item-count');
    let cart = [];

    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <span>Quantity: ${item.quantity}</span>
                </div>
                <span class="remove-item-btn" data-id="${item.id}">x</span>
            `;
            cartItemsList.appendChild(listItem);
            total += item.price * item.quantity;
        });
        cartTotalElement.textContent = total.toFixed(2);
        cartItemCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function addToCart(productId, productName, productPrice, productImage) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: parseFloat(productPrice),
                image: productImage,
                quantity: 1
            });
        }
        updateCartDisplay();
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = this.dataset.price;
            const image = this.dataset.image;
            addToCart(id, name, price, image);
        });
    });

    cartItemsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item-btn')) {
            const productId = event.target.dataset.id;
            removeItemFromCart(productId);
        }
    });

    // Basic Checkout Alert
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Proceeding to checkout with ' + cart.reduce((sum, item) => sum + item.quantity, 0) + ' items. (Real checkout functionality not implemented in this example)');
                // In a real application, you would redirect to a checkout page or process the order here.
            } else {
                alert('Your cart is empty.');
            }
        });
    }
});
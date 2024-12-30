// Initialize the cart array from localStorage or as an empty array if not present
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add an item to the cart
function addToCart(productName) {
    // Find the product's price (just for the sake of simplicity, you can enhance this later)
    let price = 0;
    switch (productName) {
        case 'Classic Denim Jacket':
            price = 1999;
            break;
        case 'Casual Sneakers':
            price = 2499;
            break;
        case 'Leather Belt':
            price = 799;
            break;
        case 'Men’s Polo T-Shirt':
            price = 999;
            break;
        case 'Dresses':
            price = 2999;
            break;
        case 'Tops':
            price = 1499;
            break;
        case 'Footwear':
            price = 1999;
            break;
        case 'Bags':
            price = 1300;
            break;
        case 'Watches':
            price = 100999;
            break;
        case 'Sunglasses':
            price = 899;
            break;    
        default:
            console.log('Product not found');
            return;
    }

    // Check if the item is already in the cart
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // If the item already exists in the cart, increase the quantity
        existingItem.quantity++;
    } else {
        // If the item is not in the cart, add it with quantity 1
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart button to reflect the number of items in the cart
    updateCartButton();
}

// Function to update the cart button text with the number of items in the cart
function updateCartButton() {
    const cartButton = document.querySelector('.shop-button');
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartButton.textContent = `Cart (${cartItemCount})`;
}

// Function to display the cart items on the cart page
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = ''; // Clear existing cart items

    let totalPrice = 0;

    // Loop through the cart items and create HTML for each item
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="product.jpg" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: Rs.${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <button class="remove-item" data-name="${item.name}">Remove</button>
        `;

        cartContainer.appendChild(cartItem);

        // Update the total price
        totalPrice += item.price * item.quantity;
    });

    // Display the total price
    totalPriceElement.textContent = `Total: Rs.${totalPrice}`;

    // Add event listeners for the "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Function to remove an item from the cart
function removeItem(event) {
    const productName = event.target.getAttribute('data-name');

    // Remove the item from the cart array
    cart = cart.filter(item => item.name !== productName);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart page
    displayCart();

    // Update the cart button text
    updateCartButton();
}

// Call the function to update the cart button when the page loads
updateCartButton();

// If the page is the cart page, display the cart items
if (window.location.href.includes('cart.html')) {
    displayCart();
}

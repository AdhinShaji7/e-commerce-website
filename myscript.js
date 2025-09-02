const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}



document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.querySelector('#cart table tbody');
    
    cartTable.innerHTML = '';
    
    if (cart.length === 0) {
        cartTable.innerHTML = `
            <tr>
                <td colspan="2">
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                </td>
            </tr>
        `;
        return;
    }
    
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="img/products/f1.jpg" alt="">
                <div>
                    <strong>${item.name}</strong><br>
                    Size: ${item.size}<br>
                    Price: ${item.price}
                </div>
            </td>
            <td>
                <input type="number" value="${item.quantity}" readonly>
                <br>
                <button onclick="removeItem(${index})" class="cart-remove">Remove</button>
            </td>
        `;
        cartTable.appendChild(row);
    });
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    alert(`${removedItem.name} removed from cart!`);
}




function addToCart() {
    
    const productName = document.querySelector('.single-pro-details h4').textContent;
    const productPrice = document.querySelector('.single-pro-details h2').textContent;
    const selectedSize = document.getElementById('sizeSelect').value;
    const quantity = document.getElementById('quantityInput').value;
    

    if (selectedSize === "Select Size") {
        alert("Please select a size!");
        return;
    }
    
    if (quantity < 1) {
        alert("Quantity must be at least 1!");
        return;
    }
    
    // Create product object
    const product = {
        name: productName,
        price: productPrice,
        size: selectedSize,
        quantity: parseInt(quantity),
        id: Date.now()
    };
    
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingProductIndex = cart.findIndex(item => 
        item.name === product.name && item.size === product.size
    );
    
    if (existingProductIndex > -1) {
       
        cart[existingProductIndex].quantity += parseInt(quantity);
        alert(`Updated quantity for ${productName} (${selectedSize}) in cart!`);
    } else {
       
        cart.push(product);
        alert(`${productName} (${selectedSize}) added to cart!`);
    }
    
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
   
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    
    console.log(`Total items in cart: ${totalItems}`);
}

function viewCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Current cart contents:', cart);
    return cart;
}

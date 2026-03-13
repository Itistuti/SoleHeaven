function cartalert() {
    document.getElementById('alerts').style.display = 'block';
    document.getElementById('cart').style.zIndex = '2';
    setTimeout(() => {
      document.getElementById('alerts').style.display = 'none';
      document.getElementById('cart').style.zIndex = ''; // Reset z-index
    }, 3000); // Hide after 3 seconds
  }
  
  function heartalert() {
    document.getElementById('alertz').style.display = 'block';
    document.getElementById('wishlist').style.zIndex = '2';
    setTimeout(() => {
      document.getElementById('alertz').style.display = 'none';
      document.getElementById('wishlist').style.zIndex = ''; // Reset z-index
    }, 3000); // Hide after 3 seconds
  }
  function submitalert() {
    document.getElementById('alertsz').style.display = 'block';
    document.getElementById('submit').style.zIndex = '4';
    setTimeout(() => {
      document.getElementById('alertsz').style.display = 'none';
      document.getElementById('submit').style.zIndex = ''; // Reset z-index
    }, 3000); // Hide after 3 seconds
  }
  
  /* Start Sidebar JS */
  function openBar() {
    document.getElementById("mysidebar").style.width = "400px";
  }
  
  function closeBar() {
    document.getElementById("mysidebar").style.width = "0";
  }
  /* End Sidebar JS */
  function closeAlerts(){
        document.getElementById('alerts').style.display = 'none';
        document.getElementById('alertz').style.display = 'none';
  }


    // Add product to cart
    function addToCart(name, price) {
      let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      const id = name.toLowerCase().replace(/\s+/g, '-'); // Unique ID from name
      const existingItem = cart.find(item => item.id === id);
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }
  
      localStorage.setItem('cartItems', JSON.stringify(cart));
      cartalert()
      renderCart();
    }
  
    // Render cart items
    function renderCart() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const cartContainer = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');

  
      cartContainer.innerHTML = '';
      let total = 0;
  
      cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        const itemHTML = `
          <div class="cart-item">
            <span>${index + 1}. ${item.name}</span>
            <div>
              <button onclick="updateQuantity('${item.id}', -1)">-</button>
              ${item.quantity}
              <button onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
            <span>Rs. ${itemTotal.toFixed(2)}</span>
          </div>
        `;
  
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);
      });
  
      cartTotal.innerHTML = `Total: Rs. ${total.toFixed(2)}`;
      document.getElementById('cart-count').textContent = cartItems.length;
    }
  
    // Update quantity
    function updateQuantity(id, change) {
      let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const itemIndex = cart.findIndex(item => item.id === id);
  
      if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
          cart.splice(itemIndex, 1);
        }
        localStorage.setItem('cartItems', JSON.stringify(cart));
        renderCart();
      }
    }
  
    // Toggle cart dropdown
    document.getElementById('cart-icon').addEventListener('click', () => {
      const dropdown = document.getElementById('cart-dropdown');
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
  
    // Initialize cart on page load
    window.addEventListener('DOMContentLoaded', renderCart);
  
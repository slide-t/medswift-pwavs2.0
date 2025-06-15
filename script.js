let cart = [];
let deliveryFee = 0;

// Add to cart from manually entered input fields
function addToCart(id) {
  const name = document.getElementById(`pillName${id}`).value.trim();
  const qty = parseInt(document.getElementById(`pillQty${id}`).value);
  const price = parseFloat(document.getElementById(`pillPrice${id}`).value);

  if (!name || isNaN(qty) || isNaN(price) || qty <= 0 || price <= 0) {
    alert("Please enter valid pill details.");
    return;
  }

  // Check if pill already exists in cart
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, qty, price });
  }

  updateCart();
}

// Update the cart display and grand total
function updateCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      ${item.name} - ₦${item.price} x ${item.qty} = ₦${itemTotal}
      <span class="remove-btn" onclick="removeItem(${index})">❌</span>
    `;
    container.appendChild(div);
  });

  // Update cart icon badge
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.setAttribute("data-count", cart.length);
  }

  updateGrandTotal(subtotal);
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update delivery cost and refresh grand total
function updateDeliveryCost() {
  const select = document.getElementById("locationSelect");
  if (!select || !select.value.includes(":")) return;

  deliveryFee = parseInt(select.value.split(":")[1]);
  document.getElementById("deliveryCost").innerHTML = `₦${deliveryFee}`;

  updateGrandTotal();
}

// Update grand total
function updateGrandTotal(subtotal = 0) {
  if (subtotal === 0) {
    cart.forEach(item => {
      subtotal += item.price * item.qty;
    });
  }

  const grandTotal = subtotal + deliveryFee;
  document.getElementById("grandTotal").innerHTML = `₦${grandTotal}`;
}

// Scroll to cart summary
function scrollToCart() {
  document.querySelector(".total").scrollIntoView({ behavior: "smooth" });
}

// Print order summary
function printOrderSummary() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const newWindow = window.open("", "_blank");
  let html = "<h2>Your Order Summary</h2><ul>";

  cart.forEach(item => {
    html += `<li>${item.name} - ₦${item.price} x ${item.qty}</li>`;
  });
  html += "</ul>";

  const delivery = document.getElementById("deliveryCost").textContent;
  const total = document.getElementById("grandTotal").textContent;

  html += `<p>Delivery: ${delivery}</p>`;
  html += `<h3>Total: ${total}</h3>`;

  newWindow.document.write(html);
  newWindow.document.close();
  newWindow.print();
}

// Checkout via WhatsApp
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let message = "Hello, I want to complete my checkout.\n\nOrder Details:\n";
  cart.forEach(item => {
    message += `- ${item.name} (₦${item.price} x ${item.qty})\n`;
  });

  message += `\nDelivery Fee: ₦${deliveryFee}`;
  const total = document.getElementById("grandTotal").textContent;
  message += `\nTotal: ${total}`;

  const phoneNumber = "2349131697494";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Checkout via Email
function checkoutEmail() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let body = "Hello, I want to proceed with my order.\n\nOrder Summary:\n";
  cart.forEach(item => {
    body += `- ${item.name} (₦${item.price} x ${item.qty})\n`;
  });

  body += `\nDelivery Fee: ₦${deliveryFee}`;
  const total = document.getElementById("grandTotal").textContent;
  body += `\nTotal: ${total}`;

  const email = "slideteckacademy@gmail.com";
  const subject = "Product Checkout";
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

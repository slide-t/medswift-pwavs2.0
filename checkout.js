let cart = [];

function addToCart(index) {
  const pillElement = document.querySelectorAll('.pill-entry')[index];
  const pill = pillElement.querySelector('select').value;
  const brand = document.getElementById(`brandSelect-${index}`).value;

  if (!pill || !brand || !pillPrices[pill] || !pillPrices[pill][brand]) {
    alert("Please select valid pill and brand.");
    return;
  }

  const price = pillPrices[pill][brand];
  cart.push({ pill, brand, price });

  updateCart();
}

function updateCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `${item.pill} (${item.brand}) - &#8358;${item.price} <span class="remove-btn" onclick="removeItem(${i})">❌</span>`;
    container.appendChild(div);
    total += item.price;
  });

  // Update cart icon count
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.setAttribute("data-count", cart.length);

  // Update totals
  updateGrandTotal(total);
}

function updateDeliveryCost() {
  const select = document.getElementById("locationSelect");
  const value = select.value;

  if (!value.includes(":")) return;

  const cost = parseInt(value.split(":")[1]);
  document.getElementById("deliveryCost").innerHTML = `&#8358;${cost}`;

  updateGrandTotal();
}

function updateGrandTotal(subtotal = 0) {
  if (subtotal === 0) {
    cart.forEach(item => {
      subtotal += item.price;
    });
  }

  const select = document.getElementById("locationSelect");
  const deliveryCost = select.value.includes(":") ? parseInt(select.value.split(":")[1]) : 0;

  const grand = subtotal + deliveryCost;
  document.getElementById("grandTotal").innerHTML = `&#8358;${grand}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function scrollToCart() {
  document.querySelector(".total").scrollIntoView({ behavior: "smooth" });
}

function printOrderSummary() {
  const newWindow = window.open("", "_blank");
  let html = "<h2>Your Order Summary</h2><ul>";
  cart.forEach(item => {
    html += `<li>${item.pill} (${item.brand}) - ₦${item.price}</li>`;
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




function checkoutWhatsApp() {
  const phoneNumber = "2349131697494";
  const message = "Hello, I want to complete my checkout.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function checkoutEmail() {
  const email = "slideteckacademy@gmail.com";
  const subject = "Product Checkout";
  const body = "Hello, I want to proceed with my order.";
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

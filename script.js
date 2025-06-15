let pillId = 0;
let cart = [];
let deliveryFee = 0;

function addNewPillEntry() {
  const pillList = document.getElementById("pillList");

  const pillDiv = document.createElement("div");
  pillDiv.className = "pill-entry";
  pillDiv.innerHTML = `
    <label for="pillName${pillId}">Pill Name</label>
    <input type="text" id="pillName${pillId}" placeholder="e.g. Paracetamol" />

    <label for="pillQty${pillId}">Quantity</label>
    <input type="number" id="pillQty${pillId}" min="1" value="1" />

    <label for="pillPrice${pillId}">Price (₦)</label>
    <input type="number" id="pillPrice${pillId}" min="0" placeholder="e.g. 200" />

    <button class="add-btn" onclick="addToCart(${pillId})">Add to Cart</button>
  `;
  pillList.appendChild(pillDiv);
  pillId++;
}

function addToCart(id) {
  const name = document.getElementById(`pillName${id}`).value.trim();
  const qty = parseInt(document.getElementById(`pillQty${id}`).value);
  const price = parseFloat(document.getElementById(`pillPrice${id}`).value);

  if (!name || qty <= 0 || price <= 0) {
    alert("Please enter valid pill details.");
    return;
  }

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, qty, price });
  }

  updateCartIcon();
  updateTotals();
}

function updateCartIcon() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.setAttribute("data-count", count);
}

function updateDeliveryCost() {
  const location = document.getElementById("locationSelect").value;
  if (!location) return;

  deliveryFee = parseFloat(location.split(":")[1]);
  document.getElementById("deliveryCost").innerText = `₦${deliveryFee}`;
  updateTotals();
}

function updateTotals() {
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const grandTotal = total + deliveryFee;
  document.getElementById("grandTotal").innerText = `₦${grandTotal}`;
}

function scrollToCart() {
  document.querySelector("#locationSelect").scrollIntoView({ behavior: "smooth" });
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let message = "*🩺 MedSwift Pharmacy Order*%0A";
  cart.forEach(item => {
    message += `• ${item.name} - ₦${item.price} x ${item.qty}%0A`;
  });

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const grandTotal = total + deliveryFee;

  message += `%0A🧾 Total: ₦${total}%0A🚚 Delivery: ₦${deliveryFee}%0A💰 Grand Total: ₦${grandTotal}`;
  const phone = "2348012345678"; // Change to your business number
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

function checkoutEmail() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let body = "🩺 MedSwift Pharmacy Order:%0A";
  cart.forEach(item => {
    body += `${item.name} - ₦${item.price} x ${item.qty}%0A`;
  });

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const grandTotal = total + deliveryFee;

  body += `%0ATotal: ₦${total}%0ADelivery: ₦${deliveryFee}%0AGrand Total: ₦${grandTotal}`;
  window.location.href = `mailto:your@email.com?subject=MedSwift%20Pharmacy%20Order&body=${body}`;
}

function printOrderSummary() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let summary = "🩺 MedSwift Pharmacy Order\n\n";
  cart.forEach(item => {
    summary += `${item.name} - ₦${item.price} x ${item.qty}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const grandTotal = total + deliveryFee;
  summary += `\nTotal: ₦${total}\nDelivery: ₦${deliveryFee}\nGrand Total: ₦${grandTotal}`;

  const newWin = window.open("", "_blank");
  newWin.document.write(`<pre>${summary}</pre>`);
  newWin.print();
  newWin.close();
}

const cart = [];
const pillPrices = {
  "Paracetamol": {"M&B": 500, "Emzor": 450},
  "Ibuprofen": {"Emzor": 600, "Glaxo": 650},
  "Amoxicillin": {"Pfizer": 800, "Emzor": 750},
  "Vitamin C": {"Vitaforce": 300, "Emzor": 280},
  "Flagyl": {"Sanofi": 900, "Emzor": 850},
  "Zinc": {"M&B": 450, "Emzor": 400},
  "Artemether": {"Greenlife": 1000, "Swiss": 950},
  "Loratadine": {"Ranbaxy": 700, "Emzor": 650},
  "Cough Syrup": {"Benylin": 500, "Emzor": 480},
  "Ciprofloxacin": {"Pfizer": 1000, "Emzor": 950},
  "Bcomplex": {"M&B": 350, "Emzor": 300},
  "Antacid": {"Gestid": 400, "Emzor": 370},
  "Calcium": {"NatureMade": 800, "Emzor": 750},
  "Multivitamin": {"Immunace": 850, "Emzor": 800},
  "Metformin": {"GSK": 500, "Emzor": 480},
  "Aspirin": {"Bayer": 400, "Emzor": 370},
  "Lisinopril": {"Pfizer": 900, "Emzor": 850},
  "Omeprazole": {"AstraZeneca": 700, "Emzor": 680},
  "Coartem": {"Novartis": 1200, "Greenlife": 1100},
  "ORS Sachet": {"UNICEF": 200, "Emzor": 180}
};

function addNewPillEntry() {
  const container = document.getElementById("pillList");
  const index = container.children.length;
  const div = document.createElement("div");
  div.className = "pill-entry";
  div.innerHTML = `
    <label>Select Medication</label>
    <select onchange="updateBrandOptions(this, ${index})">
      <option disabled selected>--Choose--</option>
      ${Object.keys(pillPrices).map(p => `<option value="${p}">${p}</option>`).join('')}
    </select>
    <label>Select Brand</label>
    <select id="brandSelect-${index}" onchange="updatePriceDisplay(this, ${index})">
      <option disabled selected>--Select Brand--</option>
    </select>
    <div id="priceDisplay-${index}" style="background:#eee;padding:8px;margin-top:8px;">&#8358;0</div>
    <button onclick="addToCart(${index})" class="add-btn">Add to Cart</button>
  `;
  container.appendChild(div);
}

function updateBrandOptions(select, index) {
  const pill = select.value;
  const brandSelect = document.getElementById(`brandSelect-${index}`);
  brandSelect.innerHTML = `<option disabled selected>--Select Brand--</option>` +
    Object.keys(pillPrices[pill]).map(b => `<option value="${b}">${b}</option>`).join('');
}

function updatePriceDisplay(brandSelect, index) {
  const pill = brandSelect.parentElement.querySelector('select').value;
  const brand = brandSelect.value;
  const price = pillPrices[pill][brand];
  document.getElementById(`priceDisplay-${index}`).innerHTML = `&#8358;${price}`;
}

function addToCart(index) {
  const pill = document.querySelectorAll('.pill-entry')[index].querySelector('select').value;
  const brand = document.getElementById(`brandSelect-${index}`).value;
  const price = pillPrices[pill][brand];
  cart.push({pill, brand, price});
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
  document.getElementById("totalAmount").innerHTML = `&#8358;${total}`;
  updateDeliveryCost();
  document.querySelector('.cart-icon').setAttribute("data-count", cart.length);
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateDeliveryCost() {
  const loc = document.getElementById("locationSelect").value;
  const cost = loc ? parseInt(loc.split(':')[1]) : 0;
  document.getElementById("deliveryCost").innerHTML = `&#8358;${cost}`;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("grandTotal").innerHTML = `&#8358;${total + cost}`;
}

function scrollToCart() {
  document.getElementById("cartSection").scrollIntoView({behavior: "smooth"});
}

function printOrderSummary() {
  window.print(); // simplified for now
}
// checkout.js

function checkoutWhatsApp() {
  const phoneNumber = "2349131697494"; // Replace with your number (no + sign)
  const message = encodeURIComponent("Hello, I would like to complete my checkout.");
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

function checkoutEmail() {
  const email = "youremail@example.com"; // Replace with your email
  const subject = encodeURIComponent("Checkout Request");
  const body = encodeURIComponent("Hello, I would like to complete my checkout via email.");
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}



  

/*function checkoutWhatsApp() {
  alert("Checkout via WhatsApp coming soon.");
}

function checkoutEmail() {
  alert("Checkout via Email coming soon.");
}*/


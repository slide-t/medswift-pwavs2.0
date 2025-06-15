const cart = [];
const pillPrices = {
  Paracetamol: { Emzor: 100, Fidson: 120 },
  Amoxicillin: { Emzor: 150, GSK: 180 },
  Ibuprofen: { Emzor: 130, GSK: 150 },
};

let cart = [];

function addNewPillEntry() {
  const pillList = document.getElementById("pillList");
  const index = document.querySelectorAll(".pill-entry").length;

  const entry = document.createElement("div");
  entry.className = "pill-entry";
  entry.innerHTML = `
    <select onchange="populateBrand(${index})">
      <option disabled selected>--Choose--</option>
      ${Object.keys(pillPrices).map(pill => `<option value="${pill}">${pill}</option>`).join('')}
    </select>
    <select id="brandSelect-${index}"><option>--Select Brand--</option></select>
    <button onclick="addToCart(${index})">Add to Cart</button>
  `;
  pillList.appendChild(entry);
}

function populateBrand(index) {
  const pill = document.querySelectorAll(".pill-entry")[index].querySelector("select").value;
  const brandSelect = document.getElementById(`brandSelect-${index}`);
  brandSelect.innerHTML = `<option disabled selected>--Select Brand--</option>`;
  Object.keys(pillPrices[pill]).forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandSelect.appendChild(opt);
  });
}

function addToCart(index) {
  const entry = document.querySelectorAll(".pill-entry")[index];
  const pill = entry.querySelector("select").value;
  const brand = document.getElementById(`brandSelect-${index}`).value;
  if (!pill || !brand) {
    alert("Please select both medication and brand.");
    return;
  }

  const price = pillPrices[pill][brand];
  cart.push({ pill, brand, price });
  updateCart();
}

function updateCart() {
  const container = document.getElementById("cartItems") || document.createElement("div");
  container.id = "cartItems";
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `${item.pill} (${item.brand}) - ₦${item.price} <span class="remove-btn" onclick="removeItem(${i})">❌</span>`;
    container.appendChild(div);
    total += item.price;
  });

  document.body.appendChild(container);
  document.querySelector(".cart-icon").dataset.count = cart.length;

  updateDeliveryCost();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateDeliveryCost() {
  const loc = document.getElementById("locationSelect").value;
  const cost = loc ? parseInt(loc.split(":")[1]) : 0;
  document.getElementById("deliveryCost").innerHTML = `₦${cost}`;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = total + cost;
  document.getElementById("grandTotal").innerHTML = `₦${grandTotal}`;
}

function scrollToCart() {
  document.getElementById("cartItems")?.scrollIntoView({ behavior: "smooth" });
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const location = document.getElementById("locationSelect").value.split(":")[0];
  const delivery = document.getElementById("deliveryCost").innerText.replace("₦", "");
  const total = document.getElementById("grandTotal").innerText.replace("₦", "");

  let msg = "*MedSwift Order Summary:*\n";
  cart.forEach(item => {
    msg += `• ${item.pill} (${item.brand}) - ₦${item.price}\n`;
  });

  msg += `\n📍 Location: ${location}\n🚚 Delivery: ₦${delivery}\n💳 Total: ₦${total}`;
  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/2349131697494?text=${encoded}`, "_blank");
}

function checkoutEmail() {
  const subject = "Product Checkout";
  const body = cart.map(item => `${item.pill} (${item.brand}) - ₦${item.price}`).join("\n");
  const email = "slideteckacademy@gmail.com";
  const fullBody = `Hello,\n\nI want to proceed with my order:\n\n${body}\n\nThank you!`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
  window.location.href = mailto;
}

function printOrderSummary() {
  window.print();
}




/*const pillPrices = {
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

function checkoutWhatsApp() {
  alert("Checkout via WhatsApp coming soon.");
}

function checkoutEmail() {
  alert("Checkout via Email coming soon.");
}*/



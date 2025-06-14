const pillPrices = {
  Paracetamol: {
    Emzor: 50,
    GSK: 70,
    Fidson: 60,
    May&Baker: 65,
  },
  Ibuprofen: {
    Emzor: 100,
    GSK: 120,
    Fidson: 110,
    MedRelief: 115,
  },
  Amoxicillin: {
    Emzor: 200,
    GSK: 250,
    Fidson: 230,
    GreenLife: 240,
  },
  VitaminC: {
    Emzor: 80,
    GSK: 100,
    Fidson: 90,
    HealthPlus: 95,
  },
  Loratadine: {
    Emzor: 150,
    GSK: 170,
    Fidson: 160,
    MedRelief: 165,
  }
};

let pillCount = 0;

function addNewPillEntry() {
  const pillList = document.getElementById("pillList");
  const index = pillCount++;

  const wrapper = document.createElement("div");
  wrapper.className = "pill-entry";

  wrapper.innerHTML = `
    <select onchange="updateBrands(this, ${index})" class="pill-select">
      <option disabled selected>Select Medication</option>
      ${Object.keys(pillPrices).map(pill => `<option value="${pill}">${pill}</option>`).join("")}
    </select>

    <select onchange="updatePrice(${index})" id="brand-${index}" class="brand-select">
      <option disabled selected>Select Brand</option>
    </select>

    <input type="number" min="1" value="1" id="qty-${index}" class="qty" onchange="updateCart()" />

    <input type="text" id="price-${index}" class="price" readonly placeholder="Price" />

    <button onclick="removePillEntry(this)" class="remove-btn">❌</button>
  `;

  pillList.appendChild(wrapper);
}

function updateBrands(pillSelect, index) {
  const brandSelect = document.getElementById(`brand-${index}`);
  const selectedPill = pillSelect.value;

  const brands = Object.keys(pillPrices[selectedPill]);
  brandSelect.innerHTML = `<option disabled selected>Select Brand</option>` + 
    brands.map(brand => `<option value="${brand}">${brand}</option>`).join("");
}

function updatePrice(index) {
  const pillSelect = document.querySelectorAll(".pill-select")[index];
  const brandSelect = document.getElementById(`brand-${index}`);
  const priceInput = document.getElementById(`price-${index}`);

  const pill = pillSelect.value;
  const brand = brandSelect.value;

  const price = pillPrices[pill][brand];
  priceInput.value = price;

  updateCart();
}

function removePillEntry(button) {
  button.parentElement.remove();
  updateCart();
}

function updateCart() {
  let total = 0;

  document.querySelectorAll(".pill-entry").forEach((entry, index) => {
    const qty = parseInt(entry.querySelector(".qty").value) || 0;
    const price = parseFloat(entry.querySelector(".price").value) || 0;
    total += qty * price;
  });

  const delivery = getDeliveryCost();
  const grandTotal = total + delivery;

  document.querySelector(".cart-icon").setAttribute("data-count", document.querySelectorAll(".pill-entry").length);
  document.getElementById("grandTotal").innerHTML = `₦${grandTotal}`;
}

function getDeliveryCost() {
  const select = document.getElementById("locationSelect");
  const value = select.value;
  if (!value || !value.includes(":")) return 0;
  return parseInt(value.split(":")[1]);
}

function updateDeliveryCost() {
  const delivery = getDeliveryCost();
  document.getElementById("deliveryCost").innerHTML = `₦${delivery}`;
  updateCart();
}

function scrollToCart() {
  document.querySelector(".total").scrollIntoView({ behavior: "smooth" });
}

function printOrderSummary() {
  window.print();
}

function checkoutWhatsApp() {
  const cartSummary = generateCartSummary();
  const total = document.getElementById("grandTotal").innerText;
  const delivery = document.getElementById("deliveryCost").innerText;

  const message = `*🩺 MedSwift Order Summary*\n\n${cartSummary}\n🚚 Delivery: ${delivery}\n💵 Total: ${total}`;
  const encodedMessage = encodeURIComponent(message);

  const url = `https://wa.me/?text=${encodedMessage}`;
  window.open(url, "_blank");
}

function checkoutEmail() {
  const cartSummary = generateCartSummary();
  const total = document.getElementById("grandTotal").innerText;
  const delivery = document.getElementById("deliveryCost").innerText;

  const subject = encodeURIComponent("MedSwift Pharmacy Order");
  const body = encodeURIComponent(`🩺 MedSwift Order Summary\n\n${cartSummary}\n🚚 Delivery: ${delivery}\n💵 Total: ${total}`);

  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;
}

function generateCartSummary() {
  let summary = "";
  document.querySelectorAll(".pill-entry").forEach(entry => {
    const pill = entry.querySelector(".pill-select").value;
    const brand = entry.querySelector(".brand-select").value;
    const qty = entry.querySelector(".qty").value;
    const price = entry.querySelector(".price").value;

    if (pill && brand && qty && price) {
      summary += `💊 ${pill} (${brand}) x${qty} - ₦${qty * price}\n`;
    }
  });
  return summary;
}

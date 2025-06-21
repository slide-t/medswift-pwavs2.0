const cart = [];
  const pillPrices = {
  "Paracetamol": { "M&B": 500, "Emzor": 450, "Pfizer": 520, "GSK": 510 },
  "Ibuprofen": { "Emzor": 600, "Glaxo": 650, "Pfizer": 620, "Fidson": 610 },
  "Amoxicillin": { "Pfizer": 800, "Emzor": 750, "GSK": 790, "Fidson": 780 },
  "Vitamin C": { "Vitaforce": 300, "Emzor": 280, "GSK": 310, "Nature’s Way": 320 },
  "Ciprofloxacin": { "Pfizer": 950, "Emzor": 900, "Ranbaxy": 930, "Fidson": 920 },
  "Loratadine": { "Pfizer": 850, "Emzor": 800, "GSK": 870, "Sanofi": 860 },
  "Metformin": { "Pfizer": 700, "Emzor": 680, "GSK": 720, "Sun Pharma": 690 },
  "Aspirin": { "Pfizer": 600, "Emzor": 550, "Bayer": 650, "Fidson": 580 },
  "Cetirizine": { "Pfizer": 750, "Emzor": 700, "GSK": 740, "Teva": 720 },
  "Omeprazole": { "Pfizer": 800, "Emzor": 770, "GSK": 820, "Fidson": 810 },
  "Antacid": { "Pfizer": 400, "Emzor": 370, "GSK": 390, "Novartis": 380 },
  "Multivitamin": { "Pfizer": 1000, "Emzor": 950, "GSK": 980, "Nature’s Way": 1050 },
  "Chloramphenicol": { "Emzor": 450, "GSK": 500, "Pfizer": 520, "MediCap": 470 },
  "Doxycycline": { "Pfizer": 600, "Emzor": 580, "GSK": 620, "Fidson": 610 },
  "Coartem": { "Novartis": 1200, "Emzor": 1100, "Fidson": 1150, "GSK": 1180 },
  "Artemether": { "Emzor": 1000, "Fidson": 950, "GSK": 970, "Sanofi": 980 },
  "Azithromycin": { "Pfizer": 1300, "Emzor": 1250, "GSK": 1280, "Fidson": 1270 },
  "Erythromycin": { "Pfizer": 900, "Emzor": 880, "GSK": 910, "Fidson": 890 },
  "Cough Syrup": { "Emzor": 400, "Fidson": 450, "GSK": 420, "Benylin": 480 },
  "Folic Acid": { "Pfizer": 350, "Emzor": 320, "GSK": 340, "Fidson": 330 },
  "Iron Supplement": { "Pfizer": 650, "Emzor": 600, "GSK": 620, "Fidson": 630 },
  "Zinc Tablet": { "Pfizer": 300, "Emzor": 280, "GSK": 290, "Fidson": 295 },
  "Calcium Tablet": { "Pfizer": 700, "Emzor": 680, "GSK": 720, "Nature Made": 710 },
  "Magnesium Tablet": { "Pfizer": 750, "Emzor": 700, "GSK": 740, "Fidson": 730 },
  "Cold Cap": { "Emzor": 500, "Pfizer": 520, "GSK": 510, "Fidson": 530 },
  "Antifungal Cream": { "Pfizer": 850, "Emzor": 800, "GSK": 830, "Teva": 820 },
  "Hydrocortisone Cream": { "Pfizer": 600, "Emzor": 580, "GSK": 610, "Fidson": 605 },
  "Diclofenac": { "Pfizer": 700, "Emzor": 680, "GSK": 690, "Fidson": 695 },
  "Ibucap": { "Emzor": 550, "GSK": 570, "Pfizer": 560, "Fidson": 580 },
  "ORS Sachet": { "Emzor": 200, "GSK": 210, "Pfizer": 220, "Fidson": 215 },
  "Naproxen": { "Pfizer": 750, "GSK": 780, "Emzor": 740, "Fidson": 760 },
  "Pregnancy Test Strip": { "Clearblue": 600, "Emzor": 550, "GSK": 580, "MediSure": 570 },
  "Mebendazole": { "Pfizer": 400, "Emzor": 370, "GSK": 390, "Fidson": 380 },
  "Albendazole": { "Pfizer": 450, "Emzor": 420, "GSK": 440, "Fidson": 430 },
  "Lactulose Syrup": { "Pfizer": 900, "GSK": 880, "Emzor": 870, "Fidson": 890 },
  "Antihistamine": { "Pfizer": 650, "GSK": 670, "Emzor": 660, "Fidson": 655 },
  "Clarithromycin": { "Pfizer": 1100, "Emzor": 1050, "GSK": 1080, "Fidson": 1070 },
  "Ranitidine": { "Pfizer": 550, "GSK": 570, "Emzor": 540, "Fidson": 560 },
  "Nystatin": { "Pfizer": 500, "GSK": 520, "Emzor": 490, "Fidson": 510 },
  "Insulin": { "Sanofi": 2500, "Pfizer": 2600, "Novo Nordisk": 2700, "Emzor": 2400 }
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
  const selectedMed = select.value;
  const brandSelect = document.getElementById(`brandSelect-${index}`);
  brandSelect.innerHTML = '<option disabled selected>--Select Brand--</option>';

  if (pillPrices[selectedMed]) {
    Object.keys(pillPrices[selectedMed]).forEach(brand => {
      const option = document.createElement("option");
      option.value = brand;
      option.textContent = brand;
      brandSelect.appendChild(option);
    });
  }
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
      total += item.price;
      container.innerHTML += `
        <div class="cart-item">
          <span>${item.pill} (${item.brand}) - &#8358;${item.price}</span>
          <span class="remove-btn" onclick="removeItem(${i})">❌</span>
        </div>
      `;
    });
    document.getElementById("totalAmount").innerHTML = `&#8358;${total}`;
    document.querySelector(".cart-icon").setAttribute("data-count", cart.length);
    updateDeliveryCost();
  }

  function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
  }

  function scrollToCart() {
    document.getElementById("cartSection").scrollIntoView({behavior: "smooth"});
  }

  function updateDeliveryCost() {
    const loc = document.getElementById("locationSelect").value;
    const parts = loc.split(":");
    const delivery = parts[1] ? parseInt(parts[1]) : 0;
    document.getElementById("deliveryCost").innerHTML = `&#8358;${delivery}`;
    const productTotal = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("grandTotal").innerHTML = `&#8358;${productTotal + delivery}`;
  }
const whatsappContacts = [
  { name: "Pharmacist A", number: "2348012345678" },
  { name: "Pharmacist B", number: "2348098765432" },
  { name: "Support", number: "2347011122233" }
];

const emailContacts = [
  { name: "Orders", email: "orders@medswift.com" },
  { name: "Helpdesk", email: "support@medswift.com" }
];

function checkoutWhatsApp() {
  showContactModal("whatsapp");
}

function checkoutEmail() {
  showContactModal("email");
}

function showContactModal(type) {
  const container = document.getElementById("contactButtons");
  container.innerHTML = ""; // clear old buttons
  const locText = document.getElementById("locationSelect").value.split(":")[0];
  let msg = "MedSwift Order:\n";
  cart.forEach(item => {
    msg += `• ${item.pill} (${item.brand}) - ₦${item.price}\n`;
  });
  const delivery = document.getElementById("deliveryCost").innerText;
  const total = document.getElementById("grandTotal").innerText;
  msg += `Delivery to: ${locText} (${delivery})\n`;
  msg += `Total: ${total}`;

  if (type === "whatsapp") {
    whatsappContacts.forEach(contact => {
      const btn = document.createElement("button");
      btn.innerText = `Send to ${contact.name}`;
      btn.onclick = () => {
        const link = `https://wa.me/${contact.number}?text=${encodeURIComponent(msg)}`;
        window.open(link, "_blank");
        closeModal();
      };
      container.appendChild(btn);
    });
  } else if (type === "email") {
    emailContacts.forEach(contact => {
      const btn = document.createElement("button");
      btn.innerText = `Email ${contact.name}`;
      btn.onclick = () => {
        const mailLink = `mailto:${contact.email}?subject=My MedSwift Order&body=${encodeURIComponent(msg)}`;
        window.location.href = mailLink;
        closeModal();
      };
      container.appendChild(btn);
    });
  }

  document.getElementById("contactModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("contactModal").style.display = "none";
}

/*
  function checkoutWhatsApp() {
    const locText = document.getElementById("locationSelect").value.split(":")[0];
    let msg = "MedSwift Order:%0A";
    cart.forEach(item => {
      msg += `• ${item.pill} (${item.brand}) - ₦${item.price}%0A`;
    });
    const delivery = document.getElementById("deliveryCost").innerText;
    const total = document.getElementById("grandTotal").innerText;
    msg += `Delivery to: ${locText} (${delivery})%0A`;
    msg += `Total: ${total}`;
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  function checkoutEmail() {
    const locText = document.getElementById("locationSelect").value.split(":")[0];
    let msg = "MedSwift Order:\n";
    cart.forEach(item => {
      msg += `• ${item.pill} (${item.brand}) - ₦${item.price}\n`;
    });
    const delivery = document.getElementById("deliveryCost").innerText;
    const total = document.getElementById("grandTotal").innerText;
    msg += `Delivery to: ${locText} (${delivery})\n`;
    msg += `Total: ${total}`;
    window.location.href = `mailto:?subject=My MedSwift Order&body=${encodeURIComponent(msg)}`;
  }
*/

async function downloadOrderAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const cartItems = document.getElementById("cartItems").innerText;

  if (!cartItems.trim()) {
    alert("Your cart is empty. Please add items before downloading.");
    return;
  }

  doc.setFontSize(14);
  doc.text("MedSwift Pharma - Order Summary", 20, 20);
  doc.setFontSize(12);
  doc.text(cartItems, 20, 30);

  doc.save("MedSwift_Order.pdf");

  alert("Order saved as PDF. Please screenshot it and send via WhatsApp or email.");
}


function checkoutWhatsApp() {
  const phoneNumber = "+2348012345678"; // Replace with your actual WhatsApp number
  const message = encodeURIComponent("Hello, I want to checkout an item.");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}

function checkoutEmail() {
  const email = "youremail@example.com"; // Replace with your actual email
  const subject = encodeURIComponent("Checkout Request");
  const body = encodeURIComponent("Hi, I want to order this product.");
  const url = `mailto:${email}?subject=${subject}&body=${body}`;
  window.location.href = url;
}

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

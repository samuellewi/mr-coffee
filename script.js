document.addEventListener("DOMContentLoaded", function () {
  const qtyInputs = document.querySelectorAll(".qty");
  const totalDisplay = document.getElementById("total");
  const form = document.getElementById("orderForm");

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  function updateTotal() {
    let total = 0;
    qtyInputs.forEach((input) => {
      const quantity = parseInt(input.value) || 0;
      const price = parseInt(input.dataset.price);
      total += quantity * price;
    });
    totalDisplay.textContent = formatRupiah(total);
  }

  qtyInputs.forEach((input) => {
    input.addEventListener("input", updateTotal);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const paymentMethods = document.querySelectorAll(
      'input[name="payment"]:checked'
    );

    if (!name || !email || !phone || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    if (paymentMethods.length === 0) {
      alert("Please select at least one payment method.");
      return;
    }

    alert("Order submitted successfully!");
    form.reset();
    updateTotal();
  });

  updateTotal();
});


// pop up

document.addEventListener("DOMContentLoaded", () => {
  const claimButtons = document.querySelectorAll('.claim-button');
  const popup = document.getElementById('popup');
  const closeBtn = document.querySelector('.popup-close');

  claimButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popup.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
});

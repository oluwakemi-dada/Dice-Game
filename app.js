const form = document.querySelector('.form');

// Error Message
const showError = () => {
  const errorBox = `
      <div class='error'>
        <p>Please fill all fields</p>
      </div>
    `;
  form.insertAdjacentHTML('beforebegin', errorBox);
  clearAlert();
};

// Remove message
const clearAlert = () => {
  setTimeout(() => {
    document.querySelector('.error').remove();
  }, 3000);
};

// Form Submit
const submitForm = (e) => {
  e.preventDefault();

  // Form inputs
  const firstname = document.querySelector('.firstname').value;
  const lastname = document.querySelector('.lastname').value;
  const email = document.querySelector('.email').value;
  const company = document.querySelector('.company').value;
  const phone = document.querySelector('.phone').value;
  const message = document.querySelector('.message').value;
  const others = document.querySelector('.others').value;
  const budget = document.querySelectorAll('input[name="budget"]');

  // Get radio value
  const budgetArr = Array.from(budget);
  let selectedValue;
  budgetArr.forEach((rb) => {
    if (rb.checked) {
      selectedValue = rb.value;
    }
  });

  if (
    firstname !== '' &&
    lastname !== '' &&
    email !== '' &&
    company !== '' &&
    phone !== '' &&
    message !== '' &&
    selectedValue !== undefined &&
    others !== ''
  ) {
    window.location.href = 'form-redirect.html';
  } else {
    window.scroll({
      top: 260,
      behavior: 'smooth',
    });
    showError();
  }
};

if (form) {
  form.addEventListener('submit', submitForm);
}

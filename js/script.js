// Untuk Password Utama
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

if (togglePassword && password) {
  togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });
}

// Untuk Konfirmasi Password (jika ada)
const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const confirmPassword = document.querySelector('#confirmPassword');

if (toggleConfirmPassword && confirmPassword) {
  toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });
}
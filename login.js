```javascript
// MENAMPILKAN DAN MENYEMBUNYIKAN PASSWORD

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");

    } else {

        passwordInput.type = "password";

        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");

    }

});


// PROSES LOGIN

document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value;

    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = "";

    if (username === "" || password === "") {

        errorMessage.textContent = "Username dan password harus diisi.";

        return;

    }

    // Arahkan ke dashboard
    // Hubungkan dengan autentikasi/database aplikasi.

    window.location.href = "dashboard.html";

});
```
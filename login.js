const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginMessage = document.getElementById("loginMessage");
const togglePassword = document.getElementById("togglePassword");
const rememberMe = document.getElementById("rememberMe");


togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "Show";

    }

});

function validateEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);

}

function clearErrors() {
    emailError.textContent = "";
    passwordError.textContent = "";
    loginMessage.style.display = "none";
    loginMessage.textContent = "";

}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    if (email === "") {

        emailError.textContent =
            "Email address is required.";

        isValid = false;

    } else if (!validateEmail(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;

    }

    if (password === "") {

        passwordError.textContent =
            "Password is required.";

        isValid = false;

    } else if (password.length < 6) {

        passwordError.textContent =
            "Password must be at least 6 characters.";

        isValid = false;

    }

    if (!isValid) {
        return;
    }

    const demoEmail = "admin@mrcoffee.com";
    const demoPassword = "123456";

    if (
        email === demoEmail &&
        password === demoPassword
    ) {

        if (rememberMe.checked) {
            localStorage.setItem(
                "mrCoffeeUser",
                email
            );

        } else {
            localStorage.removeItem(
                "mrCoffeeUser"
            );

        }

        window.location.href = "index.html";

    } else {
        loginMessage.textContent =
            "Incorrect email or password.";
        loginMessage.style.display = "block";
    }
});
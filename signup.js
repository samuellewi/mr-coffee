const signupForm = document.getElementById("signupForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");
const termsInput = document.getElementById("terms");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError =
    document.getElementById("passwordError");
const confirmPasswordError =
    document.getElementById("confirmPasswordError");
const termsError =
    document.getElementById("termsError");
const signupMessage =
    document.getElementById("signupMessage");
const togglePassword =
    document.getElementById("togglePassword");
const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");


togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
});

toggleConfirmPassword.addEventListener("click", function () {
    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleConfirmPassword.textContent = "Hide";
    } else {
        confirmPasswordInput.type = "password";
        toggleConfirmPassword.textContent = "Show";
    }
});


function validateEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);

}


function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    termsError.textContent = "";
    signupMessage.style.display = "none";
    signupMessage.textContent = "";
    signupMessage.className = "signup-message";
}

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    const fullName =
        fullNameInput.value.trim();
    const email =
        emailInput.value.trim().toLowerCase();
    const password =
        passwordInput.value;
    const confirmPassword =
        confirmPasswordInput.value;
    let isValid = true;

    if (fullName === "") {
        nameError.textContent =
            "Full name is required.";
        isValid = false;
    } else if (fullName.length < 3) {
        nameError.textContent =
            "Full name must be at least 3 characters.";
        isValid = false;
    }


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

    if (confirmPassword === "") {
        confirmPasswordError.textContent =
            "Please confirm your password.";
        isValid = false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent =
            "Passwords do not match.";
        isValid = false;
    }

    if (!termsInput.checked) {
        termsError.textContent =
            "You must agree to the Terms & Conditions.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const existingUser =
        localStorage.getItem("mrCoffeeUser");

    if (existingUser) {
        const user =
            JSON.parse(existingUser);
        if (user.email === email) {
            signupMessage.textContent =
                "An account with this email already exists.";
            signupMessage.classList.add("error");
            signupMessage.style.display = "block";
            return;
        }
    }


    const userData = {
        name: fullName,
        email: email,
        password: password
    };

    localStorage.setItem(
        "mrCoffeeUser",
        JSON.stringify(userData)
    );



    signupMessage.textContent =
        "Account created successfully! Redirecting to login...";
    signupMessage.classList.add("success");
    signupMessage.style.display = "block";

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1500);

});
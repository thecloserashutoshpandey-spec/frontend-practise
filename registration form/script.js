const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");

const strength = document.getElementById("strength");
const toggle = document.getElementById("toggle");

function validateName() {
    if (nameInput.value.length < 3) {
        nameError.innerText = "Name must be at least 3 characters";
        return false;
    } else {
        nameError.innerText = "";
        return true;
    }
}

function validateEmail() {
    let email = emailInput.value;
    if (!email.includes("@") || !email.includes(".")) {
        emailError.innerText = "Enter valid email";
        return false;
    } else {
        emailError.innerText = "";
        return true;
    }
}

function validatePhone() {
    let phone = phoneInput.value;
    if (phone.length !== 10 || isNaN(phone)) {
        phoneError.innerText = "Enter valid 10-digit phone";
        return false;
    } else {
        phoneError.innerText = "";
        return true;
    }
}

function validatePassword() {
    let pass = passwordInput.value;

    if (pass.length < 6) {
        strength.innerText = "Weak";
        strength.style.color = "red";
        passwordError.innerText = "Minimum 6 characters";
        return false;
    } else if (pass.length < 9) {
        strength.innerText = "Medium";
        strength.style.color = "orange";
        passwordError.innerText = "";
        return true;
    } else {
        strength.innerText = "Strong";
        strength.style.color = "green";
        passwordError.innerText = "";
        return true;
    }
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
passwordInput.addEventListener("input", validatePassword);

toggle.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggle.innerText = "Hide";
    } else {
        passwordInput.type = "password";
        toggle.innerText = "Show";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid =
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validatePassword();

    if (!isValid) return;

    let user = {name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        password: passwordInput.value
    };

    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    submissions.push(user);

    localStorage.setItem("submissions", JSON.stringify(submissions));

    alert("Form submitted successfully!");

    form.reset();
    strength.innerText = "";
});

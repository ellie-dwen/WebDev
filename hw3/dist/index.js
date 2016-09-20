// this function is called when submit button is clicked
function validateForm() {
    if(validatePassword() && validateAge()) {
        return true;
    }
    return false;
}

// make sure the password confirmation matches with the password
function validatePassword() {
    var pwd = document.forms["registration"]["password"];
    var confirm = document.forms["registration"]["passwordConfirmation"];
    if (pwd.value != confirm.value) {
        confirm.value = "";
        confirm.placeholder = "Password does not match";
        return false;
    }
    return true;
}

// make sure the age is older than 18
function validateAge() {
    var birth = document.forms["registration"]["birthDate"];
    var today = new Date();
    var birthDate = new Date(birth.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18) {
        birth.value = "";
        birth.placeholder = "Younger than 18, cannot register";
        return false;
    }
    return true;
}

window.onload = function() {
    // when login button is clicked, check the input values are not empty
    var loginButton = document.getElementById("login");
    var inputEmail = document.getElementById("inputEmail");
    var inputPassword = document.getElementById("inputPassword");
    loginButton.onclick = function() {
        if(inputEmail.value === "") {
            inputEmail.placeholder = "Please enter your email address!";
        } else if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(inputEmail.value)) {
            inputEmail.value = ""
            inputEmail.placeholder = "Please verify your email address!";
        } else if(inputPassword.value === "") {
            inputPassword.placeholder = "Please enter your password!";
        } else {
            location.href = "main.html";
        }
    };
};
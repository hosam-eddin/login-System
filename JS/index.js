const nameInput = document.querySelector(".nameInput");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".pass-field .passwordInput");
const eyeIcon = document.querySelector(".pass-field i");

const loginBtn = document.querySelector(".loginBtn");
const signBtn = document.querySelector(".signBtn");

const signUpMassege = document.querySelector(".signUpMassege");
const signInMassege = document.querySelector(".signInMassege");

var emailContainer = [];

// if (localStorage.getItem("accounts") != null) {
//   emailContainer = JSON.parse(localStorage.getItem("accounts"));
// }

if (localStorage.getItem("users") == null) {
  emailContainer = [];
} else {
  emailContainer = JSON.parse(localStorage.getItem("users"));
}
//! will return value

// ! empty inputs check
function emptySignCheck() {
  if (
    nameInput.value == "" ||
    emailInput.value == "" ||
    passwordInput.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

// ! non repeated users
function unique() {
  for (var i = 0; i < emailContainer.length; i++) {
    if (emailContainer[i].accMail == emailInput.value) {
      return true;
    }
  }
}

//! clearForm - Called in Main-Function
function clearForm() {
  accName.value = "";
  accMail.value = "";
  accPass.value = "";
}

//! add account to array set for signUp
if (window.location.pathname == "/signup.html") {
  console.log("We are is Sign Up Page ✅");
  signBtn.addEventListener("click", function () {
    signUp();
  });
}


function signUp() {
  if (!emptySignCheck()) {
    document.querySelector(".showUp").innerHTML =
      '<span class="text-danger mt-3"> all inputs must be valid</span>';
    return false;
  }
  if (!validateEmail || !validatePassword) {
    document.querySelector(".showUp").innerHTML =
      '<span class="text-danger mt-3"> all inputs must be valid</span>';
    return false;
  }

  let user = {
    accName: nameInput.value,
    accMail: emailInput.value,
    accPass: passwordInput.value,
  };

  if (unique()) {
    document.querySelector(".showUp").innerHTML =
      '<span class="text-danger mt-3">Email already exists</span>';
  } else {
    emailContainer.push(user);
    localStorage.setItem("users", JSON.stringify(emailContainer));
    document.querySelector(".showUp").innerHTML =
      '<span class="text-success mt-3">Success</span>';
    setTimeout(function () {
      window.open("./index.html");
    }, 1000);
  }
}

// ! login page
function emptyLogCheck() {
  if (passwordInput.value == "" || emailInput.value == "") {
    return false;
  } else {
    return true;
  }
}

if (window.location.pathname == "/index.html") {
  console.log("We are is Logged In Page ✅");
  loginBtn.addEventListener("click", function () {
    login();
  });
}

function login() {

  if (!emptyLogCheck()) {
    document.querySelector(".showUpLog").innerHTML =
      '<span class="text-danger">All inputs are required</span>';
    return false;
  }
  let password = passwordInput.value;
  let email = emailInput.value;
  const findUser = emailContainer.find(
    (user) => user.accMail === email && user.accPass === password
  );

  if (existUser) {
    localStorage.setItem("accUsername", findUser.name);
    window.open("./home.html");
  } else {
    document.querySelector(".showUp").innerHTML =
      '<span class="text-danger">Incorrect email or password</span>';
  }
}

function logout() {
  localStorage.removeItem("accUsername");
}

//! show passWord with eyeIcon
eyeIcon.addEventListener("click", function showPassword() {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  eyeIcon.className = `fa-solid fa-eye${
    passwordInput.type === "password" ? "" : "-slash"
  }`;
});

// ! ================================== regex ===================================== ! //
// !regex Password :
passwordInput.addEventListener("keyup", validatePassword);
function validatePassword() {
  const alert2 = document.getElementById("alert2");
  var regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (regex.test(passwordInput.value)) {
    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");
    alert2.classList.add("d-none");
    return true;
  } else {
    passwordInput.classList.add("is-invalid");
    passwordInput.classList.remove("is-valid");
    alert2.classList.remove("d-none");
    alert2.innerHTML = `Minimum eight characters,
      at least one uppercase letter,
      one lowercase letter,
      one number and one special character:`;
    return false;
  }
}
// !regex Email :
emailInput.addEventListener("keyup", validateEmail);
function validateEmail() {
  const alert1 = document.getElementById("alert1");
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (regex.test(emailInput.value)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    alert1.classList.add("d-none");
    return true;
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    alert1.classList.remove("d-none");
    alert1.innerHTML = `Must Be A valid Mail`;
    return false;
  }
}
// ! ======================================================================= ! //

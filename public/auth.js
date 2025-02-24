// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNVT1Er5J62EFfDX2aMX9xcoPFlWYvlto",
  authDomain: "attendance-management-sy-5da6f.firebaseapp.com",
  projectId: "attendance-management-sy-5da6f",
  storageBucket: "attendance-management-sy-5da6f.firebasestorage.app",
  messagingSenderId: "952625077789",
  appId: "1:952625077789:web:46737dee08f72542f270f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Handle Login
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login_form form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Login successful!");
          console.log("User Info:", userCredential.user);
          window.location.href = "dashboard.html"; // Redirect on successful login
        })
        .catch((error) => {
          alert("Error: " + error.message);
          console.error("Login error:", error);
        });
    });
  }

  // Handle Registration
  const registerForm = document.querySelector("#register form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const fullName = document.getElementById("reg_name").value;
      const email = document.getElementById("reg_email").value;
      const password = document.getElementById("reg_password").value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          set(ref(database, "users/" + user.uid), {
            fullName: fullName,
            email: email
          })
          .then(() => {
            alert("Registration successful!");
            window.location.href = "dashboard.html"; // Redirect after successful registration
          })
          .catch((error) => {
            alert("Database error: " + error.message);
          });
        })
        .catch((error) => {
          alert("Error: " + error.message);
          console.error("Registration error:", error);
        });
    });
  }
});

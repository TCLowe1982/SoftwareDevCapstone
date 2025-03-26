// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGgv9TEVL5OxG-xNZjumABZanVsQ-CgvM",
  authDomain: "attendance-management-sy-b48d6.firebaseapp.com",
  databaseURL: "https://attendance-management-sy-b48d6-default-rtdb.firebaseio.com",
  projectId: "attendance-management-sy-b48d6",
  storageBucket: "attendance-management-sy-b48d6.firebasestorage.app",
  messagingSenderId: "746217693554",
  appId: "1:746217693554:web:d5a2dfb1a00ed98344fdeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Forgot Password Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const forgotPasswordForm = document.getElementById("forgot-password-form");
  const resetMessage = document.getElementById("forgot-message");
  const emailInput = document.getElementById("forgot-email");

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
      const email = emailInput.value.trim();

      sendPasswordResetEmail(auth, email)
        .then(() => {
          resetMessage.textContent = "Password reset email sent! Check your inbox.";
          resetMessage.style.color = "green";
          resetMessage.style.display = "block";
        })
        .catch((error) => {
          resetMessage.textContent = "Error sending reset email. Please try again.";
          resetMessage.style.color = "red";
          resetMessage.style.display = "block";
          console.error("Password Reset Error:", error);
        });
    });
  }
});

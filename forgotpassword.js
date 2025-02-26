// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNVT1Er5J62EFfDX2aMX9xcoPFlWYvlto",
  authDomain: "attendance-management-sy-5da6f.firebaseapp.com",
  projectId: "attendance-management-sy-5da6f",
  storageBucket: "attendance-management-sy-5da6f.appspot.com", 
  messagingSenderId: "952625077789",
  appId: "1:952625077789:web:46737dee08f72542f270f4"
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

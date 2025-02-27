// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNVT1Er5J62EFfDX2aMX9xcoPFlWYvlto",
  authDomain: "attendance-management-sy-5da6f.firebaseapp.com",
  databaseURL: "https://attendance-management-sy-5da6f-default-rtdb.firebaseio.com",
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
  const errorMessage = document.getElementById("error-message");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const isAdminLogin = document.getElementById("Admin").checked; 

      errorMessage.style.display = "none"; //Hide error message before each attempt

      //Add to parameters admin
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userRef = ref(database, "users/" + user.uid);

          get(userRef).then((snapshot) => {
            if (snapshot.exists()){
              const userData = snapshot.val();

              //check if the user is an admin
              if (isAdminLogin){
                if(userData.isAdmin){
                  alert("Welcome Admin!");
                  window.location.href = "LandingPageAdmin.html"
                } else {
                  errorMessage.textContent = "Access denied! You are not an admin.";
                  errorMessage.style.display = "block";
                  //alert("Access denied! You are not an admin.");
                }
              } else {
                alert("Login successful!");
                window.location.href = "userdashboard.html";
              }
            } else {
              errorMessage.textContent = "User data not found."; 
              errorMessage.style.display = "block";
              //alert("User data not found.");
            }
          }).catch((error)=>{
            console.error("Database error:", error);
            errorMessage.textContent = "Error retrieving user data.";
            errorMessage.style.display = "block";
            //alert("Error retrieving user data.");
          });
          
        })
        .catch((error) => {
         // alert("Error: " + error.message);
          console.error("Login error:", error);
          errorMessage.textContent = "Incorrect email or password. Please try again.";
          errorMessage.style.display = "block";

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
            email: email,
            isAdmin: false //Default to false unless manually changed
          })
          .then(() => {
            alert("Registration successful!");
            window.location.href = "login.html"; // Redirect after successful registration
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

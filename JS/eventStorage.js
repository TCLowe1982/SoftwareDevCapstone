import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, push, set, get, child } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";  

// Firebase Configuration
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
const db = getDatabase(app);

// Function to store event in Firebase
function storeEvent(eventTitle, eventDateTime) {
    const eventsRef = ref(db, 'events');  
    const newEventRef = push(eventsRef); // Generate unique key

    set(newEventRef, {
        title: eventTitle,
        dateTime: eventDateTime
    })
    .then(() => {
        console.log("Event stored successfully in Firebase!");
        alert("Event saved to database!");
    })
    .catch(error => {
        console.error("Error storing event: ", error);
        alert("Failed to save event.");
    });
}

// Function to retrieve events from Firebase
async function fetchEvents() {
    const eventsRef = ref(db, 'events');
    try {
        const snapshot = await get(eventsRef);
        if (snapshot.exists()) {
            const events = snapshot.val();
            return Object.values(events); // Convert object to array
        } else {
            console.log("No events found.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

// Export functions
export { storeEvent, fetchEvents };

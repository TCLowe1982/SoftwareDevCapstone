import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, push, set, get, child } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";  
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js"

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
const auth = getAuth();
const db = getDatabase(app);

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated. Please log in."));
      }
    });
  });
}

// Function to store event in Firebase
async function storeEvent(eventTitle, startDateTime, endDateTime, location, description) {
    try{
        const user = await getCurrentUser();
        const adminId = user.uid;
        const eventsRef = ref(db, 'events');
        const counterRef = ref(db, 'eventCounter');

    const snapshot = await get(counterRef);
    let eventId = 0;

    if (snapshot.exists()) {
      eventId = snapshot.val(); // Fetch the current event ID count
    }

    // Increment event ID for next event
    await set(counterRef, eventId + 1);

    const newEventRef = ref(db, `events/${eventId}`); // Use eventId as the key
    await set(newEventRef, {
      eventId,
      title: eventTitle,
      startDateTime,
      endDateTime,
      location,
      description,
      createdBy: adminId,
    });

    console.log("Event stored successfully in Firebase!");
  } catch (error) {
    console.error("Error storing event: ", error);
    alert("Failed to save event.");
  }
}

async function fetchEvents() {
  try {
    const user = await getCurrentUser();
    const adminId = user.uid;
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const events = snapshot.val();
      return Object.values(events).filter(
        (event) => event.createdBy === adminId
      );
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function fetchAttendees(eventId) {
    console.log("fetchAttendees runninggggg", eventId);
    try {
      const attendanceRef = ref(db, "attendance");
      const snapshot = await get(attendanceRef);
  
      if (!snapshot.exists()) {
        console.warn("No attendance records found.");
        return [];
      }
  
      const allAttendance = snapshot.val();
  
      let attendees = [];
  
      for (let eventKey in allAttendance) {
        if (allAttendance.hasOwnProperty(eventKey)) {  
          const eventRecords = allAttendance[eventKey]; 
          for (let attendeeKey in eventRecords) {
            if (eventRecords.hasOwnProperty(attendeeKey)) {
              const record = eventRecords[attendeeKey];
  
              // Check if the eventId matches
              if (String(record.eventId) === String(eventId)) {
                attendees.push(record);
              }
            }
          }
        }
      }
  
      console.log("Matched attendees:", attendees);
      return attendees;
    } catch (error) {
      console.error("Error fetching attendees:", error);
      return [];
    }
  }
// Export functions
export { db, ref, get, storeEvent, fetchEvents, fetchAttendees };

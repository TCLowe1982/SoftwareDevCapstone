# Attendance Management System
What we are attempting to build is an attendance management system, that will allow registered administrators (referred to as admins) to create and manage events, and track the attendance of said events, via web portal and through a CSV file that will be sent to them if they prefer that option. Attendance will be taken via QR code that is scanned from the attendee’s (referred to as client) device, and then their attendance will be recorded for the event. 

## Core Functionality 
1.	As an administrator, I want to be able to create an event, and record attendance at the event.
2.	As a client, I want to be able to record my attendance at the event.

Results from ChatGPT highlighted in yellow are options it suggested that we are not wanting to implement at this time. They were kept for record, and research purposes.

## From ChatGPT:

Here are some user stories for your meeting attendance tracking web app:
### QR Code Scanning and Attendance Tracking
1.	As an admin, I want to generate unique, valid QR codes for each event so attendees can scan them to record their attendance.
2.	As a client, I want to scan a QR code at the event to mark my attendance easily.
~~ 3.	As an admin, I want the app to validate scanned QR codes to ensure attendance is recorded accurately.~~
### Event Management
4.	As an admin, I want to create new events with details like name, date, and time so I can track attendance for specific events.
5.	As an admin, I want to view a list of all my events so I can easily manage them.
6.	As an admin, I want to edit or delete event details so I can keep the information up to date.
7.	As an admin, I want to create recurring events with customizable schedules (e.g., daily, weekly, monthly) so I can easily manage regular meetings without having to recreate them each time.
### Attendance Reports
7.	As an admin, I want to view a real-time list of attendees for my events so I can monitor attendance during the event.
8.	As an admin, I want to receive attendance reports via email in CSV format after the event so I can keep a record of participation.
9.	As an attendee, I want to receive a receipt for attending the event via email, based on my selected preferences, so I can have proof of participation in my preferred format.

### Admin Authentication and Access Control
10.	As an admin, I want to sign up and log in securely to manage my events and access attendance data.
11.	As an admin, I want to grant access to co-organizers or team members so they can help manage attendance for events.

### Notifications
~~ 12.	As an admin, I want to receive notifications when a client successfully checks in so I can confirm their attendance in real-time. ~~
Admin and Analytics Features
~~ 13.	As an admin, I want to see analytics on attendance trends, like peak times or repeat attendees, to improve event planning. ~~
~~ 14.	As an admin, I want to track no-shows to follow up with registered clients who did not check in. ~~


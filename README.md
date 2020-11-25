# Realtime_Chat-and-weather-checker-app

## Introduction

### Weather checker
Javascript framework can trace GPS elements to utmost accuracy and also detect weather conditions. *For heightened accuracy and real time weather mapping, Javascript can be a good choice for application developers.* Pairing postal codes to detect the weather as well as provide forecasts are features that developers can look towards building using the Javascript source nodes. And Online Chat with node.js and socket.io

## AIM 
A chat application has been created with the additional functionality of **displaying weather to the users according to the location.** It aims at providing users with the functionality of viewing profile of other users and **chatting with them and also chat with the whole community of the app.**

## Dependencies
***The web application uses node.js and express framework. It  also uses socket.io as required in the project brief. Additional libraries used are:***
- Passport.js ,passport-local,passport Local mongoose ,cookie-session and bcrypt: for authentication
- MongoDB and mongoose to register users and save messages.
- Ejs for templating
- Connect-flash : to display success and error messages to users and are cleared after being displayed to the user.
- Socket.io : for real time communication

## Features
- Users can register and login . Whenever a user logs in, a session is created for that user , and remains logged in until he/she logs out of the application.
- Access to views which require login  is controlled.
- Users can also view the weather of the current location .They can also view all other users and their profile which includes the weather of the location of that user.
- This feature uses an API to fetch the weather information of the location required.
- Users can chat with all the users of the application and also chat individually with any user they want.
- The chat application has a feature to show the users online and the user who is typing currently.

## Folder Structure
- App.js : main file and entry point of the application
- Routes : 
  - Chats : it includes route to render the view for chats
  - Findfriends : It includes routes to view all other users, profile of other users.
  - Users : It includes routes to render login and registration forms.
- Views:
  - Findfriends 
    - Show.ejs: renders the profile of requested user
    - Index.ejs : renders the list of users
  - Layouts/boilerplate.js: it contains boilerplate for the views.
  - Partials
    - Navbar.ejs
    - Flash.ejs
    - Footer.ejs
  - Users
    - Login.ejs
    - Register.ejs
    - Profile.ejs
  - Chats.ejs : this is for rendering the chat view so that users can select users and chat with them.
  - Landing.ejs : landing page of the application
- Public (static files)
  - js 
    - Script.js : client side javascript for chats
    - App.js : client side javascript for profile.ejs
    - Register.js : to register the location of a user 
    - Friends.js : client side javascript for displaying profile of other users.
  - css
    - Index.css : css for chats.ejs
    - Style.css : css for profile.ejs
  - Images (images for weather display and includes the app logo)
  - Javascripts
    - validateForms : to validate login and register forms.
- Seeds/index.ejs : to reset the database.
- Middleware.ejs: checks whether user is authenticated 
- Package.json : it contains all the dependencies of the project
- Package-lock.json: It is made automatically when the “npm install” command is run.






## Realtime_Chat-and-weather-checker-app

# Introduction

Weather checker
Javascript framework can trace GPS elements to utmost accuracy and also detect weather conditions. For heightened accuracy and real time weather mapping, Javascript can be a good choice for application developers. Pairing postal codes to detect the weather as well as provide forecasts are features that developers can look towards building using the Javascript source nodes. And Online Chat with node.js and socket.io

# AIM 
A chat application has been created with the additional functionality of displaying weather to the users according to the location. It aims at providing users with the functionality of viewing profile of other users and chatting with them and also chat with the whole community of the app.

# Dependencies
The web application uses node.js and express framework. It  also uses socket.io as required in the project brief. Additional libraries used are:
1. Passport.js ,passport-local,passport Local mongoose ,cookie-session and bcrypt: for authentication
2. MongoDB and mongoose to register users and save messages.
3. Ejs for templating
4. Connect-flash : to display success and error messages to users and are cleared after being displayed to the user.
5. Socket.io : for real time communication

# Features
1. Users can register and login . Whenever a user logs in, a session is created for that user , and remains logged in until he/she logs out of the application.
2. Access to views which require login  is controlled.
3. Users can also view the weather of the current location .They can also view all other users and their profile which includes the weather of the location of that user.
4. This feature uses an API to fetch the weather information of the location required.
5. Users can chat with all the users of the application and also chat individually with any user they want.
6. The chat application has a feature to show the users online and the user who is typing currently.




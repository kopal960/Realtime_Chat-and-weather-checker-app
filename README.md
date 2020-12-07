# Realtime_Chat-and-weather-checker-app

## Introduction

### Weather checker
Javascript framework can trace GPS elements to utmost accuracy and also detect weather conditions. *For heightened accuracy and real time weather mapping, Javascript can be a good choice for application developers.* Pairing postal codes to detect the weather as well as provide forecasts are features that developers can look towards building using the Javascript source nodes. 
### Online Chat with node.js and socket.io
Socket.io is used for realtime communication. It assigns a *socket id* to every client connected and *listens to events* emitted by them and acccordingly *emits events* to the clients connected. Here ,it is used for real time community chat and private chat between two users along with the basic events of showing online users and typing event in a chat application.

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
- Models :
  - User.js : it includes model of user
  - Messages.js : it includes model of messages sent by the sender  
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



## Screenshots

- Landing 
![Screenshot 2020-11-25 at 2 38 46 PM](https://user-images.githubusercontent.com/53987760/100206135-f5de0700-2f2b-11eb-9005-a42cba01042c.png)

- Login View
![Screenshot 2020-11-25 at 2 41 47 PM](https://user-images.githubusercontent.com/53987760/100206474-608f4280-2f2c-11eb-83a7-2631df59eb75.png)

- Register View 
![Screenshot 2020-11-25 at 2 49 18 PM](https://user-images.githubusercontent.com/53987760/100207276-6b96a280-2f2d-11eb-88d1-938cd972b63d.png)

- Home
![Screenshot 2020-11-25 at 4 06 27 PM](https://user-images.githubusercontent.com/53987760/100216612-7c98e100-2f38-11eb-8f4b-2c9795b2989b.png)

- Profile
![Screenshot 2020-11-25 at 2 55 17 PM](https://user-images.githubusercontent.com/53987760/100208054-49e9eb00-2f2e-11eb-874c-19400b642b24.png)

- Chat View
![Screenshot 2020-11-16 at 11 19 45 PM](https://user-images.githubusercontent.com/53987760/100216851-cb467b00-2f38-11eb-94a3-9c5de3733b7b.png)
## Live Project
   Deployed using heroku : https://sky-chat2.herokuapp.com/



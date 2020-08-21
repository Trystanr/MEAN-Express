# MEAN Express

<h3 align="center">Trystan Rivers 2020</h3>
<br />
<p align="center">

<h3 align="center">Teacher Portal</h3>

<p align="center">
	Register &amp; Login and view class data.
	<br />
	<a href="#about-the-project"><strong>Explore the docs »</strong></a>
	<br />
	<br />
	<a href="https://youtu.be/_Ar2QRVhH34">View Demo</a>
</p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [App Features](#app-features)
* [User Guide](#user-guide)
* [Installing and running the project](#installing-and-running-the-project)
* [Notes](#notes)
* [Demo Video](#demo-video)
* [Plagiarism](#plagiarism)
* [Requests](#example-requests)

## About The Project

A teacher portal built using an Express backend and React frontend. 

The brief for this project was to create an Express server for an online high school scheduling system.


### Built With

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)

### Node Modules

#### Express
* bcrypt: ^5.0.0,
* body-parser: ^1.19.0,
* cookie-parser: ^1.4.5,
* cors: ^2.8.5,
* dotenv: ^8.2.0,
* express: ^4.17.1,
* jsonwebtoken: ^8.5.1,
* nodemon: ^2.0.4

#### React
* @testing-library/jest-dom: ^4.2.4,
* @testing-library/react: ^9.5.0,
* @testing-library/user-event: ^7.2.1,
* jsonwebtoken: ^8.5.1,
* react: ^16.13.1,
* react-dom: ^16.13.1,
* react-router-dom: ^5.2.0,
* react-scripts: ^3.4.3,
* universal-cookie: ^4.0.3


### App Features:
* Styled interface
* Dynamic data
* Robust Express backend
* Local user authentication
* JWT Authentication
* Bcrypt password hashing
* Local cookie authentication

### User Guide
#### Installing and running the project

1. Clone this repo to your local machine.
1. cd to `server`
1. Run `npm install`
1. Run `nodemon`
1. Open a new terminal instance
1. Run `npm install`
1. Run `npm run build`
1. On build completion, navigate to `localhost:8000`

### Notes

* Important note: Chrome does not store cookies on localhost. I used Microsoft Edge to test the project, as it allows for cookies on localhost.
* Important note: This version is insecure, unhashed passwords are saved for clarity sake, but the server is using hashed passwords for authentication.
* Important note: This version is insecure, CORS is set for all domains. This should change for a production build.

### Demo Video

[Short Demo](https://youtu.be/_Ar2QRVhH34)


### Plagiarism

[Form Here](https://github.com/Trystanr/MEAN-Express/blob/master/Plagiarism.pdf)


## Example Requests

### Get a list of all the classes
`localhost:8000/api/v1/classes?passcode=owiteacher`


### Get Details of a particular class
`localhost:8000/api/v1/class/5?passcode=owiteacher`


### Get a specific project brief
`localhost:8000/api/v1/project/1/brief?passcode=owiteacher`


### Get a list of classes taught by a particular teacher
`localhost:8000/api/v1/teacher/2/classes?passcode=owiteacher`


### Get a list of classes taken by a particular learner
`localhost:8000/api/v1/learner/2/classes?passcode=owiteacher`


### Get a user id when a valid email and password are supplied
`localhost:8000/api/v1/login?passcode=owiteacher&email=murray@highschool.com&password=4567`


### Run instructions

## Development
### Both must be running at the same time
`npm run` in `~/frontend`
Builds React frontend

`nodemon` in `~/server`
Runs Express server

## Production
`npm run-script build` in `~/frontend`
Builds React frontend

`nodemon` in `~/server`
Runs Express server
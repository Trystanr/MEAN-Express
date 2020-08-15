# MEAN Express
 Open Window MEAN-Express


Navigate to `MEAN-Express\server`

Call `nodemon`



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


Use JWT for authentication

React hooks - call api - save into state
React using hooks only
Codesandbox

Create react app, useState
functional component instead of class

useEffect - inside function, fetch
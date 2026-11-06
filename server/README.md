#1.grs

## step:1
create a folder name =>grs

## step:

create a react project with bootstrap, axios, react-router-dom

 ## step-3
 create server folder for handle the backend in the parent folder grs


 # server
 1.initalize the project node app using npm init -y
 2.install all require package

 ## express
 use for logic and creating REST API's

 ## mongoose
 used for mongodb database handling
 command:- npm i mongoose

 ## dnotenv
 dotenv used for store the hidden or sensitive credentials like db connection, network port etc.
 npm i dot env


 ## bcryptjs
 it is used for hash the passsword in the encrypted way 
 npm i bcryptjs


 ## nodemailer
 it is used for implement the email sending functionality to a user
 npm i nodemailer

## jsonwebtoken
it is used for authentication

 ## whole
 npm i express mongoose dotenv bcryptjs nodemon nodemailer jsonwebtoken

## schema:-
### admin schema
field:- name, email , password



## client
creade folder -> pages
                1.Home.jsx
                2.AdminLogin.jsx
                3.UserLogin.jsx
                4.UserRegister.jsx
                    name, fname, email, mobile, college(select), course(select), session(select), enrollment(text),
                    password, dob, gender, address
                5.folder
                    admin
                6.folder
                    user



### collge Schema 
    name
    description
    status
    timestamps


## session\





## complaint type
ex-ComplaintType
    name
    description
    status
    timestamps


    ## cmpt id 
    description
    status value[active,inactive,delete]
    not processed
    cmp cmp status
    pending closed


    view, blocked , update
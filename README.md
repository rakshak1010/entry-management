# Summergeeks Internship Assignment

Entry management system for office.



## Tech-Stack
- ***Backend:*** Node.js
- ***Frontend:*** Embedded Javascript(.ejs)
- ***Database:*** PostgreSql
- ***API:*** Nexmo (for sending SMS)



## Solution Approach
- At the landing page, the user can choose between ***find your host*** (if the user is a *visitor*) and ***register as host*** (if the user is a *host*).
- In the ***find your host*** page, the visitor can see the list of all hosts in the office along with their address and the visitor can choose his/her host by clicking on the *get appointment* button.
- The visitor is then redirected to a fill in his/her details and after a successful submission, the *host* receives an **email and SMS** stating the details of the visitor. At the same time the *visitor* receives an **email and SMS** with the successful check-in notification and also the **checkout link** where he/she must visit at the time of checkout.
- In the ***register as host*** page, the host is redirected to a page where he/she can fill in the details to get registered.
- After the **visitor** visits the *checkout link*, he/she receives an **email and SMS** stating all the details about their visit to the office.


## Requirements

```bash
Node.js Installed
PostgreSql Installed
```
#### Create a new database in psql



## Project Setup
1. Download the repository
2. Extract it to a folder
3. Change your current directory to the project folder.
4. Make the below changes in *config.js* file



## Database Connection
In the [Config](https://github.com/rakshak1010/summergeeks-internship/blob/master/config/config.js) file, make the following changes in **"development"**:

1. Change the **"username"** (currently *"db_user_name"*) with the username of your database.
2. Change **"password"** with the password of your DB user.
3. Change **"database"** with the name of your database created during PostgreSql installation.
4. Change **"host"** and **"port"** according to your system requirements.



## Using Nodemailer

In the [Config](https://github.com/rakshak1010/summergeeks-internship/blob/master/config/config.js) file, make the following changes in **"mailinfo"**:

1. Change the **"username"** with your gmail account's email id.
2. Change the **"password"** with your email accounts password to complete the authentication.
3. Change the **"webdomain"** with the *url* where your local server is listening.
(*localhost:3000*)

> **Note:** Nodemailer requires your gmail account details for authentication and sending mails. Hence, it should be used with caution.

#### You must enable the [Less Secure Apps](https://myaccount.google.com/lesssecureapps) for your email account to allow nodemailer to send mails.


## Using Nexmo (SMS API)

1. Create an account on [nexmo](https://www.nexmo.com/)
2. In the [Config](https://github.com/rakshak1010/summergeeks-internship/blob/master/config/config.js) file, change **"nexmoSMS"** values for *"API_KEY"*, *"SECRET_KEY"* and the *"whitelist_contact"* (the one registered on your API)

> **NOTE:** The trial version for nexmo allows messaging services only for the whitelisted numbers in your account. This project won't be able to send messages to any number which is not whitelisted in my account.  
> To check the functionality, you will have to create your own API account.

**Please follow [documentation](https://developer.nexmo.com/documentation) for further details.**



## Running the Project

With your current directory set to the project directory, run the following commands:
```
npm install
npm start 
```
Your server is now listening at **localhost:3000**


## Screenshots

The [Screenshot](https://github.com/rakshak1010/summergeeks-internship/tree/master/Screenshots) folder contains the screenshots of working project (*SMS and email* included)

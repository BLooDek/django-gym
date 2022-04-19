# djang-gym
React + Django app

## Features
  
### Auth
#### Registration
#### Login with email + password
#### Passwordless login
#### Persistent login session
#### Logout

## Calendar
#### Add/Edit/Delete of events
#### Gesture handling: drag&drop + resizing events
#### Signing in/out of events




## How to run things locally
To start Django  
`Python 3.10 and pipenv required`  
In ./backend/config folder create .env file with:  

`EMAIL_HOST = ""`  
`EMAIL_HOST_USER = ""`  
`DEFAULT_FROM_EMAIL = ""`  
`EMAIL_HOST_PASSWORD = ""`  
`EMAIL_PORT =  `  
`SECRET_KEY = "" `  

./backend/
python -m venv venv
cd venv\Scripts
activate

Again in ./backend/
pip install -r requirements.txt
python .\manage.py migrate
python .\manage.py runserver

To run frontend:
npm i
npm start
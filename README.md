# Find-bundit
#### Get Graduates' Location and Take a Photo with Them!!

This project core is powered by `React` `MobX` and `Express`.
Web view is implemented with `Material UI`.
## Prerequisites
```
MongoDB
```
## Installation
```
git clone https://github.com/mexeniz/find-bundit
cd find-bundit
npm install
```
## Test
edit your own account and database url in config.js
```
sudo mongod
npm start
```
then insert that account by call
```
curl localhost:3000/api/setup
```
you can login at `http://localhost:3000/login` and push location at `http://localhost:3000/locator`
## Backend API
**_POST_** /api/setup

_arguments_
- none

**return** {success: true} 

---
**_GET_** /api/myLocation

_arguments_
- none

**return** {lat,lng}

---
**_POST_** /api/authenticate

_arguments_
- username `string`
- password `string`

**return** token: <token> if user is valid.

---
**_POST_** /api/setLocation

_arguments_
- token `string`
- lat `string`
- lng `string`

**return** status:"OK" if token is valid.

---
## Production
Client must access via `https` due to a constraint of `Geolocation API`

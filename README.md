# Find-bundit
#### Get Graduates' Location and Take a Photo with Them!!
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
```
sudo mongod
npm start
```
access website at 'http://localhost:3000'
## Backend API
**_POST_** /api/setup

_arguments_
- none

---
**_GET_** /api/myLocation

_arguments_
- none

---
**_POST_** /api/authenticate

_arguments_
- username `string`
- password `string`

---
**_POST_** /api/setLocation

_arguments_
- token `string`
- lat `string`
- lng `string`

---
## Production
Client must access via `https` due to constraints of 'Geolocation API'

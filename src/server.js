import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { renderToString } from 'react-dom/server'
import React from 'react'
import mongoose from 'mongoose'
import morgan from 'morgan'
import apiRouter from './api-server'
import config from '../config'

const app = express()
const PORT = 3000;
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))
mongoose.connect(config.database); // connect to database

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

const renderFullPage = () => {
	return (`
	<!doctype html>
	<html lang="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<head>
			<link rel="icon" type="image/x-icon" href="/image/favicon.ico" />
			<title>Mma - Graduation</title>
			<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWPkc97QJBhtdg6ZM8UgnOOkco3lgEXyw" ></script>
		</head>
		<body style="margin:0px;overflow=hidden;">
			<div id="app" ></div>
			<script src="/static/bundle.js"></script>
			<footer>
			</footer>
		</body>
	</html>
	`)
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/image',express.static(__dirname + '/image'));
app.use('/api',apiRouter);
app.get('/*', function(req, res) {

	const page = renderFullPage();

	res.status(200).send(page);
});

// example of handling 404 pages
app.get('*', function(req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

// global error catcher, need four arguments
app.use((err, req, res, next) => {
	console.error("Error on request %s %s", req.method, req.url);
	console.error(err.stack);
	res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
	console.log('uncaughtException: ', evt);
});


app.listen(PORT, '0.0.0.0',  () => {
	console.log('Web Server Start...')
});

// init api
//
// const api = express()
//
// api.use(bodyParser.json());
// api.use("/",apiRouter);
// api.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// api.listen(API_PORT, () => {
// 	console.log('API Server Start at '+ API_PORT)
// });

// init socket.io
// var server = require('http').createServer();
// var io = require('socket.io')(server);
// var port = 3001;
// server.listen(port, '0.0.0.0' , function () {
//   console.log('Server listening at port %d', port);
// });
//
// function sleep (time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }
//
// const locationInterval = 5000;
// const activated = true ;
// let myLocation = {
// 	name: "Mmarcl",
// 	id: 1,
// 	lat: 0.0,
// 	lng: 0.0
// }
//
// console.log('Start Socket.io...');
// io.on('connection', socket => {
// 	// if (activated){
// 	// 	setInterval(() => {
// 	// 			console.log("Send Location lat="+myLocation.lat+" lng="+myLocation.lng);
// 	// 			socket.emit('location', myLocation);
// 	// 		}, locationInterval);
// 	// }
// 	socket.on('get location', (id,setLocationCallBack) => {
// 		console.log('get request for location... id='+id)
// 		setLocationCallBack(myLocation);
// 	});
// 	console.log('new connection!');
// 	socket.on('update location', (location) => {
// 		console.log('Recv location update..')
// 		Object.assign(myLocation, location)
// 		console.log(myLocation)
// 	});
// })

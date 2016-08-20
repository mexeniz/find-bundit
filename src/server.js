import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { renderToString } from 'react-dom/server'
import React from 'react'
const app = express()
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

const renderFullPage = () => {
	return (`
	<!doctype html>
	<html lang="utf-8">
		<head>
		</head>
		<body style="margin:0px;">
			<div id="app" ></div>
			<script src="/static/bundle.js"></script>
			<footer>
			</footer>
		</body>
	</html>
	`)
};

let todos = []; // Todos are stored here

app.use(bodyParser.json());

app.get('/*', function(req, res) {

	const page = renderFullPage();

	res.status(200).send(page);
});

app.post('/api/todos', function(req, res) {
	todos = req.body.todos;
	if (Array.isArray(todos)) {
		console.log(`Updated todos (${todos.length})`);
		res.status(201).send(JSON.stringify({ success: true }));
	} else {
		res.status(200).send(JSON.stringify({ success: false, error: "expected `todos` to be array" }));
	}
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


app.listen(3000, () => {
	console.log('Web Server Start...')
});

// init socket.io
var server = require('http').createServer();
var io = require('socket.io')(server);
var port = 3001;
server.listen(port , function () {
  console.log('Server listening at port %d', port);
});

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



io.on('connection', socket => {
	console.log('Start Socket.io...');
	setInterval(() => {
			console.log("Send Location");
			socket.emit('location', {
				 lat: 99.99,
				 lng: 11.11
			 });
		}, 2000);
})

import express from 'express'

var apiRouter = express.Router()

let myLocation = {
	name: "Mmarcl",
	id: 1,
	lat: 0.0,
	lng: 0.0
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

apiRouter.get('/myLocation', function(req, res, next) {
  res.json(myLocation);
});

apiRouter.post('/setLocation', function(req, res, next) {
  var newLocation = req.body;
	console.log('client ip:'+ req.headers.host)
	console.log('user-agent:'+ req.headers['user-agent'])
	console.log('get new location'+ newLocation)
	if ('lat' in newLocation && 'lng' in newLocation){
		let lat = parseFloat(newLocation.lat)
		let lng = parseFloat(newLocation.lng)
		if (isNumber(lat) && isNumber(lng) && lat >= 0.0 && lng >= 0.0){
			Object.assign(myLocation,{lat: lat,lng : lng})
			res.json({
				status : 'OK'
			});
		}else{
			res.status(500).json({
				error : 'Numeric conversion failed'
			});
		}
	}else{
		res.status(500).json({
			error : 'Wrong body format'
		});
	}


});
export default apiRouter

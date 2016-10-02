import {observable, computed, action} from 'mobx';
import {LocationModel} from '../models'

export default class LocationStore {

	socket;
	@observable location ;
	@observable clientLocation ;

	constructor () {
	  this.location = new LocationModel(this, 1, '', -1, -1);
		this.clientLocation = new LocationModel(this, 2, 'client', -1, -1);
		navigator.geolocation.getCurrentPosition( (position) => {
      var {latitude,longitude} = position.coords;
      this.clientLocation.setLocation(latitude, longitude);
    });
	}


	// subscribeServerToStore() {
	// 	autorun(() => {
	// 		const locations = this.toJS();
	// 		if (this.subscribedServerToModel !== true) {
	// 			this.subscribedServerToModel = true;
	// 			return;
	// 		}
	// 		fetch('/api/todos', {
	// 			method: 'post',
	// 			body: JSON.stringify({ todos }),
	// 			headers: new Headers({ 'Content-Type': 'application/json' })
	// 		})
	// 	});
	// }

	// createLocation (name, lat, lng) {
	// 	this.location = new LocationModel(this, 1, name, lat, lng);
	// }
	@action setName (name) {
		this.location.name = name;
	}
	@action setLocation (lat, lng,updatedAt) {
		this.location.setLocation(lat,lng,updatedAt)
	}
	@action setLat (lat) {
		this.location.setLat(lat)
	}
	@action setLng (lng) {
		this.location.setLng(lng)
	}
	toJS() {
		return this.location.toJS();
	}

	static fromJS(array) {
		const locationStore = new LocationStore();
		locationStore.locations = array.map(item => LocationModel.fromJS(locationStore, item));
		return locationStore;
	}
}

import {observable} from 'mobx'

export default class LocationModel {
	store;
	id;
  name;
	@observable lat;
	@observable lng;

	constructor (store,name, id, lat, lng) {
		this.store = store;
		this.id = id;
		this.name = name;
		this.lat = lat;
		this.lng = lng;
	}

	setName(name) {
		this.name = !this.name;
	}

	destroy() {
		this.store.maps.remove(this);
	}

	setLocation(lat,lng) {
		this.lat = lat;
    this.lng = lng;
		console.log(lat + '...' + lng)
	}

	toJS() {
		return {
			id: this.id,
			name: this.name,
			lat: this.lat,
			lng: this.lng
		};
	}

	static fromJS(store, object) {
		return new LocationModel(store, object.id, object.name, object.lat, object.lng);
	}
}

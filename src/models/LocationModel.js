import {observable} from 'mobx'

export default class LocationModel {
	store;
	id;
  @observable name;
	@observable lat;
	@observable lng;
	@observable updatedAt;
	@observable isActive;

	constructor (store,name, id, lat, lng) {
		this.store = store;
		this.id = id;
		this.name = name;
		this.lat = lat;
		this.lng = lng;
		this.updatedAt = null;
		this.isActive = null;
	}
	setActive(active) {
		this.isActive = active;
	}

	setName(name) {
		this.name = name;
	}

	destroy() {
		this.store.maps.remove(this);
	}

	setLocation(lat,lng, updatedAt, isActive) {
		this.lng = parseFloat(lng);
		this.lat = parseFloat(lat);
		if(updatedAt){
			this.updatedAt = this.timeSince(Date.parse(updatedAt));
		}
		this.isActive = isActive;
	}
	setLat(lat) {
		this.lat = lat
	}
	setLng(lng) {
		this.lng = lng
	}
	toJS() {
		return {
			id: this.id,
			name: this.name,
			lat: this.lat,
			lng: this.lng
		};
	}
	timeSince (date) {
	    var seconds = Math.floor((new Date() - date) / 1000);
	    var interval = Math.floor(seconds / 31536000);
	    if (interval > 1) {
	        return interval + " years";
	    }
	    interval = Math.floor(seconds / 2592000);
	    if (interval > 1) {
	        return interval + " months";
	    }
	    interval = Math.floor(seconds / 86400);
	    if (interval > 1) {
	        return interval + " days";
	    }
	    interval = Math.floor(seconds / 3600);
	    if (interval > 1) {
	        return interval + " hours";
	    }
	    interval = Math.floor(seconds / 60);
	    if (interval > 1) {
	        return interval + " minutes";
	    }
	    return Math.floor(seconds) + " seconds";
	}

	static fromJS(store, object) {
		return new LocationModel(store, object.id, object.name, object.lat, object.lng);
	}
}

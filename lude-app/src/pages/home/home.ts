import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private geolocation: Geolocation,
              private googleMaps: GoogleMaps) {
    
  }
  ngAfterViewInit() {
    this.getCurrentPosition();
  }

loadMap(latitude, longitude) {
 let element: HTMLElement = document.getElementById('map');

 let map: GoogleMap = this.googleMaps.create(element);
 debugger;
 map.one(GoogleMapsEvent.MAP_READY).then(() => {
  console.log('Map is ready!');
  let ionic: LatLng = new LatLng(latitude,longitude);

  let position: CameraPosition = {
    target: ionic,
    zoom: 18,
    tilt: 30
  };

  map.moveCamera(position);

  let markerOptions: MarkerOptions = {
    position: ionic,
    title: 'Ionic'
  };

  const marker: any = map.addMarker(markerOptions)
    .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  }).catch((error)=>{
    console.log(error);
  });
 }



  latitude:any;
  longitude:any;

  public getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then((response)=>{
      this.latitude = response.coords.latitude;
      this.longitude = response.coords.longitude;
      this.loadMap(this.latitude, this.longitude);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

}

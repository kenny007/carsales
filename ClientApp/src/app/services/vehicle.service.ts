import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveVehicle } from '../models/vehicle';



@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';
  constructor(private httpClient: HttpClient) { }

  getMakes(){
    return this.httpClient.get('/api/makes'); //you don't need to call res.json() again
  }

  getFeatures() {
    return this.httpClient.get('/api/features');
  }

  create(vehicle){
    return this.httpClient.post(this.vehiclesEndpoint, vehicle);
  }

  getVehicle(id){
    return this.httpClient.get(this.vehiclesEndpoint + '/' + id);
  }

  getVehicles(filter) {
    return this.httpClient.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  
  toQueryString(obj) {
    var parts = [];
    for (var property in obj){
      var value = obj[property];
       if(value != null && value != undefined)
       parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    } 
       return parts.join('&');
  }

  // toQueryString(obj) {
  //   var parts = [];
  //   for (var property in obj) {
  //     var value = obj[property];
  //     if (value != null && value != undefined) 
  //       parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
  //   }

  //   return parts.join('&');
  // }

  update(vehicle: SaveVehicle) {
    return this.httpClient.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle);
  }

  delete(id) {
    return this.httpClient.delete(this.vehiclesEndpoint + '/' + id);
  }
}

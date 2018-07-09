import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class VehicleService {

  constructor(private httpClient: HttpClient) { }

  getMakes(){
    return this.httpClient.get('/api/makes'); //you don't need to call res.json() again
  }
  getFeatures() {
    return this.httpClient.get('/api/features');
  }

}

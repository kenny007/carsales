import { VehicleService } from './../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
       this.vehicleService.getMakes()
       .subscribe(makes => this.makes =  makes as KeyValuePair[]);
       this.vehicleService.getVehicles()
                  .subscribe(vehicles => this.vehicles = <Vehicle[]>vehicles);
  }

}

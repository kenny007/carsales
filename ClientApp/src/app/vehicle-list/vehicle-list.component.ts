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
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
       this.vehicleService.getMakes()
       .subscribe(makes => this.makes =  makes as KeyValuePair[]);
      
       this.populateVehicles();
  }
  
  private populateVehicles(){
    this.vehicleService.getVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = <Vehicle[]>vehicles);
  }

  onFilterChange(){
    this.filter.modelId = 2;
    this.populateVehicles();
  }

  resetFilter(){
    this.filter = {};
    this.onFilterChange();
  }
}

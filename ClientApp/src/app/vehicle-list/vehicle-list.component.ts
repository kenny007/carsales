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
  query: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
       this.vehicleService.getMakes()
       .subscribe(makes => this.makes =  makes as KeyValuePair[]);
      
       this.populateVehicles();
  }
  
  private populateVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe(vehicles => this.vehicles = <Vehicle[]>vehicles);
  }

  onFilterChange(){
   // this.filter.modelId = 5;
    this.populateVehicles();
  }

  resetFilter(){
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName){
    if(this.query.sortBy = columnName){
      this.query.isSortAscending = false;
    } else{
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }
}

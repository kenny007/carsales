import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
  providers: [VehicleService]
})
export class VehicleFormComponent implements OnInit {
  makes : any[]; //if you use any and not any[] you won't have intellisence of 
  //all the methods available U don't even need it as by default identifiers in C# have d type any
  models : any[];
  features: any[];
  vehicle: any = {
    features: [],
    contact: {}
  }
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe( makes => this.makes = <any>makes);
    this.vehicleService.getFeatures().subscribe(features => this.features = <any>features)
  }

  onMakeChange() {
   var selectedMake = this.makes.find(m=>m.id == this.vehicle.makeId);
   this.models = selectedMake ? selectedMake.models: [];
   delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event){
    if($event.target.checked)
    this.vehicle.features.push(featureId);
     else{
       var index = this.vehicle.features.indexOf(featureId);
       this.vehicle.features.splice(index,1);
     }
  }
  submit(){
    this.vehicleService.create(this.vehicle)
        .subscribe(x => console.log(x));
  }
}

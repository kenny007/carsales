import * as _ from 'underscore';
import { SaveVehicle, Vehicle } from './../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/forkJoin';

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
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name:'',
      phone:'',
      email:''
    }
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private vehicleService: VehicleService,
              private toastyService: ToastyService) {

                route.params.subscribe(p=> {
                    this.vehicle.id = +p['id'];
                });
               }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];
    if(this.vehicle.id)
    sources.push(this.vehicleService.getVehicle(this.vehicle.id))

    Observable.forkJoin(sources).subscribe(data => {
        this.makes = <any>data[0];
        this.features = <any>data[1];

        if(this.vehicle.id){
          this.setVehicle(<Vehicle>data[2]);
          this.populateModels();
        }        
    }, err => {
         if(err.status == '404')
         this.router.navigate(['/']);
    });
  }

  private setVehicle(v: Vehicle){
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features,'id');
  }

  onMakeChange() {  
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels(){
    var selectedMake = this.makes.find(m=>m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models: [];
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
     if(this.vehicle.id){
       this.vehicleService.update(this.vehicle)
       .subscribe(x => {
          this.toastyService.success({
            title:'Success',
            msg:'The vehicle was successfully updated.',
            theme:'bootstrap',
            showClose:true,
            timeout: 5000
          })
       })
     }
     else{
      this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x)
        //this.toastsManager.error('Error','An unexpected error happened!')
      );
     }
      
  }
}

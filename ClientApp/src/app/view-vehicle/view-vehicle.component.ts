import { PhotoService } from './../services/photo.service';
import { VehicleService } from './../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from './../models/vehicle';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
@ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) {
      route.params.subscribe(p => {
         this.vehicleId = +p['id']
         if(isNaN(this.vehicleId) || this.vehicleId <= 0){
            router.navigate(['/vehicles']);
            return;
         }
      });
      
     }

  ngOnInit() {
     this.photoService.getPhotos(this.vehicleId)
     .subscribe(photos => this.photos = <any>photos);
     this.vehicleService.getVehicle(this.vehicleId)
         .subscribe(v => this.vehicle = v,
           err => {
             if(err.status == 404){
               this.router.navigate(['/vehicles'])
               return;
             }
           });
  }

  
  delete(){
    if(confirm("Are you sure?"))
    this.vehicleService.delete(this.vehicle.id)
    .subscribe(x=>{
       this.router.navigate(['/vehicles']);
    })
  }

  uploadPhoto(){
    var nativeElement: HTMLInputElement =  this.fileInput.nativeElement; //ref the file
    var file = nativeElement.files[0];
    nativeElement.value = '';
    this.photoService.upload(this.vehicleId,file)
        .subscribe(photo => {
          this.photos.push(photo);
        }, 
        err => {
          this.toasty.error({
            title: 'Error',
            msg: err.text(),
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
        })

        });
  }
  
}

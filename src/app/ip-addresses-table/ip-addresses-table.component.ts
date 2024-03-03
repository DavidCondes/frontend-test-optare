import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpAddressService } from '../services/ip-address.service';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps'
import { OnInit } from '@angular/core';
import { IpAddressModel } from '../models/ipAddress.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-ip-addresses-table',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, ReactiveFormsModule],
  templateUrl: './ip-addresses-table.component.html',
  styleUrl: './ip-addresses-table.component.css'
})
export class IpAddressesTableComponent{
  
  form!: FormGroup;
  ipAddresses:any;
  ipAddressSelected: string = "0.0.0.0";

  display: any;
  zoom = 5;

  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };



  constructor(private service:IpAddressService){}
  

  ngOnInit(){
    this.form = new FormGroup({
      ipAddress: new FormControl('')
    });

    this.service.getAllIpAddresses()
      .subscribe(response => {
        this.ipAddresses = response;
      });
    
      
  }

  deleteIpAddress(id: Int32Array){
    this.service.deleteIpAddress(id)
        .subscribe(response => {
          if(response.success){
            this.openModal();
          }
        });
  }

  openModal(): void{
    const modal = document.getElementById('modalDelete');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closeModal(modalId: string): void{
    const modal = document.getElementById(modalId);
    if(modal != null){
      modal.style.display = 'none';
    }
    
    if(modalId == 'modalDelete'){
      this.refresh();
    }
    
  }

  search(): void{
    this.service.searchByIp(this.form.value.ipAddress)
                .subscribe(response => {
                  if(Object.keys(response).length > 0){
                    this.ipAddresses = response;
                  }else{
                    this.openAlert();
                    this.form.get('ipAddress')?.reset('');
                  }
                });
  }

  openAlert(): void{
    const modal = document.getElementById('modalAlert');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  refresh(): void {
    window.location.reload();
  }

  openMap(lat: number, lon: number, ipAddress: string): void {
    this.ipAddressSelected = ipAddress;
    this.center = {
      lat: lat,
      lng: lon
    };

    const modal = document.getElementById('modalMaps');
    if(modal != null){
      modal.style.display = 'block';
    }
  }
  

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  

}

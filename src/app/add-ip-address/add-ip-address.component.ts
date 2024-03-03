import { CommonModule} from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IpAddressService } from '../services/ip-address.service';
import { IpAddressModel } from '../models/ipAddress.model';
import { ResponseModel } from '../models/response.model';


@Component({
  selector: 'app-add-ip-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-ip-address.component.html',
  styleUrl: './add-ip-address.component.css'
})
export class AddIpAddressComponent {

  form!: FormGroup;
  ipInfo!: IpAddressModel | null;
  showSuccess: boolean = false;
  responseService!: ResponseModel;

  constructor(private service: IpAddressService, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.form = new FormGroup({
      ipAddress: new FormControl('')
    });
  }

  submit(): void{
    
    let ip = this.form.value.ipAddress;
    this.service.saveIpAddress(ip)
      .subscribe(response => {
        
        this.responseService = response;

        if(response.success){
          this.ipInfo = response.ipInfo;
        }
        this.openModal();
        
      });
  }

  refresh(): void {
    window.location.reload();
  }

  openModal(): void{
    const modal = document.getElementById('exampleModal');
    if(modal != null){
      modal.style.display = 'block';
    }
  }

  closeModal(): void{
    const modal = document.getElementById('exampleModal');
    if(modal != null){
      modal.style.display = 'none';
    }
    this.refresh();
  }

}

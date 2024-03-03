import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddIpAddressComponent } from './add-ip-address/add-ip-address.component';
import { IpAddressesTableComponent } from './ip-addresses-table/ip-addresses-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddIpAddressComponent, IpAddressesTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'technical-optare';
}

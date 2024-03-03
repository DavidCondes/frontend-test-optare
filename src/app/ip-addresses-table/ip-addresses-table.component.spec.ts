import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAddressesTableComponent } from './ip-addresses-table.component';

describe('IpAddressesTableComponent', () => {
  let component: IpAddressesTableComponent;
  let fixture: ComponentFixture<IpAddressesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpAddressesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IpAddressesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

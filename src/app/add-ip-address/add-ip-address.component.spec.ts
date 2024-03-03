import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIpAddressComponent } from './add-ip-address.component';

describe('AddIpAddressComponent', () => {
  let component: AddIpAddressComponent;
  let fixture: ComponentFixture<AddIpAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIpAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIpAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

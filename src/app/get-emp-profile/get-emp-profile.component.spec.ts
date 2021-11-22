import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmpProfileComponent } from './get-emp-profile.component';

describe('GetEmpProfileComponent', () => {
  let component: GetEmpProfileComponent;
  let fixture: ComponentFixture<GetEmpProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEmpProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

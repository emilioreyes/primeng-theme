import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurguerMenuComponent } from './burguer-menu.component';

describe('BurguerMenuComponent', () => {
  let component: BurguerMenuComponent;
  let fixture: ComponentFixture<BurguerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurguerMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BurguerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

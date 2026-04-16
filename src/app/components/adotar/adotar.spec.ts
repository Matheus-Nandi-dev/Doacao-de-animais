import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adotar } from './adotar';

describe('Adotar', () => {
  let component: Adotar;
  let fixture: ComponentFixture<Adotar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adotar],
    }).compileComponents();

    fixture = TestBed.createComponent(Adotar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

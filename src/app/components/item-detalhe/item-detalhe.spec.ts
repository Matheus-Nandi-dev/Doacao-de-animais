import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetalhe } from './item-detalhe';

describe('ItemDetalhe', () => {
  let component: ItemDetalhe;
  let fixture: ComponentFixture<ItemDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

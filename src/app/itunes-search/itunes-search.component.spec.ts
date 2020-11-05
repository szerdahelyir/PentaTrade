import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItunesSearchComponent } from './itunes-search.component';

describe('ItunesSearchComponent', () => {
  let component: ItunesSearchComponent;
  let fixture: ComponentFixture<ItunesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItunesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItunesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

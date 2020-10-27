import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompContentComponent } from './comp-content.component';

describe('CompContentComponent', () => {
  let component: CompContentComponent;
  let fixture: ComponentFixture<CompContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

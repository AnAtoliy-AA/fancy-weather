import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsBlockComponent } from './controls-block.component';

describe('ControlsBlockComponent', () => {
  let component: ControlsBlockComponent;
  let fixture: ComponentFixture<ControlsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

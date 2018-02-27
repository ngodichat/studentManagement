import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAddComponent } from './session-add.component';

describe('AddComponent', () => {
  let component: SessionAddComponent;
  let fixture: ComponentFixture<SessionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

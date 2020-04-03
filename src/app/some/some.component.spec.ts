import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeComponent } from './some.component';
import { UserService } from '../users/user.service';
import { of } from 'rxjs';

describe('SomeComponent', () => {
  let component: SomeComponent;
  let fixture: ComponentFixture<SomeComponent>;
  let getUsersSpy, preEl;

  beforeEach(async(() => {
    const userService = jasmine.createSpyObj('UserService', ['getUsers']);
    getUsersSpy = userService.getUsers.and.returnValue(
      of([{ id: 1, name: 'Ivan' }])
    );

    TestBed.configureTestingModule({
      declarations: [SomeComponent],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeComponent);
    component = fixture.componentInstance;
    preEl = fixture.nativeElement.getElementsByTagName('pre')[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#clicked() should toggle #isOn', () => {
    expect(component.isOn).toBe(false, 'off at first');
    component.clicked();
    expect(component.isOn).toBe(true, 'on after click');
    component.clicked();
    expect(component.isOn).toBe(false, 'off after second click');
  });

  it('should show users inside pre tag', () => {
    expect(preEl.textContent).toEqual(
      JSON.stringify([{ id: 1, name: 'Ivan' }], null, 2)
    );
  });
});

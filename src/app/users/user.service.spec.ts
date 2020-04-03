import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';

let userServiceSpy: jasmine.SpyObj<UserService>;
let usersServise: UserService;

describe('UserService', () => {
  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUsers',
      'getUser',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    });
    usersServise = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(userServiceSpy).toBeTruthy();
  });

  it('#getUsers() should return 2 users', () => {
    const testUsers: User[] = [
      { id: 1, name: 'Ivan' },
      { id: 2, name: 'Petr' },
    ];
    userServiceSpy.getUsers.and.returnValue(of(testUsers));

    usersServise
      .getUsers()
      .subscribe(
        (users) => expect(users).toEqual(testUsers, 'users are equal'),
        fail
      );
  });

  it('#getUser() should return user by id', () => {
    const testUser: User = { id: 1, name: 'Ivan' };
    userServiceSpy.getUser.and.returnValue(of(testUser));
    usersServise.getUser(1).subscribe((user) => {
      expect(user).toEqual(testUser);
    });
  });

  it('#getUser() should return undefined or null', () => {
    userServiceSpy.getUser.and.returnValue(of(null));
    usersServise.getUser(1).subscribe((user) => {
      expect(user).toBeFalsy();
    });
  });
});

import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User } from './user';

const MockDB: User[] = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Petr' },
];
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers(): Observable<User[]> {
    return of(MockDB);
  }

  getUser(id: number): Observable<User> {
    return of(MockDB.find((user) => user.id === id));
  }
}

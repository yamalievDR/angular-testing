import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { Observable } from 'rxjs';
import { User } from '../users/user';

@Component({
  selector: 'app-some',
  templateUrl: './some.component.html',
  styleUrls: ['./some.component.scss'],
})
export class SomeComponent implements OnInit {
  isOn = false;
  users$: Observable<User[]> = this.userService.getUsers();
  constructor(private userService: UserService) {}
  clicked() {
    this.isOn = !this.isOn;
  }
  ngOnInit(): void {}
}

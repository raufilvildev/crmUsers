import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  imports: [ RouterLink ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: IUser = {
    _id        : '',
    id         : 0,
    first_name : '',
    last_name  : '',
    username   : '',
    email      : '',
    image      : '',
  };


  usersService = inject(UsersService);

  deleteUser(_id: string) {
    this.usersService.deleteUser(_id);
  }
}

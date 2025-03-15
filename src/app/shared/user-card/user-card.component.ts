import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';

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
}

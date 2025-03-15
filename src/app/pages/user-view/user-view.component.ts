import { Component, inject, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-view',
  imports: [],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() _id: string = '';
  usersService = inject(UsersService);
  user: IUser = {
    _id        : '',
    id         : 0,
    first_name : '',
    last_name  : '',
    username   : '',
    email      : '',
    image      : '',
  };

  async ngOnInit() {
    try {
      const response = await this.usersService.getUserById(this._id);
      if (!response.error) {
        this.user = response;
      } else {
        toast.error(response.error, { style: { background: 'red' } });
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
}

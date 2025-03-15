import { Component, inject, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { IResponse } from '../../interfaces/iresponse.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [ RouterLink ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() _id: string = '';
  usersService = inject(UsersService);
  router = inject(Router);

  user: IUser = {
    _id        : '',
    id         : 0,
    first_name : '',
    last_name  : '',
    username   : '',
    email      : '',
    image      : '',
  };

  deleteUser(_id: string) {
    this.usersService.deleteUser(_id);
  }

  async ngOnInit() {
    try {
      const response: IResponse | any = await this.usersService.getUserById(this._id);
      if (!response.error) {
        this.user = response;
      } else {
        toast.error(response.error, { style: { background: 'red' } });
        this.router.navigate(['**']);
      }
    } catch (error: any) {
      toast.error(error);
      this.router.navigate(['**']);
    }
  }
}

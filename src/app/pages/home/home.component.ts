import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { UserCardComponent } from '../../shared/user-card/user-card.component';
@Component({
  selector: 'app-home',
  imports: [ UserCardComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usersService = inject(UsersService);
  users: IUser[] = [];

  async ngOnInit() {
    try {
      const response = await this.usersService.getUsers();
      if (!response.error) {
        this.users = response.results;
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
}

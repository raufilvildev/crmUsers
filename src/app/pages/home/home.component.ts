import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { UserCardComponent } from '../../shared/user-card/user-card.component';
import { IResponse } from '../../interfaces/iresponse.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [ UserCardComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usersService = inject(UsersService);
  users: IUser[] = [];
  page: number = 1;
  total_pages: number = 1;
  router = inject(Router);


  async getUsers(page: number = 1) {
    try {
      const response: IResponse | any = await this.usersService.getUsers(page);
      this.total_pages = response.total_pages;
      if (!('error' in response)) {
        this.users = response.results;
      } else {
        this.router.navigate(['**']);
      }
    } catch (error: any) {
      toast.error(error);
      this.router.navigate(['**']);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getUsers(this.page);
    }
  }

  async nextPage() {
    if (this.page < this.total_pages) {
      this.page++;
      this.getUsers(this.page)
    }
  }

  async ngOnInit() {
    this.getUsers();
  }
}

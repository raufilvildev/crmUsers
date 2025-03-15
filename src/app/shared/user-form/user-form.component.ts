import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { IResponse } from '../../interfaces/iresponse.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() isNewUser: boolean = false;
  @Input() _id: string = '';
  usersService = inject(UsersService);
  router = inject(Router);

  userForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl('', [Validators.required])
  });

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
    if (this._id) {
      try {
        const response: IResponse | any = await this.usersService.getUserById(this._id);
        if (!response.error) {
          this.user = response;
          this.userForm = new FormGroup({
            first_name: new FormControl(this.user.first_name, [Validators.required]),
            last_name: new FormControl(this.user.last_name, [Validators.required]),
            username: new FormControl(this.user.username, [Validators.required]),
            email: new FormControl(this.user.email, [Validators.required, Validators.email]),
            image: new FormControl(this.user.image, [Validators.required])
          });
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

  async onSubmit(userForm: IUser) {
    if (this.isNewUser) {
      try {
        const response: IUser | any = await this.usersService.createUser(userForm);
        if ('error' in response) {
          toast.error(response.error);
          this.router.navigate(['/home']);
        } else {
          toast.success('Usuario creado correctamente');
          this.router.navigate(['/home']);
        }
      } catch (error: any) {
        toast.error(error);
        this.router.navigate(['**']);
      }
    } else {
      this.usersService.updateUser(this._id,userForm);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';
import { IResponse } from '../interfaces/iresponse.interface';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = "https://peticiones.online/api/users/";
  private httpClient = inject(HttpClient);
  router = inject(Router);

  getUsers(page: number = 1): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(`${this.endpoint}?page=${page}`));
  }

  getUserById(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.endpoint}/${_id}`));
  }

  createUser(user: any): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.endpoint, user));
  }

  updateUser(_id: string, user: any) {
    toast('¿Estás seguro de que quieres actualizar a este usuario?', {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          try {
            const response: IUser | any = await lastValueFrom(this.httpClient.put<IUser>(`${this.endpoint}/${_id}`, user));
            if ('error' in response) {
              toast.error(response.error);
              this.router.navigate(['/home']);
            } else {
              toast.success('Usuario actualizado correctamente');
              this.router.navigate(['/home']);
            }
          } catch (error: any) {
            toast.error(error);
            this.router.navigate(['**']);
          }
          
        }
      }
    })
  }

  deleteUser(_id: string) {
    toast('¿Estás seguro de que quieres borrar a este usuario?', {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          try {
            const response: IUser | any = await lastValueFrom(this.httpClient.delete<IUser>(`${this.endpoint}/${_id}`));
            if ('error' in response) {
              toast.error(response.error);
              this.router.navigate(['/home']);
            } else {
              toast.success('Usuario eliminado correctamente');
              this.router.navigate(['/home']);
            }
          } catch (error: any) {
            toast.error(error);
            this.router.navigate(['**']);
          }
        }
      }
    })
  }
}

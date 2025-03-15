import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = "https://peticiones.online/api/users/";
  private httpClient = inject(HttpClient);

  getUsers(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.endpoint));
  }

  getUserById(_id: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.endpoint}/${_id}`));
  }

  newUser(user: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.endpoint, user));
  }

  updateUser(_id: string, user: any): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.endpoint}/${_id}`, user));
  }
}

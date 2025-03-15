import { Component, Input } from '@angular/core';
import { UserFormComponent } from "../../shared/user-form/user-form.component";

@Component({
  selector: 'app-update-user',
  imports: [UserFormComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  @Input() _id: string = '';
}

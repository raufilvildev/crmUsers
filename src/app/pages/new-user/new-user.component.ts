import { Component } from '@angular/core';
import { UserFormComponent } from "../../shared/user-form/user-form.component";

@Component({
  selector: 'app-new-user',
  imports: [UserFormComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  
}

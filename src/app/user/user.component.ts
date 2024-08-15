import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router'; // Import Router
import { ApiService } from '../api.service'; // Import ApiService
import { AppState } from '../app.states';
import { User } from '../models/models';
import {
  selectIsLoadingUsers,
  selectSelectedUsers,
} from '../store/user.selector';
import { loadUsers } from '../store/user.actions';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users$: Observable<User[]>;
  isLoadingUsers$: Observable<boolean>;

  private readonly page1 = 1;
  private readonly page2 = 2;

  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    private router: Router
  ) {
    this.users$ = this.store.pipe(select(selectSelectedUsers));
    this.isLoadingUsers$ = this.store.pipe(select(selectIsLoadingUsers));
  }

  ngOnInit(): void {
    // Fetch users for both pages
    this.apiService.getUsers(this.page1).subscribe((response1) => {
      const users1 = response1.data;
      this.apiService.getUsers(this.page2).subscribe((response2) => {
        const users2 = response2.data;
        this.store.dispatch(loadUsers({ users: [...users1, ...users2] }));
      });
    });
  }

  // Method to navigate to user details
  viewUserDetails(userId: number): void {
    this.router.navigate([`/user/${userId}`]);
  }
}

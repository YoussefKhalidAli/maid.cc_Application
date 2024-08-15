import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../app.states';
import { User } from '../models/models';
import {
  selectIsLoadingDetails,
  selectUserDetails,
} from '../store/user.selector';
import { loadUser } from '../store/user.actions';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  user$: Observable<User | null>;
  isLoadingUser$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.isLoadingUser$ = this.store.pipe(select(selectIsLoadingDetails));
    this.user$ = this.store.pipe(select(selectUserDetails));
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId) {
      // Fetch user details and dispatch action to update the store
      this.apiService.getUserDetails(+userId).subscribe((data) => {
        this.store.dispatch(loadUser({ user: data.data }));
      });
    }
  }
}

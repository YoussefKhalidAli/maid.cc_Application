import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { searchUsers } from '../store/user.actions';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include FormsModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  showBackArrow: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    // Determine if the back arrow should be displayed based on the current route
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        this.showBackArrow = url.startsWith('/user/');
      });
  }

  // Dispatch search action based on input
  onSearchInput() {
    this.store.dispatch(searchUsers({ id: this.searchQuery }));
  }

  // Navigate back to the home page
  goBack() {
    this.router.navigate(['/']);
  }
}

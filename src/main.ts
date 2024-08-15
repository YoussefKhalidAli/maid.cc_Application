import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { userReducer } from './app/store/user.reducer';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { UserComponent } from './app/user/user.component';
import { DetailsComponent } from './app/details/details.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ users: userReducer }),
    provideHttpClient(),
    provideRouter([
      { path: '', component: UserComponent },
      { path: 'user/:userId', component: DetailsComponent },
    ]),
  ],
});

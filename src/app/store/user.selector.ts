import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { AppState } from '../app.states';

// Base selector to select the user state
export const selectUsers = (state: AppState) => state.users;

// Selectors to get specific pieces of state
export const selectSelectedUsers = createSelector(
  selectUsers,
  (state: UserState) => state.selectedUsers
);

export const selectIsLoadingUsers = createSelector(
  selectUsers,
  (state: UserState) => state.isLoadingUsers
);

export const selectIsLoadingDetails = createSelector(
  selectUsers,
  (state: UserState) => state.isLoadingDetails
);

export const selectUserDetails = createSelector(
  selectUsers,
  (state: UserState) => state.userDetails
);

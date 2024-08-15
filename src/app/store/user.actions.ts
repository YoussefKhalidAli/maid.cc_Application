import { createAction, props } from '@ngrx/store';
import { User } from '../models/models';

// Action to load users successfully
export const loadUsers = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

// Action to search users by ID
export const searchUsers = createAction(
  '[Users] Search for User',
  props<{ id: string }>()
);

// Action to load user details
export const loadUser = createAction(
  '[User] Load User Details',
  props<{ user: User }>()
);

// Action to reset loading state
export const resetIsLoading = createAction('[User] Reset Is Loading');

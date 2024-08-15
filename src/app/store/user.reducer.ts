import { createReducer, on } from '@ngrx/store';
import {
  loadUser,
  loadUsers,
  resetIsLoading,
  searchUsers,
} from '../store/user.actions';
import { User } from '../models/models';

// Store interface
export interface UserState {
  allUsers: User[];
  selectedUsers: User[];
  isLoadingUsers: boolean;
  userDetails: User | null;
  isLoadingDetails: boolean;
}

// initial state of the store
export const initialState: UserState = {
  allUsers: [],
  selectedUsers: [],
  isLoadingUsers: true,
  userDetails: null,
  isLoadingDetails: true,
};

export const userReducer = createReducer(
  initialState,
  // Loads the users
  on(loadUsers, (state, { users }) => ({
    ...state,
    allUsers: users,
    selectedUsers: users,
    isLoadingUsers: false,
  })),
  // Searches for user by id
  on(searchUsers, (state, { id }) => ({
    ...state,
    selectedUsers: id
      ? state.allUsers.filter((user) => user.id.toString().startsWith(id))
      : state.allUsers,
  })),
  // Loads specific user for details page
  on(loadUser, (state, { user }) => ({
    ...state,
    userDetails: user,
    isLoadingDetails: false,
  })),
  // Resets isLoading and user
  on(resetIsLoading, (state) => ({
    ...state,
    userDetails: null,
    isLoadingDetails: true,
  }))
);
